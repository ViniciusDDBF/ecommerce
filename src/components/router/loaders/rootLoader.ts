import { store } from '../../../store/store';
import { ThunkGetSession } from '../../../store/slices/userSlice';
import { supabase } from '../../../SupabaseConfig';

export const rootLoader = async () => {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) return null;

  const result = await store.dispatch(ThunkGetSession());
  return result.payload;
};
