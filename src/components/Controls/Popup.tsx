import * as Slider from '@radix-ui/react-slider';
import { Dices, Volume2 } from 'lucide-react';
import { useContext } from 'react';
import UseState from '../../types/UseState';
import shuffle from './actions/shuffle';
import Casette from './Casette';
import { PlayerContext } from './playerContext';
import YouTubePlayer from './YouTubePlayer';

type PopupProps = {
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

	return (
		<div className='relative w-full'>
			<div className='absolute bottom-[6px] right-0 h-[160px] w-1col overflow-clip'>
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
						onClick={() => setZen(!zen)}
						disabled={!props.open}
					>
						<Casette />
						Zen Mode
					</button>
					{/* <button className='flex gap-1'>
						<Edit />
						Edit Details
					</button> */}
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
