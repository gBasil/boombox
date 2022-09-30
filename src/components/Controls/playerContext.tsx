import { createContext, Dispatch, SetStateAction } from 'react';
import Song from '../../types/Song';

type UseState<T> = [T, Dispatch<SetStateAction<T>>];

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

export type { UseState };
