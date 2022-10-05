import Song from '../../../types/Song';
import UseState from '../../../types/UseState';

const skipForward = (
	[song, setSong]: UseState<Song | undefined>,
	songs: Song[]
) => {
	if (!song) return;

	const index = songs.indexOf(song);
	
	// Go foward one song
	if (index !== songs.length - 1) setSong(songs[index + 1]);
	// If last item, loop back and select the first song
	else setSong(songs[0]);
};

export default skipForward;
