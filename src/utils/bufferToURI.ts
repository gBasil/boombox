const bufferToURI = (contentType: string, buffer: ArrayBuffer) =>
	`data:${contentType};base64,${Buffer.from(buffer).toString('base64')}`;

export default bufferToURI;
