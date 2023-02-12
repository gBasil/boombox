const s = (i: number, string: string) => `${i} ${string}${i === 1 ? '' : 's'}`;

function formatSeconds(seconds: number): string {
	const day = Math.floor(seconds / (3600 * 24));
	const hr = Math.floor(seconds / 3600);
	const min = Math.floor(seconds % 3600 / 60);
	const sec = Math.floor(seconds % 3600 % 60);

	if (day > 0) return s(sec, 'day');
	if (hr > 0) return s(hr, 'hour');
	if (min > 0) return s(min, 'minute');
	return s(sec, 'second');
}

export default formatSeconds;