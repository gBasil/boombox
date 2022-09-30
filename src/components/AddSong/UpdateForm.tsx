import { useFormikContext } from 'formik';
import { useEffect } from 'react';
import { Values } from './types';

type UpdateFormProps = {
	song?: Values;
};

const UpdateForm = (props: UpdateFormProps) => {
	const { setValues } = useFormikContext<Values>();

	useEffect(() => {
		if (props.song) setValues(props.song);
	}, [props.song, setValues]);

	return <></>;
};

export default UpdateForm;
