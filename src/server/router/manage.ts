import { createRouter } from './context';
import { z } from 'zod';
import { prisma } from '../db/client';
import sharp, { Sharp } from 'sharp';
import { TRPCError } from '@trpc/server';
import ytdl from 'ytdl-core';
import fetch from 'node-fetch';
import { rmSync } from 'fs';
import { Author } from '@prisma/client';
import Vibrant from 'node-vibrant';
import recheckSongs from '../../utils/server/recheckSongs';
import { setNowPlaying } from '../../utils/server/nowPlaying';
import scrobble from '../../utils/server/scrobble';
import bufferToURI from '../../utils/bufferToURI';
import { env } from '../../env/server';

const song = z.object({
	id: z.number(),
	title: z.string(),
	authors: z
		.object({
			id: z.number(),
			name: z.string(),
		})
		.array(),
	media: z.object({
		type: z.literal('yt'),
		id: z.number(),
		youtubeId: z.string().optional(),
		duration: z.number(),
		flagged: z.boolean(),
	}),
	color1: z.string(),
	color2: z.string(),
	color3: z.string(),
});

// TODO: Remove duplicate code
export const manageRouter = createRouter()
	.middleware(({ next, ctx }) => {
		if (
			!ctx.user.isAuthenticated ||
			!ctx.user.claims?.role_names?.includes('admin')
		)
			throw new TRPCError({
				code: 'UNAUTHORIZED',
			});
		return next({
			ctx: {
				user: null,
			},
		});
	})
	// Adds a song to the playlist database
	.mutation('add', {
		input: z.object({
			title: z.string(),
			authors: z.array(z.string()),
			// Zod doesn't seem to support partials
			youtubeId: z.string(),
			cover: z.string(),
			date: z.date().optional()
		}),
		resolve: async ({ input }) => {
			// Create and add the media to the song
			const info = await ytdl.getBasicInfo(input.youtubeId);

			// Ensure the video is playable
			if (info.videoDetails.isPrivate)
				throw new TRPCError({
					code: 'INTERNAL_SERVER_ERROR',
					message: 'Video does not appear to be playable.',
				});

			// Get colors from thumbnail
			const data = sharp(
				Buffer.from(input.cover.split(',')[1] as string, 'base64')
			).resize(216, 216);
			// TODO: Make this actually ensure good contrast
			const colors = await Vibrant.from(await data.png().toBuffer())
				.maxColorCount(3)
				.getPalette();

			if (!colors.DarkMuted || !colors.Muted || !colors.LightMuted)
				throw new TRPCError({
					code: 'INTERNAL_SERVER_ERROR',
					message: 'Failed to get colors from cover',
				});

			// Create the song
			const song = await prisma.song.create({
				data: {
					title: input.title,
					media: {
						create: {
							type: 'yt',
							youtubeId: input.youtubeId,
							duration: parseInt(info.videoDetails.lengthSeconds),
						},
					},
					authors: {
						connectOrCreate: input.authors.map((author) => ({
							where: { name: author },
							create: { name: author },
						})),
					},
					color1: colors.LightMuted.hex,
					color2: colors.Muted.hex,
					color3: colors.DarkMuted.hex,
					createdAt: input.date
				},
			});

			// Save thumbnail to file
			data.webp().toFile(`./data/images/${song.id}.webp`);
		},
	})
	// Updates the information of a song
	.mutation('update', {
		input: z.object({
			id: z.number(),
			title: z.string(),
			authors: z.array(z.string()),
			youtubeId: z.string(),
			cover: z.string(),
		}),
		resolve: async ({ input }) => {
			const info = await ytdl.getBasicInfo(input.youtubeId);

			// Ensure the video is playable
			if (info.videoDetails.isPrivate)
				throw new TRPCError({
					code: 'INTERNAL_SERVER_ERROR',
					message: 'Video does not appear to be playable.',
				});

			// Get colors from thumbnail
			const data = sharp(
				Buffer.from(input.cover.split(',')[1] as string, 'base64')
			).resize(216, 216);
			const colors = await Vibrant.from(await data.png().toBuffer())
				.maxColorCount(3)
				.getPalette();

			if (!colors.DarkMuted || !colors.Muted || !colors.LightMuted)
				throw new TRPCError({
					code: 'INTERNAL_SERVER_ERROR',
					message: 'Failed to get colors from cover',
				});

			// Update song
			const song = await prisma.song.update({
				where: { id: input.id },
				data: {
					title: input.title,
					authors: {
						connectOrCreate: input.authors.map((author) => ({
							where: { name: author },
							create: { name: author },
						})),
					},
					media: {
						update: {
							type: 'yt',
							youtubeId: input.youtubeId,
							duration: parseInt(info.videoDetails.lengthSeconds),
							flagged: false,
						},
					},
					color1: colors.LightMuted.hex,
					color2: colors.Muted.hex,
					color3: colors.DarkMuted.hex,
				},
				include: { authors: true },
			});

			// Remove the authors that we didn't just add
			await prisma.author.deleteMany({
				where: {
					id: {
						in: song.authors
							.filter(
								(author) =>
									!input.authors.some(
										(name) => name === author.name
									)
							)
							.map(({ id }) => id),
					},
				},
			});

			cleanAuthors(song.authors);

			// Save thumbnail to file
			data.webp().toFile(`./data/images/${song.id}.webp`);

			upload({
				authors: input.authors,
				title: input.title,
				image: data,
			});
		},
	})
	// Returns the dataURI of a YouTube thumbnail
	.query('thumbnail', {
		input: z.string(),
		resolve: async ({ input }) => {
			//! Sometimes fails to fetch on low res thumbnails
			// TODO: Try alternate thumbnails until we find one that works
			const thumbnail = await fetch(
				`https://i.ytimg.com/vi/${input}/maxresdefault.jpg`
			);

			if (thumbnail.status !== 200)
				throw new TRPCError({
					code: 'INTERNAL_SERVER_ERROR',
					message: 'Could not fetch thumbnail',
				});

			return `data:${thumbnail.headers.get(
				'content-type'
			)};base64,${Buffer.from(await thumbnail.arrayBuffer()).toString(
				'base64'
			)}`;
		},
	})
	.query('info', {
		input: z.string(),
		resolve: async ({ input }) => {
			const data = await ytdl.getBasicInfo(input);
			return {
				title: data.videoDetails.title,
				channel: data.videoDetails.author.name,
			};
		}
	})
	// Removes a song by id
	.mutation('remove', {
		input: z.number(),
		resolve: async ({ input }) => {
			// Media has to be deleted first
			await prisma.media.delete({
				where: { songId: input },
			});

			// Now delete the entry for the song
			const song = await prisma.song.delete({
				where: { id: input },
				include: { authors: true },
			});

			cleanAuthors(song.authors);

			// Remove the thumbnail as well
			rmSync(`./data/images/${input}.webp`);
		},
	})
	// Check all of the songs in the playlist to see if they're watchable
	// It could realistically be a subscription, but that's probably overkill
	// TODO: It would be beneficial to add some sort of "already checking" mechanism
	.query('recheck', {
		resolve: async () => await recheckSongs(),
	})
	// Update the currently playing song
	.mutation('nowPlaying', {
		input: z.object({
			id: z.number(),
			title: z.string(),
			authors: z.array(
				z.object({
					id: z.number(),
					name: z.string(),
				})
			),
		}),
		resolve: ({ input }) => setNowPlaying(input),
	})
	.mutation('scrobble', {
		input: z.object({
			song,
			duration: z.number(),
		}),
		resolve: ({ input }) => scrobble(input.song, input.duration),
	});

// I'm not sure whether or not you can make this into one query
// Remove any artists that don't have any songs associated with them
const cleanAuthors = (authors: Author[]) =>
	Promise.all(
		authors.map(async (author) => {
			const songs = await prisma.author.findFirst({
				where: { id: author.id },
				select: {
					_count: {
						select: {
							songs: true,
						},
					},
				},
			});

			if (songs && songs._count.songs === 0)
				await prisma.author.delete({
					where: { id: author.id },
				});

			return;
		})
	);

// Internal Maloja endpoint, but it's not exposed any other way
const upload = async (input: {
	title: string;
	authors: string[];
	image: Sharp;
}) =>
	fetch(
		`${env.MALOJA_URL}/apis/mlj_1/addpicture?title=${
			input.title
		}${input.authors.map((artist) => `&artist=${artist}`).join('')}`,
		{
			method: 'POST',
			headers: {
				'content-type': 'application/json',
			},
			body: JSON.stringify({
				// No need to resize, we already did that
				b64: bufferToURI(
					'image/png',
					await input.image.png().toBuffer()
				),
				key: process.env.MALOJA_API_KEY,
			}),
		}
	);
