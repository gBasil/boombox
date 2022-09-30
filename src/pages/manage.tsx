import type { GetServerSideProps, NextPage } from 'next';
import { Headphones, Library, Plus, RefreshCw } from 'lucide-react';
import Link from 'next/link';
import { ReactNode, useState } from 'react';
import { SongManage } from '../components/Song';
import AddSong from '../components/AddSong';
import { trpc } from '../utils/trpc';
import SongType from '../types/Song';
import { prisma } from '../server/db/client';
import { Values } from '../components/AddSong/types';
import Media from '../types/Media';
import { logtoClient } from '../utils/logto';
import Meta from '../components/Meta';

type Props = {
	songs: SongType[];
};

const IconButton = (props: {
	children: ReactNode;
	full?: boolean;
	onClick?: () => void;
}) => (
	<button
		className={`rounded-1 p-1 transition-colors ${
			props.full
				? 'bg-lightestGreen text-darkestGreen hover:bg-lightGreen'
				: 'text-lightestGreen hover:text-lightGreen'
		}`}
		onClick={props.onClick}
	>
		{props.children}
	</button>
);

const Manage: NextPage<Props> = (props) => {
	const { data: songs } = trpc.useQuery(['playlist.list'], {
		initialData: props.songs,
	});
	const [showAddSong, setShowAddSong] = useState(false);
	const [editingSong, setEditingSong] = useState<
		(Values & { id: number }) | undefined
	>(undefined);

	return (
		<>
			<Meta title='Dashboard' description='The central management area.' />

			<h1 className='mt-5 text-center font-newsreader text-title'>
				Dashboard
			</h1>
			<nav className='mt-1 flex justify-center gap-1'>
				<Link href='/playlist'>
					<a className='rounded-1 p-1'>
						<Headphones />
					</a>
				</Link>
				<IconButton full>
					<Library />
				</IconButton>
			</nav>

			<main className='m-auto mt-3 mb-8 max-w-2col'>
				<div className='flex gap-2'>
					<IconButton
						full
						onClick={() => setShowAddSong(!showAddSong)}
					>
						<Plus
							className={`transition-transform ${
								showAddSong ? 'rotate-45' : ''
							}`}
						/>
					</IconButton>
					<IconButton full>
						<RefreshCw />
					</IconButton>
				</div>

				<AddSong
					open={showAddSong}
					setOpen={setShowAddSong}
					song={editingSong}
					setSong={setEditingSong}
				/>
				<div className='mt-[32px] flex flex-col gap-2'>
					{songs && songs.length ? (
						songs.map((song, i) => (
							<SongManage
								key={i}
								song={song as SongType}
								onClick={async () => {
									const cover = await fetch(
										`/api/cover/${song.id}`
									);

									setEditingSong({
										id: song.id,
										cover: `data:${cover.headers.get(
											'content-type'
										)};base64,${Buffer.from(
											await cover.arrayBuffer()
										).toString('base64')}`,
										authors: song.authors
											.map(({ name }) => name)
											.join(', '),
										title: song.title,
										youtubeId: (song.media as Media)
											.youtubeId as string,
									});

									setShowAddSong(true);
								}}
							/>
						))
					) : (
						<p className='text-center'>No songs</p>
					)}
				</div>
			</main>
		</>
	);
};

const getServerSideProps: GetServerSideProps = logtoClient.withLogtoSsr(
	async ({ req, res }) => {
		const { user } = req;

		if (!user.isAuthenticated) {
			res.setHeader('location', '/sign-in');
			res.statusCode = 302;
			res.end();
		}

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
	}
);

export default Manage;
export { getServerSideProps };
