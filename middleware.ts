import type { NextRequest } from 'next/server';
import { env } from './src/env/server';

// This function can be marked `async` if using `await` inside
export const middleware = (request: NextRequest) => {
	request.headers.set('access-control-allow-origin', env.MALOJA_URL);
}

// See "Matching Paths" below to learn more
export const config = {
	matcher: ['/fonts/Inter-Bold.ttf', '/fonts/Inter-Regular.ttf'],
};
