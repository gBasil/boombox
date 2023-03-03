import { X } from 'lucide-react';
import TextInput from '../TextInput';
import { Formik, Form } from 'formik';
import { trpc } from '../../utils/trpc';
import { useContext, useState } from 'react';
import * as AlertDialog from '@radix-ui/react-alert-dialog';
import toast from 'react-hot-toast';
import { Values } from './types';
import SubmitButton from './SubmitButton';
import Cover from './Cover';
import UpdateForm from './UpdateForm';
import { AnimatePresence, motion } from 'framer-motion';
import { ThumbnailsContext } from '../../pages/manage';

type AddSongProps = {
	className?: string;
	open: boolean;
	import?: boolean;
	setOpen: (val: boolean) => void;
	song?: Values & { id?: number; date?: Date };
	setSong: (song: undefined) => void;
};

const AddSong = (props: AddSongProps) => {
	const { client } = trpc.useContext();
	const { refetchQueries } = trpc.useContext();
	const [loading, setLoading] = useState(false);
	// Undefined if on the import page
	const thumbnailsCtx = useContext(ThumbnailsContext);

	const submit = (input: Values) => {
		setLoading(true);

		client
			.mutation(
				!props.song || props.import ? 'manage.add' : 'manage.update',
				{
					...input,
					authors: input.authors.split(', '),
					date: props.song?.date,
				}
			)
			.then(() => {
				props.setOpen(false);
				setLoading(false);
				props.setSong(undefined);
				// Refresh the song list. The array could be modified on the client as well
				refetchQueries(['playlist.list']);

				// Refresh the thumbnail
				if (!props.song || !thumbnailsCtx || !props.song.id) return;

				const [thumbnails, setThumbnails] = thumbnailsCtx;
				setThumbnails({
					...thumbnails,
					[props.song.id.toString()]: Date.now().toString(),
				});
			})
			.catch((err) => {
				toast.error(err.message || 'An unknown error ocurred');
				console.error(err);
				setLoading(false);
			});
	};

	// TODO: Fix layout shift when scrollbar disappears
	return (
		<AlertDialog.Root open={props.open}>
			<AnimatePresence>
				{props.open ? (
					<AlertDialog.Portal forceMount>
						<AlertDialog.Overlay>
							<motion.div
								className='fixed inset-0 bg-[#000] bg-opacity-25 backdrop-blur-sm'
								initial='hidden'
								animate='visible'
								exit='hidden'
								variants={{
									hidden: {
										opacity: 0,
									},
									visible: {
										opacity: 1,
									},
								}}
								transition={{
									ease: 'easeInOut',
									duration: 0.2,
								}}
							/>
						</AlertDialog.Overlay>

						<AlertDialog.Content
							className='fixed inset-0 grid place-items-center'
							style={{
								perspective: '1000px',
							}}
						>
							<motion.div
								className={`flex flex-col gap-2 overflow-hidden rounded-[16px] bg-darkestGreen p-3 ${
									props.className || ''
								}`}
								initial='hidden'
								animate='visible'
								exit='hidden'
								variants={{
									hidden: {
										scale: 0.7,
										opacity: 0,
										rotateX: 25,
										y: 100,
									},
									visible: {
										scale: 1,
										opacity: 1,
										rotateX: 0,
										y: 0,
									},
								}}
								transition={{
									type: 'spring',
									duration: 0.4,
								}}
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
														import={props.import}
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
												<p className='font-bold'>
													Cover
												</p>
												<Cover initialRefresh={!!props.import} song={props.song} />
											</div>
										</div>
									</Form>
								</Formik>
							</motion.div>
						</AlertDialog.Content>
					</AlertDialog.Portal>
				) : null}
			</AnimatePresence>
		</AlertDialog.Root>
	);
};

export default AddSong;
