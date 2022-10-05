import { createNextApiHandler } from '@trpc/server/adapters/next';
import { appRouter } from '../../../server/router';
import { createContext } from '../../../server/router/context';
import { logtoClient } from '../../../utils/server/logto';

// export API handler
export default logtoClient.withLogtoApiRoute(
	createNextApiHandler({
		router: appRouter,
		createContext,
	})
);
