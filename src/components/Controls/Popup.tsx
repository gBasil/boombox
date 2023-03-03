import * as Slider from '@radix-ui/react-slider';
import { Dices, Edit, Link, Volume2, Youtube } from 'lucide-react';
import { useContext } from 'react';
import UseState from '../../types/UseState';
import shuffle from './actions/shuffle';
import Casette from './Casette';
import { PlayerContext } from './playerContext';
import YouTubePlayer from './YouTubePlayer';
import copy from 'clipboard-copy';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/router';

type PopupProps = {
	authed: boolean;
	open: boolean;
	player: YouTubePlayer;
	volume: UseState<number>;
};

const Popup = (props: PopupProps) => {
	const {
		song,
		songs: [songs],
		zen: [zen, setZen],
	} = useContext(PlayerContext);
	const [, setVolume] = props.volume;
	const [songData] = song;
	const router = useRouter();

	const share = () => {
		copy(document.location.origin + document.location.pathname + '?id=' + songData?.media.youtubeId)
			.then(() => toast.success('Copied Boombox link to clipboard'))
			.catch(() => toast.error('Error copying Boombox link :('));
	};

	const openYouTube = () => {
		if (songData?.media.type !== 'yt') return;
		const id = songData?.media.youtubeId;
		window.open(`https://youtube.com/watch?v=${id}`);
	}

	const edit = () => {
		router.push({
			pathname: '/manage',
			query: { editId: songData?.id }
		}, '/manage');
	}

	return (
		<div className='relative w-full'>
			<div className={`absolute bottom-[6px] right-0 w-1col overflow-clip ${!props.open ? 'pointer-events-none' : ''}`}>
				<div
					className={`flex h-full flex-col gap-2 rounded-t-1 bg-lightGreen p-2 font-bold text-darkestGreen transition-transform duration-300 ${
						props.open ? 'translate-y-0' : 'translate-y-full'
					}`}
				>
					<button
						className='flex gap-1'
						onClick={() => shuffle(song, songs)}
						disabled={!props.open}
					>
						<Dices />
						Random song
					</button>
					<button
						className='flex gap-1'
						onClick={share}
						disabled={!props.open}
					>
						<Link />
						Share
					</button>
					{
						song[0]?.media.type === 'yt' ?
						<button
							className='flex gap-1'
							onClick={openYouTube}
							disabled={!props.open}
						>
							<Youtube />
							Open in YouTube
						</button> :
						null
					}
					<button
						className='flex gap-1'
						onClick={() => setZen(!zen)}
						disabled={!props.open}
					>
						<Casette />
						Zen Mode
					</button>
					
					{props.authed ? <button
						className='flex gap-1'
						onClick={edit}
						disabled={!props.open}
					>
						<Edit />
						Edit Song
					</button> : null}
					<div className={`flex flex-col gap-1 transition-opacity`}>
						<div className='flex gap-1'>
							<Volume2 />
							Volume
						</div>
						<Slider.Root
							defaultValue={[props.player.getVolume()]}
							dir='ltr'
							min={0}
							max={100}
							onValueChange={([volume]) => {
								props.player.setVolume(volume ?? 100);
								setVolume(volume ?? 100);
							}}
							className='relative z-10 block h-2 w-full cursor-pointer'
							disabled={!props.open}
						>
							<Slider.Track className='absolute top-[6px] block h-[4px] w-full bg-darkGreen' />
							<Slider.Thumb className='bottom-2 block h-2 w-2 rounded-1 bg-green' />
						</Slider.Root>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Popup;
