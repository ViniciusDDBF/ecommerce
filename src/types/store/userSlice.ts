export interface UserData {
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
  addresses: AddressData[];
}

export interface AddressData {
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

export interface UserThunk {
  user: UserData | null;
  isLoading: boolean;
  error: any;
}

export interface LoginArgs {
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
