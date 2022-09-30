import { Author } from '@prisma/client';

const formatAuthors = (authors: Author[]) =>
	authors.map((author) => author.name).join(' & ');

export default formatAuthors;
