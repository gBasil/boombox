import { Trash2 } from 'lucide-react';
import Song from '../../types/Song';
import { trpc } from '../../utils/trpc';

type DeleteButtonProps = {
	song: Song;
};

const DeleteButton = (props: DeleteButtonProps) => {
	const { client, refetchQueries } = trpc.useContext();

	return (
		<button
			onClick={async () => {
				await client.mutation('manage.remove', props.song.id);
				refetchQueries(['playlist.list']);
			}}
			className='my-auto'
		>
			<Trash2 className='my-auto text-lightGreen' />
		</button>
	);
};

export default DeleteButton;
