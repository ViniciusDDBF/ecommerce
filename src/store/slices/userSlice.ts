import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { supabase } from '../../SupabaseConfig';
import { isAnyOf } from '@reduxjs/toolkit';
import type { RootState } from '../store';

interface AddressData {
  address_id: number;
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

interface UserData {
  customer_id: number;
  user_id: string;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  phone: string | null;
  cpf: string | null;
  cnpj: string | null;
  company_name: string | null;
  legal_name: string | null;
  is_cpf: boolean;
  stores_id: number | null;
  addresses: AddressData[];
}

export interface UpdateCustomerInterface {
  first_name: string;
  last_name: string;
  phone: string;
  user_id: string;
}

type UserThunk = {
  user: UserData | null;
  isLoading: boolean;
  error: any;
};

type LoginArgs = { email: string; password: string };

export interface SignUpArgs {
  first_name: string;
  last_name: string;
  phone: string;
  cpf: string;
  email: string;
  password: string;
}

const initialState: UserThunk = {
  user: null,
  isLoading: false,
  error: null,
};

async function FetchSignUp(email: string, password: string) {
  let { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  return { data, error };
}

async function FetchCreateCustomer(formPayload: any, fetchPayload: any) {
  const { data, error } = await supabase
    .from('customers')
    .insert([
      {
        user_id: fetchPayload.user_id,
        first_name: formPayload.first_name,
        last_name: formPayload.last_name,
        email: formPayload.email,
        phone: formPayload.phone,
        cpf: formPayload.cpf,
        stores_id: 1,
        company_name: formPayload.company_name,
        legal_name: formPayload.legal_name,
        cnpj: formPayload.cnpj,
        is_cpf: !!formPayload.cpf,
      },
    ])
    .select();
  if (error) {
  }
  return data;
}

async function FetchLogIn(email: string, password: string) {
  let data = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return data;
}

async function FetchGetUser() {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

async function FetchGetUserView(user_id: string) {
  let data = await supabase
    .from('customer_information')
    .select('*')
    .eq('user_id', user_id);
  return data;
}

async function FetchUpdateCustomer(formPayload: UpdateCustomerInterface) {
  const { data } = await supabase
    .from('customers')
    .update({
      first_name: formPayload.first_name,
      last_name: formPayload.last_name,
      phone: formPayload.phone,
    })
    .eq('user_id', formPayload.user_id)
    .select();
  return data;
}

async function FetchGetSession() {
  const { data } = await supabase.auth.getSession();
  return data;
}

async function FetchLogOut() {
  await supabase.auth.signOut();
}

export const ThunkSignUp = createAsyncThunk<any, SignUpArgs>(
  'user/SignUp',
  async ({ email, password }) => {
    const userData = await FetchSignUp(email, password);
    return userData;
  },
);

export const ThunkCreateCustomer = createAsyncThunk<any, SignUpArgs>(
  'user/CreateCustomer',
  async (payload) => {
    const signupData = await FetchSignUp(payload.email, payload.password);

    const createData = await FetchCreateCustomer(payload, {
      user_id: signupData.data.user?.id,
    });
    return createData;
  },
);

export const ThunkLogIn = createAsyncThunk<UserData, LoginArgs>(
  'user/LogIn',
  async ({ email, password }) => {
    const loginData = await FetchLogIn(email, password);
    if (loginData.data.user) {
      const tableData = await FetchGetUserView(loginData.data.user.id);
      if (tableData.data) {
        return tableData.data[0];
      }
    }
  },
);

export const ThunkGetUser = createAsyncThunk<UserData, void>(
  'user/GetUser',
  async () => {
    const userData = await FetchGetUser();
    if (userData) {
      const userViewData = await FetchGetUserView(userData.id);
      if (userViewData.data) {
        return userViewData.data[0];
      }
    }
  },
);

export const ThunkUpdateUser = createAsyncThunk<
  UserData,
  UpdateCustomerInterface
>('user/UpdateUser', async (payload, thunkAPI) => {
  const state = thunkAPI.getState() as RootState;
  const userDes = state.user.user;
  if (!userDes?.user_id) return;
  const completePayload = {
    ...payload,
    user_id: userDes.user_id,
  };
  if (completePayload) await FetchUpdateCustomer(completePayload);
  if (userDes?.user_id) {
    const userData = await FetchGetUserView(userDes?.user_id);
    if (userData?.data) return userData.data[0];
  }
});

export const ThunkGoogle = createAsyncThunk<UserData, void>(
  'user/GoogleSignIn',
  async () => {
    const userData = await FetchGetUser();
    if (userData) {
      const userViewData = await FetchGetUserView(userData.id);
      if (userViewData.data?.length) {
        return userViewData.data[0];
      } else {
        const parts = userData.user_metadata.full_name.split(' '); // split by spaces
        const firstName = parts[0];
        const lastName = parts[parts.length - 1];
        const createCustomerData = await FetchCreateCustomer(
          {
            email: userData.user_metadata.email,
            first_name: firstName,
            last_name: lastName,
            phone: userData.phone,
          },
          {
            user_id: userData.id,
          },
        );
        if (createCustomerData) {
          const userViewData = await FetchGetUserView(userData.id);
          if (userViewData.data) {
            return userViewData.data[0];
          }
        }
      }
    }
  },
);

export const ThunkGetSession = createAsyncThunk<UserData | null, void>(
  'user/GetSession',
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState;
      const cachedUser = state.user.user;
      const isUserPopulated = cachedUser && cachedUser.user_id;
      const session = await FetchGetSession();
      if (isUserPopulated) return cachedUser;

      if (session.session && session.session.user?.id) {
        const userViewData = await FetchGetUserView(session.session.user.id);

        if (userViewData.data && userViewData.data[0]) {
          return userViewData.data[0];
        }
      }

      console.log('No session or user data found');
      return initialState;
    } catch (error) {
      return thunkAPI.rejectWithValue(error || 'Failed to fetch session');
    }
  },
);

export const ThunkLogOut = createAsyncThunk<any, void>(
  'user/LogOut',
  async () => {
    await FetchLogOut();
  },
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    /* ----------- ThungLogOut ----------- */
    builder
      .addCase(ThunkLogOut.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(ThunkLogOut.fulfilled, (state) => {
        state.isLoading = false;
        state.user = initialState.user;
      })
      .addCase(ThunkLogOut.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // Generic matchers for all thunks
    builder
      .addMatcher(
        isAnyOf(
          ThunkLogIn.pending,
          ThunkGetUser.pending,
          ThunkGetSession.pending,
          ThunkCreateCustomer.pending,
          ThunkGoogle.pending,
          ThunkUpdateUser.pending,
        ),
        (state) => {
          state.isLoading = true;
          state.error = null;
        },
      )
      .addMatcher(
        isAnyOf(
          ThunkLogIn.fulfilled,
          ThunkGetUser.fulfilled,
          ThunkGetSession.fulfilled,
          ThunkCreateCustomer.fulfilled,
          ThunkGoogle.fulfilled,
          ThunkUpdateUser.fulfilled,
        ),
        (state, action) => {
          state.isLoading = false;
          state.user = action.payload;
        },
      )
      .addMatcher(
        isAnyOf(
          ThunkLogIn.rejected,
          ThunkGetUser.rejected,
          ThunkGetSession.rejected,
          ThunkCreateCustomer.rejected,
          ThunkGoogle.rejected,
          ThunkUpdateUser.rejected,
        ),
        (state, action) => {
          state.isLoading = false;
          state.error = action.payload ?? action.error?.message;
        },
      );
  },
});

export default userSlice.reducer;

/* ----------- CreateAsyncThuynk definition ----------- */
// ThunkGetUserData = createAsyncThunk<UserData, {}>
// createAsyncThunk<Returned, ThunkArg, ThunkApiConfig>()
// Returned → the type the thunk will return (your payload).
// In your case: UserData.

// ThunkArg → the type of the argument you pass when you call dispatch(ThunkGetUserData(arg)).
// In your code you used {}, which means “an empty object”.
// That tells TypeScript this thunk expects an object, but with no defined properties.

// ThunkApiConfig → (optional) extra typing for dispatch, state, and rejectWithValue.

/* ----------- AddMatcher definition ----------- */
// addMatcher<ActionType extends AnyAction>(
//   matcher: (action: AnyAction) => action is ActionType,
//   reducer: (state: StateType, action: ActionType) => void
// ): void;
// ActionType → the type of action the matcher will handle.

// matcher → a type guard function that receives any action and returns true if it should be handled. If the function is a TypeScript type predicate (action is ActionType), then action in the reducer is typed safely.

// reducer → a function that updates the state when the action matches. Its action parameter is typed as ActionType.
