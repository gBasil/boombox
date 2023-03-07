import { useFormikContext } from 'formik';
import { RefreshCw } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { trpc } from '../../utils/trpc';
import { Values } from './types';

const FetchData = () => {
	const { client } = trpc.useContext();
	const { values, setFieldValue } = useFormikContext<Values>();
	const [loading, setLoading] = useState(false);

	const fetchData = () => {
		if (values.youtubeId.length != 11) return;
		const id = values.youtubeId;
		
		let done = 0;
		setLoading(true);

		const final = () => {
			done++;
			if (done >= 2) setLoading(false);
		}

		client
			.query('manage.info', id)
			.then((info) => {
				if (!values.title) setFieldValue('title', info.title);
				if (!values.authors) setFieldValue('authors', info.channel.replace(' - Topic', ''));
			})
			.catch(() => {
				toast.error(`Could not get info for video`);
				console.error(`Could not get info for video`);
			}).finally(final);

		client
			.query('manage.thumbnail', id)
			.then((data) => {
				if (!values.cover) setFieldValue('cover', data);
			})
			.catch(() => {
				toast.error(`Could not get thumbnail for video`);
				console.error(`Could not get thumbnail for video`);
			}).finally(final);
	}

	return <button
		type='button'
		className='bg-lightestGreen text-darkestGreen p-1 rounded-1'
		onClick={fetchData}
	>
		<RefreshCw className={loading ? 'animate-spin' : ''} />
	</button>
}

export default FetchData;