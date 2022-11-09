import { PrismaClient } from '@prisma/client';
import { env } from '../../env/server';

declare global {
	// eslint-disable-next-line no-var
	var prisma: PrismaClient | undefined;
}

export const prisma =
	global.prisma ||
	new PrismaClient({
		log:
			env.NODE_ENV === 'development'
				? ['query', 'error', 'warn']
				: ['error'],
		datasources: {
			db: {
				url: `file:${
					// TODO: Test if this works
					env.NODE_ENV === 'production' ? './data/db.sqlite' : '../data/db.sqlite'
				}`,
			},
		},
	});

if (env.NODE_ENV !== 'production') {
	global.prisma = prisma;
}
