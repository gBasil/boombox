import type { GetServerSideProps, NextPage } from 'next';
import { SongPlaylist } from '../components/Song';
import Controls from '../components/Controls';
import SongType from '../types/Song';
import { prisma } from '../server/db/client';
import { PlayerContext } from '../components/Controls/playerContext';
import { useState } from 'react';
import Song from '../types/Song';
import Casette from '../components/Casette';
import Meta from '../components/Meta';

type Props = {
	songs: SongType[];
};

const Playlist: NextPage<Props> = (props) => {
	const songListState = useState<Song[]>(props.songs);
	const songState = useState<Song | undefined>();
	const zen = useState(false);
	// We need to store the progress here so we can pass it to the zen casette
	const progress = useState(0);

	return (
		<>
			<Meta
				title='Playlist'
				description='The place where you actually listen to music.'
			/>

			<PlayerContext.Provider
				value={{ songs: songListState, song: songState, zen }}
			>
				<main>
					{zen[0] ? (
						<div>
							<Casette
								className='m-auto w-2col'
								song={songState[0]}
								progress={progress[0]}
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

					<Controls progress={progress} />
				</main>
			</PlayerContext.Provider>
		</>
	);
};

const getServerSideProps: GetServerSideProps = async () => {
	const songs = await prisma.song.findMany({
		orderBy: {
			createdAt: 'asc',
		},
		include: { media: true, authors: true },
	});

	return {
		props: {
			songs,
		} as Props,
	};
};

export default Playlist;
export { getServerSideProps };
