import { useFormikContext } from 'formik';
import { Loader2 } from 'lucide-react';
import { Values } from './types';

type Props = {
	loading: boolean;
	song?: Values;
	import?: boolean;
};

const SubmitButton = (props: Props) => {
	const { values } = useFormikContext<Values>();
	const disabled = !Object.values(values).every((a) => a);

	return (
		<button
			type='submit'
			disabled={disabled || props.loading}
			className='w-full max-w-1col rounded-1 bg-lightestGreen py-1 flex justify-center font-bold text-darkestGreen transition-colors disabled:bg-green'
		>
			{props.loading ? <Loader2 className='animate-spin' /> : (!props.song || props.import ? 'Add' : 'Update')}
		</button>
	);
};

export default SubmitButton;
