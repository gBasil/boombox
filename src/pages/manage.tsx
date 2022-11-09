import type { GetServerSideProps, NextPage } from 'next';
import {
	BarChart3,
	Headphones,
	Library,
	Plus,
	RefreshCw,
	Siren,
} from 'lucide-react';
import Link from 'next/link';
import { createContext, ReactNode, useMemo, useRef, useState } from 'react';
import { SongManage } from '../components/Song';
import AddSong from '../components/AddSong';
import { trpc } from '../utils/trpc';
import SongType from '../types/Song';
import { prisma } from '../server/db/client';
import { Values } from '../components/AddSong/types';
import Media from '../types/Media';
import { logtoClient } from '../utils/server/logto';
import Meta from '../components/Meta';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { variants } from '.';
import UseState from '../types/UseState';

type Props = {
	songs: SongType[];
};

const IconButton = (props: {
	children: ReactNode;
	full?: boolean;
	onClick?: () => void;
	className?: string;
	disabled?: boolean;
}) => (
	<button
		className={`rounded-1 p-1 transition-colors ${
			props.full
				? 'bg-lightestGreen text-darkestGreen hover:bg-lightGreen'
				: 'text-lightestGreen hover:text-lightGreen'
		} ${props.className}`}
		onClick={props.onClick}
		disabled={props.disabled}
	>
		{props.children}
	</button>
);

// Refresh the thumbnail when updated.
type Thumbnails = Record<string, string>;
// eslint-disable-next-line
const ThumbnailsContext = createContext<UseState<Thumbnails>>(undefined as any);

const Manage: NextPage<Props> = (props) => {
	const { client } = trpc.useContext();
	const { data: songs } = trpc.useQuery(['playlist.list'], {
		initialData: props.songs,
	});
	const thumbnails = useState<Record<string, string>>({});
	const [rechecking, setRechecking] = useState(false);
	const [showAddSong, setShowAddSong] = useState(false);
	const [editingSong, setEditingSong] = useState<
		(Values & { id: number }) | undefined
	>(undefined);

	// Used for smoothly scrolling to the first element marked as flagged (inaccessible)
	const firstFlagged = useMemo(
		() => songs?.find((song) => song.media?.flagged),
		[songs]
	);
	const firstFlaggedEl = useRef<HTMLDivElement>(null);
	const scrollToFirstFlagged = () => {
		if (!firstFlaggedEl.current) return;

		firstFlaggedEl.current.scrollIntoView({
			behavior: 'smooth',
		});
	};

	return (
		<ThumbnailsContext.Provider value={thumbnails}>
			<Meta
				title='Dashboard'
				description='The central management area.'
			/>

			<motion.div
				className='mb-8'
				variants={variants}
				initial='initial'
				animate='animate'
				exit='exit'
			>
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

					<Link href={'/maloja'}>
						<a className='rounded-1 p-1'>
							<BarChart3 />
						</a>
					</Link>
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
						<IconButton full disabled={rechecking}>
							<RefreshCw
								onClick={() => {
									setRechecking(true);
									toast('Rechecking, please wait');
									client
										.query('manage.recheck')
										.then(async (val) => {
											if (val.length)
												toast.error(
													`${val.length} song${
														val.length === 1
															? ' is'
															: 's are'
													} unavailable`
												);
											else
												toast.success(
													'All songs are alright'
												);

											setRechecking(false);
										});
								}}
								className={rechecking ? 'animate-spin' : ''}
							/>
						</IconButton>

						{songs?.some((song) => song.media?.flagged) ? (
							<IconButton
								full
								// TODO: Make separate colors for hover and such
								className='bg-red hover:bg-red'
								onClick={() => scrollToFirstFlagged()}
							>
								<Siren />
							</IconButton>
						) : null}
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
								<div key={i}>
									<SongManage
										{...(song.id === firstFlagged?.id
											? {
													ref: firstFlaggedEl,
											  }
											: {})}
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
													// TODO: Resize on frontend
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
								</div>
							))
						) : (
							<p className='text-center'>No songs</p>
						)}
					</div>
				</main>
			</motion.div>
		</ThumbnailsContext.Provider>
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
export { getServerSideProps, ThumbnailsContext };
