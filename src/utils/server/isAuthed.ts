import type { LogtoContext } from '@logto/next';

export default (user: LogtoContext): boolean => {
	try {
		if (user.isAuthenticated && user.claims?.role_names?.includes('admin'))
			return true;
	} catch {
		return false;
	}

	return false;
}