import Media from './Media';

type Song = {
	id: number;
	title: string;
	authors: {
		id: number;
		name: string;
	}[];
	media: Media;
	color1: string;
	color2: string;
	color3: string;
};

export default Song;
