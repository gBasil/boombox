import * as Slider from '@radix-ui/react-slider';
import {
	ChevronUp,
	Pause,
	Play,
	Repeat,
	Shuffle,
	SkipBack,
	SkipForward,
} from 'lucide-react';
import { useContext, useEffect, useState } from 'react';
import YouTube from 'react-youtube';
import formatAuthors from '../../utils/formatAuthors';
import formatSeconds from '../../utils/formatSeconds';
import shuffle from './actions/shuffle';
import skipBack from './actions/skipBack';
import skipForward from './actions/skipForward';
import { PlayerContext } from './playerContext';
import YouTubePlayer from './YouTubePlayer';
import { usePrevious } from '@radix-ui/react-use-previous';
import Popup from './Popup';
import Stripes from '../Stripes';
import UseState from '../../types/UseState';

enum EndMode {
	NEXT,
	SHUFFLE,
	LOOP,
}

type ControlsProps = {
	authed: boolean;
	progress: UseState<number>;
	playing: UseState<boolean>;
};

const Controls = (props: ControlsProps) => {
	// Playback state
	const [endMode, setEndMode] = useState<EndMode>(EndMode.NEXT);
	const [playing, setPlaying] = props.playing;
	const [progress, setProgress] = props.progress;
	const [volume, setVolume] = useState(100);

	// Seek to position in song
	const prevProgress = usePrevious(progress);
	const [dragging, setDragging] = useState(false);
	const [thumbPosition, setThumbPosition] = useState(0);

	// Embedded video controls
	const [player, setPlayer] = useState<YouTubePlayer>();

	// Popup with extra controls
	const [showPopup, setShowPopup] = useState(false);

	// Current song and song list
	const {
		song: [song, setSong],
		songs: [songs],
	} = useContext(PlayerContext);

	// Update player progress
	useEffect(() => {
		if (!player) return;

		const i = setInterval(() => {
			setProgress(Math.floor(player.getCurrentTime() * 5) / 5);
		}, 200);

		return () => clearInterval(i);
	}, [player, progress, playing, setProgress]);

	return (
		<div className='relative'>
			<div
				className={`fixed bottom-0 left-2 right-2 m-auto max-w-page bg-darkestGreen pb-5 pt-2 text-center ${
					song ? '' : 'hidden'
				}`}
			>
				<h2 className='font-newsreader text-header'>{song?.title}</h2>
				<h3 className='emphasis'>
					{formatAuthors(song?.authors || [])}
				</h3>

				<Slider.Root
					defaultValue={[0]}
					value={[dragging ? thumbPosition : progress]}
					onValueChange={([progress]) =>
						setThumbPosition(progress || 0)
					}
					min={0}
					max={song?.media.duration}
					step={0.2}
					aria-label='Progress'
					dir='ltr'
					className='relative z-10 mt-2 block h-2 w-full cursor-pointer'
					onPointerDown={() => setDragging(true)}
					onPointerUp={() => {
						if (String(prevProgress) !== String(progress)) {
							player?.seekTo(thumbPosition);
							setProgress(thumbPosition);
							setDragging(false);
						}
					}}
				>
					<Slider.Track className='absolute top-[6px] block h-[4px] w-full bg-darkGreen' />
					<Slider.Thumb className='bottom-2 block h-2 w-2 rounded-1 bg-green' />
				</Slider.Root>

				{/* Ensure the player controller is passed through */}
				{player && (
					<Popup
						authed={props.authed}
						open={showPopup}
						player={player}
						volume={[volume, setVolume]}
					/>
				)}

				<div className='mt-1 flex justify-between text-lightGreen'>
					<a className='w-full text-start'>
						{formatSeconds(Math.floor(progress))}
					</a>
					<div className='relative flex gap-1'>
						<button
							onClick={() =>
								setEndMode(
									endMode === EndMode.LOOP
										? EndMode.NEXT
										: EndMode.LOOP
								)
							}
							className={`transition-colors ${
								endMode === EndMode.LOOP
									? 'text-lightestGreen'
									: ''
							}`}
						>
							<Repeat />
						</button>
						<button
							onClick={() => skipBack([song, setSong], songs)}
						>
							<SkipBack />
						</button>
						<button>
							{!player || !playing ? (
								<Play
									onClick={() => player && player.playVideo()}
								/>
							) : (
								<Pause
									onClick={() =>
										player && player.pauseVideo()
									}
								/>
							)}
						</button>
						<button
							onClick={() => skipForward([song, setSong], songs)}
						>
							<SkipForward />
						</button>
						<button>
							<Shuffle
								onClick={() =>
									setEndMode(
										endMode === EndMode.SHUFFLE
											? EndMode.NEXT
											: EndMode.SHUFFLE
									)
								}
								className={`transition-colors ${
									endMode === EndMode.SHUFFLE
										? 'text-lightestGreen'
										: ''
								}`}
							/>
						</button>

						<button
							className='absolute right-[-56px] text-green'
							onClick={() => setShowPopup(!showPopup)}
						>
							<ChevronUp
								className={`transition-transform duration-300 ${
									showPopup ? '-rotate-180' : 'rotate-0'
								}`}
							/>
						</button>
					</div>
					<a className='w-full text-end'>
						{formatSeconds(song?.media.duration || 0)}
					</a>
				</div>

				{/* Hide the embedded player */}
				<div aria-hidden className='hidden'>
					{song?.media.type === 'yt' ? (
						<YouTube
							videoId={song.media.youtubeId}
							opts={{
								playerVars: {
									// https://developers.google.com/youtube/player_parameters
									autoplay: 1,
								},
							}}
							onPlay={() => {
								setPlaying(true);
								// Update the player volume, since it resets on rerenders.
								// It's not flawless, but it'll work for now
								player?.setVolume(volume);
							}}
							onPause={() => setPlaying(false)}
							onEnd={() => {
								switch (endMode) {
									case EndMode.NEXT:
										skipForward([song, setSong], songs);
										break;
									case EndMode.LOOP:
										player?.seekTo(0);
										break;
									case EndMode.SHUFFLE:
										shuffle([song, setSong], songs);
										break;
								}
								setProgress(0);
							}}
							onReady={({ target }) => setPlayer(target)}
						/>
					) : null}
				</div>

				{/* Unelegant and not pixel perfect, but it works */}
				<Stripes absolute />
			</div>
		</div>
	);
};

export default Controls;
