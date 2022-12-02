import { NextResponse } from 'next/server';

// This function can be marked `async` if using `await` inside
const middleware = () => {
	const response = NextResponse.next();

	response.headers.set('access-control-allow-origin', process.env.MALOJA_URL as string);
	return response;
}

// See "Matching Paths" below to learn more
export const config = {
	matcher: ['/fonts/Inter-Bold.ttf', '/fonts/Inter-Regular.ttf'],
};

export { middleware };