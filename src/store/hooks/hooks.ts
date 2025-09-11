import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../../store/store';

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector = <K extends keyof RootState>(
  slice: K,
): RootState[K] => useSelector((state: RootState) => state[slice]);
