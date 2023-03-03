import type { LogtoContext } from '@logto/next';

const isAuthed = (user: LogtoContext): boolean => {
	try {
		if (user.isAuthenticated && user.claims?.role_names?.includes('admin'))
			return true;
	} catch {
		return false;
	}

	return false;
}

export default isAuthed;