import LogtoClient from '@logto/next';

if (!process.env.LOGTO_ENDPOINT || !process.env.LOGTO_BASE_URL || !process.env.LOGTO_COOKIE_SECRET) throw new Error('Missing Logto ENV variables');

export const logtoClient = new LogtoClient({
	endpoint: process.env.LOGTO_ENDPOINT,
	appId: 'eY4buTh3wzGbOLgMEkzxG',
	appSecret: 'GJs06YAqxXO11Don5eHHi',
	baseUrl: process.env.LOGTO_BASE_URL,
	cookieSecret: process.env.LOGTO_COOKIE_SECRET,
	cookieSecure: process.env.NODE_ENV === 'production',
});
