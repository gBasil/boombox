import { NextApiHandler } from 'next';
import NowPlaying from '../../types/NowPlaying';
import { getNowPlaying } from '../../utils/server/nowPlaying';

const handler: NextApiHandler<NowPlaying> = (req, res) => {
	res.json(getNowPlaying());
};

export default handler;
