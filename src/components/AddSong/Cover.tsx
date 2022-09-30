import { useFormikContext } from 'formik';
import { FileQuestion, RefreshCw } from 'lucide-react';
import Image from 'next/future/image';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { trpc } from '../../utils/trpc';
import FileUpload from './FileUpload';
import { Values } from './types';

const Cover = () => {
	const { values, setFieldValue } = useFormikContext<Values>();
	const { client } = trpc.useContext();
	const [loading, setLoading] = useState(false);

	const refresh = async () => {
		if (values.youtubeId.length !== 11)
			return toast.error('Invalid YouTube ID');

		setLoading(true);

		client
			.query('manage.thumbnail', values.youtubeId)
			.then(async (data) => {
				setFieldValue('cover', data);
				setLoading(false);
			})
			.catch((err) => {
				toast.error(err.message || 'An unknown error ocurred');
				setLoading(false);
			});
	};

	return (
		<div className='relative'>
			<div className='mt-1 h-[216px] w-[216px] overflow-clip rounded-1 border-2 border-lightestGreen'>
				{values.cover ? (
					<Image
						src={values.cover}
						alt='Cover'
						// https://i.ytimg.com/vi/AoV1EIxj4B8/maxresdefault.jpg
						width={216}
						height={216}
						className='h-full w-full border-lightestGreen object-cover'
					/>
				) : (
					<div className='grid h-full w-full place-items-center bg-lightestGreen text-darkestGreen'>
						<FileQuestion className='h-5 w-5 text-darkestGreen' />
					</div>
				)}
			</div>
			<div className='absolute bottom-0 right-0 flex flex-row gap-1 rounded-tl-1 rounded-br-1 bg-lightestGreen p-1 text-darkestGreen'>
				<button type='button' onClick={refresh} disabled={loading}>
					<RefreshCw
						className={`h-2 w-2 ${loading ? 'animate-spin' : ''}`}
					/>
				</button>
				<FileUpload />
			</div>
		</div>
	);
};

export default Cover;
