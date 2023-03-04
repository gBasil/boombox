import type { GetServerSideProps, NextPage } from 'next';
import { SongPlaylist } from '../components/Song';
import Controls from '../components/Controls';
import SongType from '../types/Song';
import { prisma } from '../server/db/client';
import { PlayerContext } from '../components/Controls/playerContext';
import { useEffect, useRef, useState } from 'react';
import Song from '../types/Song';
import Casette from '../components/Casette';
import Meta from '../components/Meta';
import { logtoClient } from '../utils/server/logto';
import { motion } from 'framer-motion';
import { trpc } from '../utils/trpc';
import { usePrevious } from '@radix-ui/react-use-previous';
import { variants } from '.';
import isAuthed from '../utils/server/isAuthed';

type Props = {
	songs: SongType[];
	authed: boolean;
};

const Playlist: NextPage<Props> = (props) => {
	// List of all available songs
	const songListState = useState<Song[]>(props.songs);
	// Current playing song
	const [song, setSong] = useState<Song | undefined>();
	const previousSong = usePrevious(song);
	// Zen/casette mode
	const [zen, setZen] = useState(false);
	// Whether the song is playing
	const [playing, setPlaying] = useState(false);
	// How long we've been listening to the song, for scrobbling
	const listening = useRef(0);
	// We need to store the progress here so we can pass it to the zen mode casette
	const progressState = useState(0);
	const { client } = trpc.useContext();

	// Song sharing
	useEffect(() => {
		const urlParams = new URLSearchParams(window.location.search);
		const songIdStr = urlParams.get('id');
		if (!songIdStr) return;
		const songId = parseInt(songIdStr);
		if (Number.isNaN(songId)) return;

		const song = songListState[0].find(song => song.id === songId);

		if (!song) return;

		setSong(song);
	}, []);

	// Update the scrobbling interval
	useEffect(() => {
		const i = setInterval(() => {
			if (playing) listening.current++;
		}, 1000);

		return () => clearInterval(i);
	}, [playing]);

	// Scrobble data to Maloja
	useEffect(() => {
		// Stop if admin
		const duration = listening.current;

		if (
			!previousSong ||
			!duration ||
			!client ||
			!props.authed
		)
			return;

		// Reset the counter
		listening.current = 0;

		// Scrobble
		client.mutation('manage.scrobble', {
			duration,
			song: previousSong,
		});
	}, [previousSong]);

	return (
		<>
			<Meta
				title='Playlist'
				description='The place where you actually listen to music.'
			/>

			<PlayerContext.Provider
				value={{
					songs: songListState,
					song: [song, setSong],
					zen: [zen, setZen],
				}}
			>
				<motion.main
					variants={variants}
					initial='initial'
					animate='animate'
					exit='exit'
				>
					<motion.div
						className='pointer-events-none fixed inset-0 z-20'
						initial={{
							y: '-100%',
						}}
						animate={{
							y: zen ? 0 : '-100%',
							transition: {
								type: 'spring',
								stiffness: 260,
								damping: 20,
							},
						}}
					>
						<Casette
							className='m-auto w-2col'
							song={song}
							progress={progressState[0]}
						/>
					</motion.div>
					{/* Container of songs */}
					<motion.div
						animate={{
							opacity: zen ? 0 : 1,
						}}
						className={zen ? 'pointer-events-none' : ''}
					>
						<div className='z-10 m-auto mt-8 mb-[216px] flex max-w-2col flex-col gap-2'>
							{props.songs.length ? (
								props.songs.map((song, i) => (
									<div key={i}>
										<SongPlaylist song={song} />
									</div>
								))
							) : (
								<p className='text-center'>No songs</p>
							)}
						</div>
					</motion.div>

					<Controls
						authed={props.authed}
						progress={progressState}
						playing={[playing, setPlaying]}
					/>
				</motion.main>
			</PlayerContext.Provider>
		</>
	);
};

const getServerSideProps: GetServerSideProps = logtoClient.withLogtoSsr(
	async ({ req }) => {
		const songs = await prisma.song.findMany({
			orderBy: {
				createdAt: 'asc',
			},
			include: { media: true, authors: true },
		});

		return {
			props: {
				// Don't show the videos that aren't available
				songs: songs.filter((song) => !song.media?.flagged),
				authed: isAuthed(req.user),
			} as Props,
		};
	}
);

export default Playlist;
export { getServerSideProps };
