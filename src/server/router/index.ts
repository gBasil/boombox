import { createRouter } from './context';
import superjson from 'superjson';
import { playlistRouter } from './playlist';
import { manageRouter } from './manage';

export const appRouter = createRouter()
	.transformer(superjson)
	.merge('playlist.', playlistRouter)
	.merge('manage.', manageRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
