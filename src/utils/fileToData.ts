// Convert a file to a dataURI
const fileToData = (file: File) =>
	new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onload = (e) => {
			if (!e.target) return reject();

			resolve(e.target.result);
		};
		reader.onerror = () => reject();
		reader.readAsDataURL(file);
	});

export default fileToData;
