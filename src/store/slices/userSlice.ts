// #region /* ---------- Imports ---------- */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { supabase } from '../../SupabaseConfig';
import { isAnyOf } from '@reduxjs/toolkit';
import type { RootState } from '../store';
// #endregion

// #region /* ---------- Types ---------- */
export interface UserData {
  customer_id?: number;
  user_id: string;
  first_name?: string | null;
  last_name?: string | null;
  email: string | null;
  phone: string | null;
  cpf?: string | null;
  cnpj?: string | null;
  company_name?: string | null;
  legal_name?: string | null;
  is_cpf: boolean;
  addresses?: AddressData[];
}

export interface AddressData {
  address_id?: number;
  user_id: string;
  customer_id: number;
  address_name: string | null;
  recipient_name: string | null;
  postal_code: string | null;
  number: string | null;
  complement: string | null;
  street: string | null;
  neighborhood: string | null;
  city: string | null;
  state: string | null;
  country: string | null;
  is_default: boolean | null;
}

interface UserThunk {
  user: UserData | null;
  isLoading: boolean;
  error: any;
}

interface LoginArgs {
  email: string;
  password: string;
}

export interface SignUpArgs {
  first_name: string;
  last_name: string;
  phone: string;
  cpf: string;
  email: string;
  password: string;
}
// #endregion

// #region /* ---------- Functions ---------- */
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

async function FetchLogIn(email: string, password: string) {
  try {
    let data = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return data;
  } catch (err) {
    return err;
  }
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

async function FetchUpdateCustomer(formPayload: UserData) {
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

async function FetchCreateCustomerAddress(formPayload: AddressData) {
  const { data, error } = await supabase
    .from('customer_addresses')
    .insert([
      {
        address_name: formPayload.address_name,
        recipient_name: formPayload.recipient_name,
        postal_code: formPayload.postal_code,
        number: formPayload.number,
        complement: formPayload.complement,
        street: formPayload.street,
        neighborhood: formPayload.neighborhood,
        city: formPayload.city,
        state: formPayload.state,
        country: formPayload.country,
        is_default: formPayload.is_default,
        customer_id: formPayload.customer_id,
      },
    ])
    .select();
  if (error) {
  }
  return { data, error };
}

async function FetchUpdateCustomerAddress(formPayload: AddressData) {
  const { data, error } = await supabase
    .from('customer_addresses')
    .update({
      address_name: formPayload.address_name,
      recipient_name: formPayload.recipient_name,
      postal_code: formPayload.postal_code,
      number: formPayload.number,
      complement: formPayload.complement,
      street: formPayload.street,
      neighborhood: formPayload.neighborhood,
      city: formPayload.city,
      state: formPayload.state,
      country: formPayload.country,
    })
    .eq('id', formPayload.address_id)
    .select();
  if (error) {
  }
  return { data, error };
}

async function FetchUpdateCustomerDefaultAddress(formPayload: AddressData) {
  const address_id = formPayload.address_id;
  const customer_id = formPayload.customer_id;
  await supabase.rpc('set_default_address', {
    p_address_id: address_id,
    p_customer_id: customer_id,
  });
}

async function FetchDeleteCustomerAddress({ address_id }: AddressData) {
  await supabase.from('customer_addresses').delete().eq('id', address_id);
}

async function FetchGetUserView(user_id: string) {
  let data = await supabase
    .from('customer_information')
    .select('*')
    .eq('user_id', user_id);
  return data;
}

async function FetchLogOut() {
  await supabase.auth.signOut();
}
// #endregion

// #region /* ---------- Thunks ---------- */
export const ThunkCreateCustomer = createAsyncThunk<any, SignUpArgs>(
  'user/CreateCustomer',
  async (payload) => {
    const signupData = await FetchSignUp(payload.email, payload.password);

    await FetchCreateCustomer(payload, {
      user_id: signupData.data.user?.id,
    });
    if (signupData.data.user?.id) {
      const userView = await FetchGetUserView(signupData.data.user?.id);
      if (userView.data) return userView.data[0];
    }
  },
);

export const ThunkUpdateUser = createAsyncThunk<UserData, UserData>(
  'user/UpdateUser',
  async (payload, thunkAPI) => {
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
  },
);

export const ThunkCreateCustomerAddress = createAsyncThunk<any, AddressData>(
  'user/CreateCustomerAddress',
  async (payload) => {
    await FetchCreateCustomerAddress(payload);
    const userView = await FetchGetUserView(payload.user_id);
    if (userView?.data) return userView?.data[0];
  },
);

export const ThunkUpdateCustomerAddress = createAsyncThunk<any, AddressData>(
  'user/UpdateCustomerAddress',
  async (payload) => {
    await FetchUpdateCustomerAddress(payload);
    const userView = await FetchGetUserView(payload.user_id);
    if (userView?.data) return userView?.data[0];
  },
);

export const ThunkUpdateCustomerDefaultAddress = createAsyncThunk<
  any,
  AddressData
>('user/UpdateCustomerDefaultAddress', async (payload) => {
  await FetchUpdateCustomerDefaultAddress(payload);
  const userView = await FetchGetUserView(payload.user_id);
  if (userView?.data) return userView?.data[0];
});

export const ThunkDeleteCustomerAddress = createAsyncThunk<any, AddressData>(
  'user/DeleteCustomerAddress',
  async (payload) => {
    await FetchDeleteCustomerAddress(payload);
    const userView = await FetchGetUserView(payload.user_id);
    if (userView?.data) return userView?.data[0];
  },
);

export const ThunkLogIn = createAsyncThunk<UserData, LoginArgs>(
  'user/LogIn',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const loginData = (await FetchLogIn(email, password)) as {
        data?: { user?: { id: string } };
      };
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
      const isUserEqual =
        JSON.stringify(state.user.user) === JSON.stringify(cachedUser);
      const session = await FetchGetSession();
      if (isUserPopulated && isUserEqual) return cachedUser;

      if (session.session && session.session.user?.id) {
        const userViewData = await FetchGetUserView(session.session.user.id);

        if (userViewData.data && userViewData.data[0]) {
          return userViewData.data[0];
        }
      }

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
          ThunkGetUser.pending,
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
          ThunkGetUser.fulfilled,
          ThunkGetSession.fulfilled,
          ThunkCreateCustomer.fulfilled,
          ThunkGoogle.fulfilled,
          ThunkUpdateUser.fulfilled,
          ThunkCreateCustomerAddress.fulfilled,
          ThunkUpdateCustomerAddress.fulfilled,
          ThunkDeleteCustomerAddress.fulfilled,
          ThunkUpdateCustomerDefaultAddress.fulfilled,
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
// ThunkGetUserData = createAsyncThunk<UserData, {}>
// createAsyncThunk<Returned, ThunkArg, ThunkApiConfig>()
// Returned → the type the thunk will return (your payload).
// In your case: UserData.

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
