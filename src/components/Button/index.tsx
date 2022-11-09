import { ReactNode } from 'react';

type ButtonProps = {
	children: ReactNode;
	onClick?: () => void;
};

const Button = (props: ButtonProps) => (
	<button
		className='flex min-w-[152px] items-center justify-center gap-1 rounded-1 bg-lightGreen py-1 px-2 font-bold text-darkestGreen transition-colors hover:bg-green'
		onClick={props.onClick}
	>
		{props.children}
	</button>
);

export default Button;
