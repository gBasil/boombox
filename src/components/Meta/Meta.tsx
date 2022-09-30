import { NextSeo } from 'next-seo';
import tailwindConfig from '../../../tailwind.config.cjs';

type MetaProps = {
	title: string;
	description: string;
};

type Colors = {
	green: string;
};

const Meta = (props: MetaProps) => (
	<>
		<NextSeo title={props.title} description={props.description} />
		<meta name='theme-color' content={(tailwindConfig.theme?.colors as Colors).green} />
	</>
);

export default Meta;
