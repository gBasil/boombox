import { createRouter } from './context';
import { prisma } from '../db/client';

export const playlistRouter = createRouter()
	.query('list', {
		resolve: async () =>
			await prisma.song.findMany({
				include: { media: true, authors: true },
			}),
	});
