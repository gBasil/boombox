import type { AppType } from 'next/dist/shared/lib/utils';
import type { AppRouter } from '../server/router';
import { httpBatchLink } from '@trpc/client/links/httpBatchLink';
import { loggerLink } from '@trpc/client/links/loggerLink';
import { withTRPC } from '@trpc/next';
import { Toaster } from 'react-hot-toast';
import superjson from 'superjson';

import '../styles/globals.css';
import tailwindConfig from '../../tailwind.config.cjs';
import { AnimatePresence } from 'framer-motion';

type Colors = {
	lightestGreen: string;
	lightGreen: string;
	darkestGreen: string;
	red: string;
};

const colors: Colors = tailwindConfig.theme?.colors as Colors;

const App: AppType = ({ Component, pageProps, router }) => {
	return (
		<>
			<Toaster
				position='top-right'
				toastOptions={{
					blank: {
						style: {
							background: colors.lightestGreen,
							color: colors.darkestGreen,
						},
					},
					success: {
						iconTheme: {
							primary: colors.darkestGreen,
							secondary: colors.lightGreen,
						},
						style: {
							background: colors.lightGreen,
							color: colors.darkestGreen,
						},
					},
					error: {
						iconTheme: {
							primary: colors.darkestGreen,
							secondary: colors.red,
						},
						style: {
							background: colors.red,
							color: colors.darkestGreen,
						},
					},
				}}
			/>
			<AnimatePresence
				mode='wait'
				initial={false}
			>
				<Component {...pageProps} key={router.route} />
			</AnimatePresence>
		</>
	);
};

const getBaseUrl = () => {
	if (typeof window !== 'undefined') return ''; // browser should use relative url
	if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`; // SSR should use vercel url
	return `http://localhost:${process.env.PORT ?? 3000}`; // dev SSR should use localhost
};

export default withTRPC<AppRouter>({
	config() {
		/**
		 * If you want to use SSR, you need to use the server's full URL
		 * @link https://trpc.io/docs/ssr
		 */
		const url = `${getBaseUrl()}/api/trpc`;

		return {
			links: [
				loggerLink({
					enabled: (opts) =>
						process.env.NODE_ENV === 'development' ||
						(opts.direction === 'down' &&
							opts.result instanceof Error),
				}),
				httpBatchLink({ url }),
			],
			url,
			transformer: superjson,
			/**
			 * @link https://react-query.tanstack.com/reference/QueryClient
			 */
			// queryClientConfig: { defaultOptions: { queries: { staleTime: 60 } } },

			// To use SSR properly you need to forward the client's headers to the server
			// headers: () => {
			//   if (ctx?.req) {
			//     const headers = ctx?.req?.headers;
			//     delete headers?.connection;
			//     return {
			//       ...headers,
			//       "x-ssr": "1",
			//     };
			//   }
			//   return {};
			// }
		};
	},
	/**
	 * @link https://trpc.io/docs/ssr
	 */
	ssr: false,
})(App);
