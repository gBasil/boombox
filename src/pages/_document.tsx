import { Html, Head, Main, NextScript } from 'next/document';
import Stripes from '../components/Stripes';

const Document = () => (
	<Html>
		<Head>
			<link rel='icon' href='/favicon.ico' />
			<script
				async
				defer
				data-website-id='d4a35a5f-a8c9-44cb-9519-3a69de2bda29'
				data-do-not-track='true'
				data-domains='boombox.gbasil.dev'
				src='https://speedcore.gbasil.dev/umami.js'
			/>
		</Head>
		<body className='mx-2 bg-darkestGreen font-inter text-lightestGreen'>
			<Main />
			<NextScript />

			<Stripes />
		</body>
	</Html>
);

export default Document;
