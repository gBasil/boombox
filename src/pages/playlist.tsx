import type { GetServerSideProps, NextPage } from 'next';
import { SongPlaylist } from '../components/Song';
import Controls from '../components/Controls';
import SongType from '../types/Song';
import { prisma } from '../server/db/client';
import { PlayerContext } from '../components/Controls/playerContext';
import { useEffect, useState } from 'react';
import Song from '../types/Song';
import Casette from '../components/Casette';
import Meta from '../components/Meta';
import { logtoClient } from '../utils/server/logto';
import { trpc } from '../utils/trpc';
import { LogtoContext } from '@logto/next';

type Props = {
	songs: SongType[];
	user: LogtoContext;
};

const Playlist: NextPage<Props> = (props) => {
	// List of all available songs
	const songListState = useState<Song[]>(props.songs);
	// Current playing song
	const [song, setSong] = useState<Song | undefined>();
	// Zen/casette mode
	const zen = useState(false);
	// Whether the song is playing
	const [playing, setPlaying] = useState(false);
	// We need to store the progress here so we can pass it to the zen mode casette
	const progressState = useState(0);
	const { client } = trpc.useContext();

	// Now Playing
	useEffect(() => {
		// Don't update if we're not an admin, not playing anything, or the song is paused
		if (
			!props.user.claims?.role_names?.includes('admin') ||
			!song ||
			!playing
		)
			return;

		const update = () => {
			if (song) client.mutation('manage.nowPlaying', song);
		};

		const i = setInterval(update, 15 * 1000);
		update();

		return () => clearInterval(i);
	}, [song, playing, client, props.user.claims?.role_names]);

	return (
		<>
			<Meta
				title='Playlist'
				description='The place where you actually listen to music.'
			/>

			<PlayerContext.Provider
				value={{ songs: songListState, song: [song, setSong], zen }}
			>
				<main>
					{zen[0] ? (
						<div>
							<Casette
								className='m-auto w-2col'
								song={song}
								progress={progressState[0]}
							/>
						</div>
					) : (
						// Container of songs
						<div className='m-auto mt-8 mb-[216px] flex max-w-2col flex-col gap-2'>
							{props.songs.length ? (
								props.songs.map((song, i) => (
									<SongPlaylist key={i} song={song} />
								))
							) : (
								<p className='text-center'>No songs</p>
							)}
						</div>
					)}

					<Controls
						progress={progressState}
						playing={[playing, setPlaying]}
					/>
				</main>
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
				user: req.user,
			} as Props,
		};
	}
);

export default Playlist;
export { getServerSideProps };
