import type { User } from '@/types';

export interface FetchCreateCustomerArgs extends ThunkCreateCustomerArgs {
  user_id: string;
}

export interface SupabaseUserArgs {
  email: string;
  password: string;
}

export interface ThunkCreateCustomerArgs {
  cpf?: string;
  email: string;
  first_name: string;
  last_name: string;
  password?: string;
  phone?: string;
}

export interface UserSlice {
  error: unknown;
  isLoading: boolean;
  user: User | null;
}
