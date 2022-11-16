import type { GetServerSideProps, NextPage } from 'next';
import { FileSpreadsheet } from 'lucide-react';
import { logtoClient } from '../utils/server/logto';
import Meta from '../components/Meta';
import { motion } from 'framer-motion';
import { variants } from '.';
import Button from '../components/Button';
import importSongs, { ImportedSong } from '../utils/client/import';
import { useEffect, useRef, useState } from 'react';
import AddSong from '../components/AddSong';
import { trpc } from '../utils/trpc';
import { Values as AddSongInput } from '../components/AddSong/types';
import toast from 'react-hot-toast';

const Manage: NextPage = () => {
	const { client } = trpc.useContext();
	const fileInput = useRef<HTMLInputElement>(null);
	const [song, setSong] = useState<AddSongInput | undefined>(undefined);
	const [songs, setSongs] = useState<ImportedSong[]>([]);

	useEffect(() => {
		if (!songs.length || !songs[0]) return undefined;
		const song = songs[0];

		client
			.query('manage.info', song.id)
			.then((info) => {
				setSong({
					authors: info.channel.replace(' - Topic', ''),
					date: song.date,
					cover: '',
					title: info.title,
					youtubeId: song.id,
				} as AddSongInput);
			})
			.catch(() => {
				toast.error(`Could not get info for video with ID ${song.id}`, {
					duration: 10 * 1000,
				});
				console.error(
					`Could not get info for video with ID ${song.id}`
				);
				setSongs(songs.slice(1));
			});
	}, [songs]);

	return (
		<>
			<Meta title='Import' description='Import a playlist from YouTube' />

			<motion.main
				className='m-auto my-8 w-2col child:mx-1'
				variants={variants}
				initial='initial'
				animate='animate'
				exit='exit'
			>
				<h1 className='mt-8 text-center font-newsreader text-title'>
					Import
				</h1>
				<p className='mt-3'>
					If you, like me, have a playlist on YouTube and would like
					to move it to Boombox, you can do so here. Simply export
					data from the playlist via Google{' '}
					<a className='link' href='https://takeout.google.com'>
						Takeout
					</a>{' '}
					tool. Then, import the .csv file with all of the data here.
				</p>

				<div className='mt-3 child:mx-auto'>
					<Button
						onClick={() => importSongs(fileInput.current, setSongs)}
					>
						Import .csv <FileSpreadsheet height={16} width={16} />
					</Button>
					<input
						type='file'
						id='file'
						ref={fileInput}
						style={{ display: 'none' }}
					/>
				</div>

				<AddSong
					import
					open={!!songs.length && !!song}
					setOpen={() => {
						return;
					}}
					song={song}
					setSong={() => {
						setSong(undefined);
						setSongs(songs.slice(1));
					}}
				/>
			</motion.main>
		</>
	);
};

const getServerSideProps: GetServerSideProps = logtoClient.withLogtoSsr(
	async ({ req }) => {
		if (!req.user.isAuthenticated)
			return {
				redirect: {
					destination: '/sign-in',
					permanent: false,
				},
			};

		return { props: {} };
	}
);

export default Manage;
export { getServerSideProps };
