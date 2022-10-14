import fetch from 'node-fetch';
import Song from '../types/Song';

const scrobblable = (length: number, seconds: number) =>
	seconds >= length / 2 || seconds >= 60 * 4;

const save = (song: Song, durations: number[]) => {
	for (const duration of durations)
		fetch(`${process.env.MALOJA_URL}/apis/mlj_1/newscrobble`, {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
			},
			body: JSON.stringify({
				title: song.title,
				artists: song.authors.map((author) => author.name),
				duration: duration, // Length of listen
				length: song.media.duration, // Length of song
				key: process.env.MALOJA_API_KEY
			}),
		}).then(res => res.text()).then(data => console.log(data));
	// console.log('---');
};

/**
 * Scrobbling guidelines (according to the Maloja docs [https://github.com/krateng/maloja/blob/master/API.md#scrobbling-guideline]):
 *
 * - As soon as a track has been played for 50% of its length or 4 minutes, it should be counted as a scrobble
 * - That scrobble should be submitted when the play has ended in order to know its duration
 * - If the total play duration is enough to count as a scrobble, but not longer than the total track length + enough for a second scrobble, it should be submitted as a scrobble with the according duration
 * - If the duration exceeds this value, the first scrobble should be submitted as a scrobble with the duration of the full track length, while the second scrobble is queued up following the above suggestions in regards to remaining time
 */

/**
 * Handles the scrobbling of a song
 * @param song The song that was just listened to
 * @param duration The number of seconds that the song was being listened to
 */
const scrobble = (song: Song, duration: number) => {
	const length = song.media.duration;

	if (!scrobblable(length, duration)) return;

	// How many times we should scrobble if all scrobbles are full length
	const roughCount = Math.ceil(duration / length);

	// If it's a single scrobble, stop here
	if (roughCount === 1) return save(song, [duration]);

	// Whether we should merge the last scrobble with the scrobble before it
	const mergeFinal = !scrobblable(
		length,
		duration - length * (roughCount - 1)
	);

	// Create the array of scrobbles. It's more readable like this
	const scrobbles = new Array(roughCount - 1).fill(length);

	// Merge the final if needed, otherwise add the remainder
	if (mergeFinal)
		scrobbles[scrobbles.length - 1] = length + (duration % length);
	else scrobbles.push(duration % length);

	save(song, scrobbles);
};

export default scrobble;

// scrobble(t(3, 0), t(1, 22)); // Nothing
// scrobble(t(3, 0), t(2, 6));  // 126
// scrobble(t(3, 0), t(3, 57)); // 237
// scrobble(t(3, 0), t(4, 49)); // 180, 109
// scrobble(t(3, 0), t(6, 30)); // 180, 210
// scrobble(t(3, 0), t(8, 30)); // 180, 180, 150
