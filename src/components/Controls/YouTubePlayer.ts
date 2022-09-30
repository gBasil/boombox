type YouTubePlayer = {
	playVideo: () => void;
	pauseVideo: () => void;
	getCurrentTime: () => number;
	seekTo: (position: number) => void;
	getVolume: () => number;
	setVolume: (volume: number) => void;
}

export default YouTubePlayer;