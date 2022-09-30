import { useFormikContext } from 'formik';
import { FileUp } from 'lucide-react';
import { useRef } from 'react';
import fileToData from '../../utils/fileToData';
import { Values } from './types';

const FileUpload = () => {
	const { setFieldValue } = useFormikContext<Values>();
	const ref = useRef<HTMLInputElement>(null);

	return (
		// This "type" silliness is due to Formik
		<button
			type='button'
			onClick={() => {
				ref.current?.click();
			}}
		>
			<FileUp className='h-2 w-2' />
			<input
				name='cover'
				type='file'
				accept='image/*'
				ref={ref}
				className='hidden'
				onChange={async (e) => {
					if (e.currentTarget.files && e.currentTarget.files[0]) {
						const file = e.currentTarget.files[0];
						setFieldValue('cover', await fileToData(file));
					}
				}}
			/>
		</button>
	);
};

export default FileUpload;
