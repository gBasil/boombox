import Song from './SongBase';
import SongType from '../../types/Song';
import DeleteButton from './DeleteButton';

type SongManageProps = {
	song: SongType;
	onClick: () => void;
};

const SongManage = (props: SongManageProps) => {
	return (
		<div className='flex justify-between'>
			<Song
				song={props.song}
				className='w-[calc(100%_-_40px)]'
				onClick={props.onClick}
			/>
			<DeleteButton song={props.song} />
		</div>
	);
};

export default SongManage;
