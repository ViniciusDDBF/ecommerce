import { store } from '../store/store';
import { ThunkGetSession } from '../store/slices/userSlice';

export const rootLoader = async () => {
  const result = await store.dispatch(ThunkGetSession());
  return result.payload;
};
