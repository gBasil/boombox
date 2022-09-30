import Song from '../../types/Song';

import Default from './covers/Default';
import CloudsInTheBlue from './covers/CloudsInTheBlue';
import YourReality from './covers/YourReality';
import Shelter from './covers/Shelter';

type CoverTypes = {
	song?: Song;
};

const Cover = ({ song }: CoverTypes) => {
	switch (song?.media.youtubeId) {
		case '5UZ4V16d8eU':
			return <Shelter />;
		case 'Bf6b-TwhF3A':
			return <YourReality />;
		case 'SR-YU-VoiBc':
			return <CloudsInTheBlue />;
		default:
			return <Default song={song} />;
	}
};

export default Cover;
export type { CoverTypes };
