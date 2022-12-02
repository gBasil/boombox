/**
 * This file is included in `/next.config.mjs` which ensures the app isn't built with invalid env vars.
 * It has to be a `.mjs`-file to be imported there.
 */
import { serverSchema } from './schema.mjs';
import { env as clientEnv, formatErrors } from './client.mjs';
import { z } from 'zod';

const _serverEnv = serverSchema.safeParse(process.env);

// Ignore errors if this is a Docker build, since we don't pass env vars there
if (!_serverEnv.success && process.env.DOCKER_BUILD !== 'YES') {
	console.error(
		'❌ Invalid environment variables:\n',
		...formatErrors(_serverEnv.error.format())
	);
	throw new Error('Invalid environment variables');
}

// Temporary workaround
// const data = _serverEnv.data;
const data = process.env as z.infer<typeof serverSchema>;

// Validate that server-side environment variables are not exposed to the client.
for (const key of Object.keys(data)) {
	if (key.startsWith('NEXT_PUBLIC_')) {
		console.warn('❌ You are exposing a server-side env-variable:', key);

		throw new Error('You are exposing a server-side env-variable');
	}
}

export const env = { ...data, ...clientEnv };
