// @ts-check
import { z } from 'zod';

/**
 * Specify your server-side environment variables schema here.
 * This way you can ensure the app isn't built with invalid env vars.
 */
export const serverSchema = z.object({
	NODE_ENV: z.enum(['development', 'test', 'production']),

	LOGTO_ENDPOINT: z.string().url(),
	LOGTO_BASE_URL: z.string().url(),
	LOGTO_COOKIE_SECRET: z.string(),
	LOGTO_APP_ID: z.string(),
	LOGTO_APP_SECRET: z.string(),
	MALOJA_URL: z.string().url(),
	MALOJA_API_KEY: z.string(),

	// TODO: Actually parse booleans
	BOOMBOX_MALOJA_REQUIRE_AUTH: z.enum(['true', 'false']).optional().default('false')
});

/**
 * Specify your client-side environment variables schema here.
 * This way you can ensure the app isn't built with invalid env vars.
 * To expose them to the client, prefix them with `NEXT_PUBLIC_`.
 */
export const clientSchema = z.object({
	// NEXT_PUBLIC_MALOJA_URL: z.string().url(),
});

/**
 * You can't destruct `process.env` as a regular object, so you have to do
 * it manually here. This is because Next.js evaluates this at build time,
 * and only used environment variables are included in the build.
 * @type {{ [k in keyof z.infer<typeof clientSchema>]: z.infer<typeof clientSchema>[k] | undefined }}
 */
export const clientEnv = {
	// NEXT_PUBLIC_MALOJA_URL: process.env.MALOJA_URL
};
