type Media = {
	type: 'yt';
	id: number;
	youtubeId?: string;
	// In seconds
	duration: number;
    // If the media is unavailable for one reason or another
	flagged: boolean;
};

export default Media;
