import type { AppDispatch, RootState } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector = <K extends keyof RootState>(
  slice: K,
): RootState[K] => useSelector((state: RootState) => state[slice]);
