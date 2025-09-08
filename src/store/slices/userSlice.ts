import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Session } from '@supabase/supabase-js';
import { supabase } from '../../SupabaseConfig';

interface UserData {
  customer_id: number;
  user_id: string;
  first_name: string | null;
  last_name: string | null;
  email: string;
  phone: string | null;
  cpf_cnpj: string | null;
  stores_id: number | null;
  address_id: number | null;
  address_name: string | null;
  street: string | null;
  district: string | null;
  city: string | null;
  state: string | null;
  postal_code: string | null;
  country: string | null;
  is_default: boolean | null;
  number: string | null;
  complement: string | null;
}

type UserPayload = {
  user: UserData;
  session: Session;
};

type UserThunk = {
  session: Session | null;
  user: UserData | null;
  isLoading: boolean;
  error: any;
  LogInSPBS?: () => void;
};

const initialState: UserThunk = {
  session: null,
  user: null,
  isLoading: false,
  error: null,
};

async function FetchDoLogIn(email: string, password: string) {
  let data = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return data;
}

async function FetchGetUserView(user_id: string) {
  let data = await supabase
    .from('customer_information')
    .select('*')
    .eq('user_id', user_id);
  return data;
}

async function FetchGetUser() {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

async function FetchSignUp(email: string, password: string) {
  let { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  return { data, error };
}

async function HandleOAuthCallback() {
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (error) {
    throw error;
  }

  if (session?.user) {
    const tableData = await FetchGetUserView(session.user.id);
    if (tableData.data && tableData.data[0]) {
      return { user: tableData.data[0], session };
    } else {
      return { user: null, session };
    }
  }

  return null;
}

export const ThunkSignUp = createAsyncThunk<
  any,
  { email: string; password: string }
>('user/SignUp', async ({ email, password }) => {
  const userData = await FetchSignUp(email, password);
  console.log(userData);
  return userData;
});

export const ThunkLogIn = createAsyncThunk<
  any,
  { email: string; password: string }
>('user/LogIn', async ({ email, password }) => {
  const loginData = await FetchDoLogIn(email, password);
  if (loginData.data.user) {
    const tableData = await FetchGetUserView(loginData.data.user.id);
    if (tableData.data) {
      return { user: tableData.data[0], session: loginData };
    }
  }
});

export const ThunkGetUserData = createAsyncThunk<any, {}>(
  'user/GetUser',
  async () => {
    const userData = await FetchGetUser();
    console.log(userData);
    return userData;
  }
);

export const ThunkHandleOAuthCallback = createAsyncThunk<any, {}>(
  'user/HandleOAuthCallback',
  async () => {
    const result = await HandleOAuthCallback();
    return result;
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // LogInSPBS
      .addCase(ThunkLogIn.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        ThunkLogIn.fulfilled,
        (state, action: PayloadAction<UserPayload>) => {
          state.isLoading = false;
          state.session = action.payload.session;
          state.user = action.payload.user;
        }
      )
      .addCase(ThunkLogIn.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // GetUserData
      .addCase(ThunkGetUserData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        ThunkGetUserData.fulfilled,
        (state, action: PayloadAction<UserPayload>) => {
          state.isLoading = false;
          state.session = action.payload.session;
          state.user = action.payload.user;
        }
      )
      .addCase(ThunkGetUserData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

// Export reducer
export default userSlice.reducer;
