export interface Iaddress {
  address_id: number;
  user_id: string;
  customer_id: number;
  address_name: string;
  recipient_name: string;
  postal_code: string;
  number: string;
  complement: string | null;
  street: string;
  neighborhood: string;
  city: string;
  state: string;
  country: string;
  is_default: boolean;
}

export interface Iuser {
  customer_id: number;
  user_id: string;
  first_name: string | null;
  last_name: string | null;
  email: string;
  phone: string;
  cpf: string | null;
  cnpj: string | null;
  company_name: string | null;
  legal_name: string | null;
  is_cpf: boolean;
  addresses: Iaddress[];
}

export interface IuserSlice {
  user: Iuser | null;
  isLoading: boolean;
  error: unknown;
}

export interface SupabaseUserArgs {
  email: string;
  password: string;
}

export interface ThunkCreateCustomerArgs {
  first_name: string;
  last_name: string;
  phone?: string;
  cpf?: string;
  email: string;
  password?: string;
}

export interface FetchCreateCustomerArgs extends ThunkCreateCustomerArgs {
  user_id: string;
}
