import Song from './SongBase';
import SongType from '../../types/Song';
import DeleteButton from './DeleteButton';
import { ForwardedRef, forwardRef } from 'react';

type SongManageProps = {
	song: SongType;
	onClick: () => void;
};

const SongManage = forwardRef(
	(props: SongManageProps, ref: ForwardedRef<HTMLDivElement>) => {
		return (
			<div className='flex justify-between pr-1' ref={ref}>
				<Song
					song={props.song}
					playing={props.song.media.flagged}
					className='w-[calc(100%_-_40px)]'
					onClick={props.onClick}
				/>
				<DeleteButton song={props.song} />
			</div>
		);
	}
);

SongManage.displayName = 'SongManage';

export default SongManage;
