import Song from './SongBase';
import SongType from '../../types/Song';
import { useContext } from 'react';
import { PlayerContext } from '../Controls/playerContext';

type SongManageProps = {
	song: SongType;
};

const SongManage = (props: SongManageProps) => {
	const {
		song: [song, setSong],
	} = useContext(PlayerContext);

	const play = () => setSong(props.song);

	return <Song song={props.song} className='w-full' onClick={play} playing={song?.id === props.song.id} />;
};

export default SongManage;
