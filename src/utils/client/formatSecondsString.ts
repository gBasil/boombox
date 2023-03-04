const s = (i: number, string: string) => `${i} ${string}${i === 1 ? '' : 's'}`;

function formatSeconds(seconds: number): string {
	const days         = Math.floor(seconds / 60 / 60 / 24);
	const hoursInDay   = Math.floor(seconds / 60 / 60 % 24);
	const hr           = Math.floor(seconds / 60 / 60);
	const min          = Math.floor(seconds / 60);
	const sec          = Math.floor(seconds);

	if (days > 0) return s(days, 'day') + ' and ' + s(hoursInDay, 'hour');
	if (hr   > 0) return s(hr,   'hour');
	if (min  > 0) return s(min,  'minute');
	if (sec  > 0) return s(sec,  'second');
	return s(sec, 'second');
}

export default formatSeconds;