import LogtoClient from '@logto/next';
import { env } from '../../env/server';

export const logtoClient = new LogtoClient({
	endpoint: env.LOGTO_ENDPOINT,
	appId: env.LOGTO_APP_ID,
	appSecret: env.LOGTO_APP_SECRET,
	baseUrl: env.LOGTO_BASE_URL,
	cookieSecret: env.LOGTO_COOKIE_SECRET,
	cookieSecure: env.NODE_ENV === 'production',
});
