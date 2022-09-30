import { X } from 'lucide-react';
import TextInput from '../TextInput';
import { Formik, Form } from 'formik';
import { trpc } from '../../utils/trpc';
import { useState } from 'react';
import * as AlertDialog from '@radix-ui/react-alert-dialog';
import toast from 'react-hot-toast';
import { Values } from './types';
import SubmitButton from './SubmitButton';
import Cover from './Cover';
import UpdateForm from './UpdateForm';

type AddSongProps = {
	className?: string;
	open: boolean;
	setOpen: (val: boolean) => void;
	song?: Values & { id: number };
	setSong: (song: undefined) => void;
};

const AddSong = (props: AddSongProps) => {
	const { client } = trpc.useContext();
	const { refetchQueries } = trpc.useContext();
	const [loading, setLoading] = useState(false);

	const submit = (input: Values) => {
		setLoading(true);

		client
			.mutation(props.song ? 'manage.update' : 'manage.add', {
				...input,
				authors: input.authors.split(', '),
			})
			.then(() => {
				props.setOpen(false);
				setLoading(false);
				props.setSong(undefined);
				// Refresh the song list. The array could be modified on the client as well
				refetchQueries(['playlist.list']);
			})
			.catch((err) => {
				toast.error(err.message || 'An unknown error ocurred');
				setLoading(false);
			});
	};

	return (
		<AlertDialog.Root open={props.open}>
			<AlertDialog.Portal>
				<AlertDialog.Overlay className='fixed inset-0 bg-[#000] bg-opacity-25 backdrop-blur-sm' />

				<AlertDialog.Content className='fixed inset-0 grid place-items-center'>
					<div
						className={`flex flex-col gap-2 overflow-hidden rounded-[16px] bg-darkestGreen p-3 transition-transform duration-500 ${
							props.className || ''
						}`}
					>
						<Formik
							initialValues={{
								title: '',
								authors: '',
								youtubeId: '',
								cover: '',
							}}
							onSubmit={submit}
						>
							<Form>
								<UpdateForm song={props.song} />
								<TextInput
									label='Title'
									name='title'
									placeholder='Farewell'
								/>
								<div className='mt-2 flex flex-row justify-between gap-3 child:w-1col'>
									<div>
										<TextInput
											label='Authors'
											name='authors'
											placeholder='Lena Raine'
											className='child:w-full'
										/>
										<TextInput
											label='YouTube ID'
											name='youtubeId'
											placeholder='VXIqXaX1blY'
											className='mt-2 child:w-full'
											length={11}
										/>
										<div className='mt-[48px] flex flex-row gap-1'>
											<SubmitButton
												loading={loading}
												song={props.song}
											/>
											<AlertDialog.Cancel
												className='rounded-1 bg-red p-1 font-bold text-darkestGreen transition-colors disabled:bg-green'
												onClick={() => {
													props.setOpen(false);
													props.setSong(undefined);
												}}
											>
												<X />
											</AlertDialog.Cancel>
										</div>
									</div>
									<div>
										<p className='font-bold'>Cover</p>
										<Cover />
									</div>
								</div>
							</Form>
						</Formik>
					</div>
				</AlertDialog.Content>
			</AlertDialog.Portal>
		</AlertDialog.Root>
	);
};

export default AddSong;
