import type { NextPage } from 'next';
import Casette from '../components/Casette';
import { ArrowRight, LayoutDashboard } from 'lucide-react';
import Link from 'next/link';
import { logtoClient } from '../utils/server/logto';
import { LogtoContext } from '@logto/next';
import Meta from '../components/Meta';

type Props = {
	user: LogtoContext;
};

const Home: NextPage<Props> = (props) => (
	<>
		<Meta
			title="Basil's Boombox"
			description='My eclectic music playlist'
		/>

		<main className='mb-8'>
			{/* Please don't rebrand this. */}
			<h1 className='mt-8 text-center font-newsreader text-title'>
				Basil&apos;s Boombox
			</h1>
			{/* Unset height so the SVG scales */}
			<Casette width={456} height='' className='m-auto mt-3' />

			<div className='m-auto mt-8 w-page child:mx-1'>
				<p>
					This is my eclectic music playlist. I enjoy listening to
					music a lot, so I created a playlist page on my website. As
					time went on, I started running into problems, like the
					deletion of videos, the inability to fix them with great
					ease, and managing the mess that resulted from my first
					foray into both React and planned out web design. I’ve been
					meaning to craft a separate music-centric website for a
					while, and inspired by the likes of{' '}
					<a className='link' href='https://osu.ppy.sh'>
						osu!
					</a>
					,{' '}
					<a className='link' href='https://paco.me'>
						Paco
					</a>
					, and{' '}
					<a className='link' href='http://www.celestegame.com'>
						Celeste
					</a>
					, this is the result.
				</p>
				<p className='mt-3 emphasis'>~ Basil</p>
			</div>

			<div className='flex justify-center gap-3'>
				<Link href='/playlist'>
					<button className='flex min-w-[152px] items-center justify-center gap-1 rounded-1 bg-lightGreen py-1 px-2 font-bold text-darkestGreen transition-colors hover:bg-green'>
						Enter <ArrowRight height={16} width={16} />
					</button>
				</Link>

				{props.user.isAuthenticated ? (
					<Link href='/manage'>
						<button className='flex min-w-[152px] items-center justify-center gap-1 rounded-1 bg-lightGreen py-1 px-2 font-bold text-darkestGreen transition-colors hover:bg-green'>
							Dashboard <LayoutDashboard height={16} width={16} />
						</button>
					</Link>
				) : null}
			</div>
		</main>
	</>
);

const getServerSideProps = logtoClient.withLogtoSsr(({ req }) => ({
	props: { user: req.user },
}));

export default Home;
export { getServerSideProps };
