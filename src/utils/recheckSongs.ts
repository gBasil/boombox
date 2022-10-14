import ytdl from 'ytdl-core';
import { prisma } from '../server/db/client';
import Media from '../types/Media';

type Song = {
	id: number;
	title: string;
	media: Media;
};

const recheckSongs = () =>
	new Promise<Song[]>(async (resolve) => {
		const songs = await prisma.song.findMany({
			select: {
				id: true,
				title: true,
				media: true,
			},
		});

		const flaggedSongs: Song[] = [];

		// Sort of a queue. May trigger ratelimits, I haven't tested it with a lot of videos
		for (const song of songs) {
			if (!song.media?.youtubeId) continue;

			const id = song.media.youtubeId;

			// Not available
			if (!(await isAvailable(id))) {
				flaggedSongs.push(song as Song);
				prisma.media.update({
					where: { id: song.media.id },
					data: { flagged: true },
				});
			} else {
				// If available
				if (song.media.flagged)
					prisma.media.update({
						where: { id: song.media.id },
						data: { flagged: false },
					});
			}
		}

		resolve(flaggedSongs);
	});

const isAvailable = (id: string) =>
	new Promise(async (resolve, reject) => {
		try {
			// If this throws, then the promise will reject.
			const data = await ytdl.getBasicInfo(id);
			if (data.videoDetails.isPrivate) reject('Video private');
		} catch {
			resolve(false);
		}

		resolve(true);
	});

export default recheckSongs;
