import type { AuthTokenResponsePassword } from '@supabase/supabase-js';
import type {
  FetchCreateCustomerArgs,
  Iaddress,
  Iuser,
  IuserSlice,
  SupabaseUserArgs,
  ThunkCreateCustomerArgs,
} from '@/types';
import type { RootState } from '../store.ts';
import {
  createAsyncThunk,
  createSlice,
  isAnyOf,
  type PayloadAction,
} from '@reduxjs/toolkit';
import { supabase } from '../../SupabaseConfig.tsx';

// #region /* ---------- Functions ---------- */
const initialState: IuserSlice = {
  user: null,
  isLoading: false,
  error: null,
};

async function FetchSignUp({ email, password }: SupabaseUserArgs) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  return { data, error };
}

async function FetchLogIn({
  email,
  password,
}: SupabaseUserArgs): Promise<AuthTokenResponsePassword> {
  const data = await supabase.auth.signInWithPassword({
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

async function FetchGetSession() {
  const { data } = await supabase.auth.getSession();
  return data;
}

async function FetchCreateCustomer({
  user_id,
  first_name,
  last_name,
  email,
  phone,
  cpf,
}: FetchCreateCustomerArgs) {
  const { data, error } = await supabase
    .from('customers')
    .insert([
      {
        user_id,
        first_name,
        last_name,
        email,
        phone,
        cpf,
        is_cpf: !!cpf,
      },
    ])
    .select();
  if (error) {
  }
  return data;
}

async function FetchUpdateCustomer(formPayload: Iuser) {
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

async function FetchCreateCustomerAddress({
  address_name,
  recipient_name,
  postal_code,
  number,
  complement,
  street,
  neighborhood,
  city,
  state,
  country,
  is_default,
  customer_id,
}: Iaddress) {
  const { data, error } = await supabase
    .from('customer_addresses')
    .insert([
      {
        address_name,
        recipient_name,
        postal_code,
        number,
        complement,
        street,
        neighborhood,
        city,
        state,
        country,
        is_default,
        customer_id,
      },
    ])
    .select();
  if (error) {
  }
  return { data, error };
}

async function FetchUpdateCustomerAddress({
  address_name,
  recipient_name,
  postal_code,
  number,
  complement,
  street,
  neighborhood,
  city,
  state,
  country,
  is_default,
  customer_id,
  address_id,
}: Iaddress) {
  const { data, error } = await supabase
    .from('customer_addresses')
    .update({
      address_name,
      recipient_name,
      postal_code,
      number,
      complement,
      street,
      neighborhood,
      city,
      state,
      country,
      is_default,
      customer_id,
    })
    .eq('id', address_id)
    .select();
  if (error) {
  }
  return { data, error };
}

async function FetchUpdateCustomerDefaultAddress({
  address_id,
  customer_id,
}: Iaddress) {
  await supabase.rpc('set_default_address', {
    p_address_id: address_id,
    p_customer_id: customer_id,
  });
}

async function FetchDeleteCustomerAddress({ address_id }: Iaddress) {
  await supabase.from('customer_addresses').delete().eq('id', address_id);
}

async function FetchGetUserView(userId: string) {
  const data = await supabase
    .from('customer_information')
    .select('*')
    .eq('user_id', userId);
  return data;
}

async function FetchLogOut() {
  await supabase.auth.signOut();
}
// #endregion

// #region /* ---------- Thunks ---------- */
export const ThunkCreateCustomer = createAsyncThunk<
  Iuser,
  ThunkCreateCustomerArgs
>(
  'user/CreateCustomer',
  async ({ email, password, cpf, first_name, last_name, phone }) => {
    if (!password) return null;

    const signupData = await FetchSignUp({
      email,
      password,
    });

    if (signupData.data.user?.id) {
      await FetchCreateCustomer({
        email,
        password,
        cpf,
        first_name,
        last_name,
        phone,
        user_id: signupData.data.user.id,
      });
      const userView = await FetchGetUserView(signupData.data.user?.id);
      if (userView.data) return userView.data[0];
    }
  },
);

export const ThunkUpdateUser = createAsyncThunk<Iuser, Iuser>(
  'user/UpdateUser',
  async (payload, thunkApi) => {
    const state = thunkApi.getState() as RootState;
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
  },
);

export const ThunkCreateCustomerAddress = createAsyncThunk<Iuser, Iaddress>(
  'user/CreateCustomerAddress',
  async (payload) => {
    await FetchCreateCustomerAddress(payload);
    const userView = await FetchGetUserView(payload.user_id);
    if (userView?.data) return userView?.data[0];
  },
);

export const ThunkUpdateCustomerAddress = createAsyncThunk<Iuser, Iaddress>(
  'user/UpdateCustomerAddress',
  async (payload) => {
    await FetchUpdateCustomerAddress(payload);
    const userView = await FetchGetUserView(payload.user_id);
    if (userView?.data) return userView?.data[0];
  },
);

export const ThunkUpdateCustomerDefaultAddress = createAsyncThunk<
  Iuser,
  Iaddress
>('user/UpdateCustomerDefaultAddress', async (payload) => {
  await FetchUpdateCustomerDefaultAddress(payload);
  const userView = await FetchGetUserView(payload.user_id);
  if (userView?.data) return userView?.data[0];
});

export const ThunkDeleteCustomerAddress = createAsyncThunk<Iuser, Iaddress>(
  'user/DeleteCustomerAddress',
  async (payload) => {
    await FetchDeleteCustomerAddress(payload);
    const userView = await FetchGetUserView(payload.user_id);
    if (userView?.data) return userView?.data[0];
  },
);

export const ThunkLogIn = createAsyncThunk<Iuser, SupabaseUserArgs>(
  'user/LogIn',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const loginData = await FetchLogIn({
        email,
        password,
      });
      if (loginData.data?.user) {
        const tableData = await FetchGetUserView(loginData.data.user.id);
        if (tableData.data) {
          return tableData.data[0];
        }
      }
      return rejectWithValue('Invalid login credentials');
    } catch (err) {
      return rejectWithValue(String(err));
    }
  },
);

export const ThunkGoogle = createAsyncThunk<Iuser, void>(
  'user/GoogleSignIn',
  async () => {
    const userData = await FetchGetUser();
    console.log(userData, 'USER DATA');

    if (userData) {
      const userViewData = await FetchGetUserView(userData.id);
      if (userViewData.data?.length) {
        return userViewData.data[0];
      }
      const parts = userData.user_metadata.full_name.split(' ');
      const firstName = parts[0];
      const lastName = parts[parts.length - 1];
      const createCustomerData = await FetchCreateCustomer({
        email: userData.user_metadata.email,
        first_name: firstName,
        last_name: lastName,
        user_id: userData.id,
      });
      if (createCustomerData) {
        const userViewData = await FetchGetUserView(userData.id);
        if (userViewData.data) {
          return userViewData.data[0];
        }
      }
    }
  },
);

export const ThunkGetSession = createAsyncThunk<Iuser | null, void>(
  'user/GetSession',
  async (_, thunkApi) => {
    try {
      const state = thunkApi.getState() as RootState;
      const cachedUser = state.user.user;
      const isUserPopulated = cachedUser?.user_id;
      const isUserEqual =
        JSON.stringify(state.user.user) === JSON.stringify(cachedUser);
      const session = await FetchGetSession();
      if (isUserPopulated && isUserEqual) return cachedUser;

      if (session.session?.user?.id) {
        const userViewData = await FetchGetUserView(session.session.user.id);

        if (userViewData.data?.[0]) {
          return userViewData.data[0];
        }
      }

      return initialState;
    } catch (error) {
      return thunkApi.rejectWithValue(error || 'Failed to fetch session');
    }
  },
);

export const ThunkLogOut = createAsyncThunk<void, void>(
  'user/LogOut',
  async () => {
    await FetchLogOut();
  },
);
// #endregion

/* ---------- User Slice ---------- */
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetError(state) {
      state.error = null;
    },
  },
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
          ThunkGetSession.pending,
          ThunkCreateCustomer.pending,
          ThunkGoogle.pending,
          ThunkUpdateUser.pending,
          ThunkCreateCustomerAddress.pending,
          ThunkUpdateCustomerAddress.pending,
          ThunkDeleteCustomerAddress.pending,
          ThunkUpdateCustomerDefaultAddress.pending,
        ),
        (state) => {
          state.isLoading = true;
          state.error = null;
        },
      )
      .addMatcher(
        isAnyOf(
          ThunkLogIn.fulfilled,
          ThunkGetSession.fulfilled,
          ThunkCreateCustomer.fulfilled,
          ThunkGoogle.fulfilled,
          ThunkUpdateUser.fulfilled,
          ThunkCreateCustomerAddress.fulfilled,
          ThunkUpdateCustomerAddress.fulfilled,
          ThunkDeleteCustomerAddress.fulfilled,
          ThunkUpdateCustomerDefaultAddress.fulfilled,
        ),
        (state, action: PayloadAction<Iuser | null>) => {
          state.isLoading = false;
          state.user = action.payload;
        },
      )
      .addMatcher(
        isAnyOf(
          ThunkLogIn.rejected,
          ThunkGetSession.rejected,
          ThunkCreateCustomer.rejected,
          ThunkGoogle.rejected,
          ThunkUpdateUser.rejected,
          ThunkCreateCustomerAddress.rejected,
          ThunkUpdateCustomerAddress.rejected,
          ThunkDeleteCustomerAddress.rejected,
          ThunkUpdateCustomerDefaultAddress.rejected,
        ),
        (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
        },
      );
  },
});

export const { resetError } = userSlice.actions;
export default userSlice.reducer;

/* ---------- CreateAsyncThuynk definition ---------- */
// ThunkGetUserData = createAsyncThunk<Iuser, {}>
// createAsyncThunk<Returned, ThunkArg, ThunkApiConfig>()
// Returned → the type the thunk will return (your payload).
// In your case: Iuser.

// ThunkArg → the type of the argument you pass when you call dispatch(ThunkGetUserData(arg)).
// In your code you used {}, which means “an empty object”.
// That tells TypeScript this thunk expects an object, but with no defined properties.

// ThunkApiConfig → (optional) extra typing for dispatch, state, and rejectWithValue.

/* ---------- AddMatcher definition ---------- */
// addMatcher<ActionType extends AnyAction>(
//   matcher: (action: AnyAction) => action is ActionType,
//   reducer: (state: StateType, action: ActionType) => void
// ): void;
// ActionType → the type of action the matcher will handle.

// matcher → a type guard function that receives any action and returns true if it should be handled. If the function is a TypeScript type predicate (action is ActionType), then action in the reducer is typed safely.

// reducer → a function that updates the state when the action matches. Its action parameter is typed as ActionType.
