import { createContext } from 'react';
import Song from '../../types/Song';
import UseState from '../../types/UseState';

type Player = {
	songs: UseState<Song[]>;
	song: UseState<Song | undefined>;
	zen: UseState<boolean>;
};

export const PlayerContext = createContext<Player>({
	// We set the values later, so it's fine to do this here
	// eslint-disable-next-line
	songs: null as any,
	// eslint-disable-next-line
	song: null as any,
	// eslint-disable-next-line
	zen: null as any
});
