const formatSeconds = (seconds: number) =>
	`${Math.floor(seconds / 60)}:${(seconds % 60).toString().padStart(2, '0')}`;

export default formatSeconds;
