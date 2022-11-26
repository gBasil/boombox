import type { NextPage } from 'next';
import Casette from '../components/Casette';
import { ArrowRight, LayoutDashboard } from 'lucide-react';
import Link from 'next/link';
import { logtoClient } from '../utils/server/logto';
import { LogtoContext } from '@logto/next';
import Meta from '../components/Meta';
import { motion, Variants } from 'framer-motion';
import Button from '../components/Button';

type Props = {
	user: LogtoContext;
};

const variants: Variants = {
	initial: {
		opacity: 0,
	},
	animate: {
		opacity: 1,
		transition: {
			duration: 0.3,
			ease: [0.11, 0.86, 0.62, 0.95],
		},
	},
	exit: {
		opacity: 0,
		transition: {
			duration: 0.2,
			ease: [0.86, 0.11, 0.95, 0.62],
		},
	},
};

const Home: NextPage<Props> = (props) => (
	<>
		<Meta
			title="Basil's Boombox"
			description='My eclectic music playlist'
		/>

		<motion.main
			className='mb-8'
			variants={variants}
			initial='initial'
			animate='animate'
			exit='exit'
		>
			<div className='m-auto w-page child:mx-1'>
				{/* Please don't rebrand this. */}
				<h1 className='mt-8 text-center font-newsreader text-title'>
					Basil&apos;s Boombox
				</h1>
				<div>
					{/* Unset height so the SVG scales */}
					<Casette
						width={456}
						height=''
						className='m-auto mt-3 mb-8'
					/>
				</div>
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
					<a>
						<Button>
							Enter <ArrowRight height={16} width={16} />
						</Button>
					</a>
				</Link>

				{props.user.isAuthenticated ? (
					<Link href='/manage'>
						<a>
							<Button>
								Dashboard{' '}
								<LayoutDashboard height={16} width={16} />
							</Button>
						</a>
					</Link>
				) : null}
			</div>
		</motion.main>
	</>
);

const getServerSideProps = logtoClient.withLogtoSsr(({ req }) => ({
	props: { user: req.user },
}));

export default Home;
export { getServerSideProps, variants };
