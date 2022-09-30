import Song from '../../../types/Song';
import { UseState } from '../playerContext';

const shuffle = (
	[song, setSong]: UseState<Song | undefined>,
	songs: Song[]
) => {
	if (!song) return;

	// Pretty inefficient, there's probably a better solution
	const choices = songs.filter(({ id }) => id !== song.id);
	
	// Pick a random song from the list
	const next = choices[Math.floor(Math.random() * choices.length)];
	
	setSong(next);
};

export default shuffle;
