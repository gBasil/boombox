import toast from 'react-hot-toast';
import { parse } from 'csv-parse/sync';

type ImportedSong = {
	id: string;
	date: Date;
};

const importSongs = (
	fileInput: HTMLInputElement | null,
	setSongs: (data: ImportedSong[]) => void
) => {
	if (!fileInput) return toast.error("Couldn't find");

	fileInput.click();
	fileInput.addEventListener('change', async (e) => {
		const files = (e.target as HTMLInputElement).files;
		if (!files || !files?.length) return toast.error('No file uploaded');

		const file = files[0];
		if (!file) return toast.error('No file uploaded');
		if (file.type !== 'text/csv') return toast.error('File is not a .csv');

		const text = await file.text();
		// The data we actually care about, which is the list of IDs and the dates they were added on
		const table = text
			.substring(
				text.lastIndexOf('Video Id,Time Added') +
					'Video Id,Time Added\n'.length
			)
			.split('\n')
			.slice(6)
			.filter((a) => a)
			.map((line) => line.trim())
			.join('\n');

		// TODO: Add check that it matches type
		const parsed: [string, string][] = parse(table);

		const data: ImportedSong[] = parsed.map(([id, date]) => ({
			id,
			date: new Date(Date.parse(date.toString())),
		}));

		setSongs(data);
	});
};

export default importSongs;
export type { ImportedSong };
