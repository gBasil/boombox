import NowPlaying from '../../types/NowPlaying';
import formatAuthors from '../formatAuthors';

type Song = {
	id: number;
	title: string;
	authors: {
		id: number;
		name: string;
	}[];
};

let nowPlaying: Song;
let lastUpdated: number;
/*

If/when implemented, it would look like this:

const handler: NextApiHandler<NowPlaying> = (req, res) => {
	res.json(getNowPlaying());
};

*/
const getNowPlaying = (): NowPlaying => {
	// No song or last updated too long ago
	if (!nowPlaying || lastUpdated < Date.now() - 30 * 1000)
		return {
			playing: false,
		};

	return {
		playing: true,
		song: {
			title: nowPlaying.title,
			authors: formatAuthors(nowPlaying.authors),
			id: nowPlaying.id,
		},
	};
};

const setNowPlaying = (song: Song) => {
	nowPlaying = song;
	lastUpdated = Date.now();
};

export { getNowPlaying, setNowPlaying };
