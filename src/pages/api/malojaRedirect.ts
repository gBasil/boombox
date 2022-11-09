import { env } from '../../env/server';
import { logtoClient } from '../../utils/server/logto';

export default logtoClient.withLogtoApiRoute((req, res) => {
	if (
		env.BOOMBOX_MALOJA_REQUIRE_AUTH === 'true' && 
		(!req.user.isAuthenticated ||
		!req.user.claims?.role_names?.includes('admin'))
	)
		return res.status(403).send('You must be logged in as an admin to view the Maloja instance!');

	res.redirect(env.MALOJA_URL);
});
