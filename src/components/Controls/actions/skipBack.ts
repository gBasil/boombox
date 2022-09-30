import Song from '../../../types/Song';
import { UseState } from '../playerContext';

const skipBack = (
	[song, setSong]: UseState<Song | undefined>,
	songs: Song[]
) => {
	if (!song) return;

	const index = songs.indexOf(song);
	
	// Go back one song
	if (index !== 0) setSong(songs[index - 1]);
	// If first item, loop back and select the last song
	else setSong(songs[songs.length - 1]);
};

export default skipBack;
