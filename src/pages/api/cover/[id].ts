import { existsSync, readFileSync } from 'fs';
import { NextApiHandler } from 'next';

const handler: NextApiHandler = (req, res) => {
	const path = `./images/${req.query.id}.webp`;

	if (!existsSync(path)) return res.status(404).end();

	const file = readFileSync(path);

	res.writeHead(200, {
		'Content-Type': 'image/webp',
		'Content-Length': file.length,
	}).end(file);
};

export default handler;
