import { Html, Head, Main, NextScript } from 'next/document';
import Stripes from '../components/Stripes';

const Document = () => (
	<Html>
		<Head>
			<link rel='icon' href='/favicon.ico' />
		</Head>
		<body className='mx-2 bg-darkestGreen font-inter text-lightestGreen'>
			<Main />
			<NextScript />

			<Stripes />
		</body>
	</Html>
);

export default Document;
