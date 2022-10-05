import { Dispatch, SetStateAction } from 'react';

type UseState<T> = [T, Dispatch<SetStateAction<T>>];

export default UseState;
