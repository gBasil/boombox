import { Html, Head, Main, NextScript } from 'next/document';
import Stripes from '../components/Stripes';

const Document = () => {
	return (
		<Html>
			<Head>
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<body className='bg-darkestGreen font-inter text-lightestGreen mx-2'>
				<Main />
				<NextScript />
				
				<Stripes />
			</body>
		</Html>
	);
};

export default Document;
