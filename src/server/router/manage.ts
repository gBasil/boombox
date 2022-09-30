import { createRouter } from './context';
import { z } from 'zod';
import { prisma } from '../db/client';
import sharp from 'sharp';
import { TRPCError } from '@trpc/server';
import ytdl from 'ytdl-core';
import fetch from 'node-fetch';
import { rmSync } from 'fs';
import { Author } from '@prisma/client';
import Vibrant from 'node-vibrant';

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
			const data = Buffer.from(
				input.cover.split(',')[1] as string,
				'base64'
			);
			const colors = await Vibrant.from(data)
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
				},
			});

			const body = Buffer.from(
				input.cover.split(',')[1] as string,
				'base64'
			);
			await sharp(body)
				.resize(216, 216)
				.webp()
				.toFile(`./images/${song.id}.webp`);
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
						},
					},
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

			const body = Buffer.from(
				input.cover.split(',')[1] as string,
				'base64'
			);
			await sharp(body)
				.resize(216, 216)
				.webp()
				.toFile(`./images/${song.id}.webp`);
		},
	})
	// Returns the dataURI of a YouTube thumbnail
	.query('thumbnail', {
		input: z.string(),
		resolve: async ({ input }) => {
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
			rmSync(`./images/${input}.webp`);
		},
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
