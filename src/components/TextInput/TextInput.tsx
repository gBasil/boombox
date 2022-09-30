import { useField } from 'formik';

type TextInputProps = {
	name: string;
	label: string;
	placeholder?: string;
	className?: string;
	length?: number;
};

const TextInput = (props: TextInputProps) => {
	const [field] = useField(props);

	return (
		<label
			className={
				'flex flex-col gap-1 font-bold ' + (props.className || '')
			}
		>
			<p>{props.label}</p>
			<input
				type='text'
				{...field}
				{...{ maxLength: props.length, minLength: props.length }}
				// Inset shadow for parity with design
				className='rounded-1 border-0 bg-darkestGreen px-[12px] py-1 font-normal shadow-[inset_0_0_0_2px] shadow-darkGreen placeholder:text-green'
				placeholder={props.placeholder}
			/>
		</label>
	);
};

export default TextInput;
