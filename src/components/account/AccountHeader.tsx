import { useRef, useState } from 'react';
import { UserPlus, LogIn, CircleCheck, Store, Mail } from 'lucide-react';
import { useClickOutside } from '../../hooks/useClickOutside';
import AccountIcon from './AccountIcon';
import Dialog from '../Dialog';
import FormGrid from '../form/FormGrid';
import type { FormFieldProps } from '../../hooks/useForm';
import { useForm } from '../../hooks/useForm';
import {
  ThunkCreateCustomer,
  ThunkLogIn,
  type SignUpArgs,
} from '../../store/slices/userSlice';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store/store';
import AccountDropdown from './AccountDropdown';
import Button from '../Button';
import { supabase } from '../../SupabaseConfig';
import { useAppDispatch } from '../../store/hooks/hooks';

const loginFields: FormFieldProps[] = [
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    placeholder: 'Enter your email',
    colSpan: 2,
    validation: { required: true },
  },
  {
    name: 'password',
    label: 'Password',
    type: 'password',
    placeholder: 'Enter your password',
    colSpan: 2,
    validation: { required: true },
  },
];

const signUpFieldsCpf: FormFieldProps[] = [
  {
    name: 'first_name',
    label: 'First Name',
    type: 'text',
    placeholder: 'Enter your first name',
    colSpan: 1,
    validation: { required: true },
  },
  {
    name: 'last_name',
    label: 'Last Name',
    type: 'text',
    placeholder: 'Enter your Last name',
    colSpan: 1,
    validation: { required: true },
  },
  {
    name: 'phone',
    label: 'Phone',
    type: 'text',
    placeholder: 'Enter your phone number',
    colSpan: 1,
    applyMask: 'phone',
    validation: { required: true },
  },
  {
    name: 'cpf',
    label: 'CPF',
    type: 'text',
    placeholder: 'Enter your CPF',
    colSpan: 1,
    applyMask: 'cpf',
    helper: {
      text: 'Use test CPF',
      value: '11144477735',
    },
    validation: { required: true },
  },
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    placeholder: 'Enter your email',
    colSpan: 2,
    validation: { required: true },
  },
  {
    name: 'password',
    label: 'Password',
    type: 'password',
    placeholder: 'Enter your password',
    colSpan: 1,
    validation: { required: true },
    confirmField: 'confirm_password',
  },
  {
    name: 'confirm_password',
    label: 'Confirm your Password',
    type: 'password',
    placeholder: 'Enter your password again',
    colSpan: 1,
    validation: { required: true },
  },
];

const signUpFieldsCnpj: FormFieldProps[] = [
  {
    name: 'legal_name',
    label: 'Legal Name',
    type: 'text',
    placeholder: 'Enter your legal name',
    colSpan: 1,
    validation: { required: true },
  },
  {
    name: 'company_name',
    label: 'Company Name',
    type: 'text',
    placeholder: 'Enter your company name',
    colSpan: 1,
    validation: { required: true },
  },
  {
    name: 'phone',
    label: 'Phone',
    type: 'text',
    placeholder: 'Enter your phone number',
    colSpan: 1,
    applyMask: 'phone',
    validation: { required: true },
  },
  {
    name: 'cnpj',
    label: 'CNPJ',
    type: 'text',
    placeholder: 'Enter your CNPJ',
    colSpan: 1,
    applyMask: 'cnpj',
    validation: { required: true },
    helper: { text: 'Use test CNPJ', value: '12.345.678/0001-95' },
  },
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    placeholder: 'Enter your email',
    colSpan: 2,
    validation: { required: true },
  },
  {
    name: 'password',
    label: 'Password',
    type: 'password',
    placeholder: 'Enter your password',
    colSpan: 1,
    validation: { required: true },
    confirmField: 'confirm_password',
  },
  {
    name: 'confirm_password',
    label: 'Confirm your Password',
    type: 'password',
    placeholder: 'Enter your password again',
    colSpan: 1,
    validation: { required: true },
  },
];

const GoogleIcon = ({ className = 'w-5 h-5' }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="#FBBC05"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
    />
    <path
      fill="#EA4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
    />
  </svg>
);

// Updated handleGoogleSignIn function
const handleGoogleSignIn = async () => {
  try {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  } catch (err) {
    console.error('Error during Google Sign-In:', err);
  }
};

const AccountHeader = () => {
  const [choicesIsOpen, setChoicesIsOpen] = useState(false);
  const [loginIsOpen, setLoginIsOpen] = useState(false);
  const [signUpCpfIsOpen, setSignUpCpfIsOpen] = useState(false);
  const [signUpCnpjIsOpen, setSignUpCnpjIsOpen] = useState(false);
  const loginRef = useRef<HTMLDivElement | null>(null);
  const signUpCpfRef = useRef<HTMLDivElement | null>(null);
  const signUpCnpjRef = useRef<HTMLDivElement | null>(null);
  const choicesRef = useRef<HTMLDivElement | null>(null);
  const login = useForm(loginFields);
  const signUpCpf = useForm(signUpFieldsCpf);
  const signUpCnpj = useForm(signUpFieldsCnpj);
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useAppDispatch();

  useClickOutside(loginRef, () => setLoginIsOpen(false));
  useClickOutside(signUpCpfRef, () => setSignUpCpfIsOpen(false));
  useClickOutside(signUpCnpjRef, () => setSignUpCnpjIsOpen(false));
  useClickOutside(choicesRef, () => setChoicesIsOpen(false));

  const handleSubmitLogin = async () => {
    if (!login.validate()) return;
    await dispatch(
      ThunkLogIn({
        email: login.values.email,
        password: login.values.password,
      }),
    );
  };

  const handleSubmitSignUpCPF = async () => {
    if (!signUpCpf.validate()) return;
    const { confirm_password, ...newUser } = signUpCpf.values;
    await dispatch(ThunkCreateCustomer(newUser as SignUpArgs));
    try {
      signUpCpf.setIsSubmitting(true);
      setSignUpCpfIsOpen(false);
      signUpCpf.reset();
    } finally {
      signUpCpf.setIsSubmitting(false);
    }
  };

  const handleSubmitSignUpCNPJ = async () => {
    if (!signUpCnpj.validate()) return;

    const { confirm_password, ...newUser } = signUpCnpj.values;
    await dispatch(ThunkCreateCustomer(newUser as SignUpArgs));
    try {
      signUpCnpj.setIsSubmitting(true);
      setSignUpCnpjIsOpen(false);
      signUpCnpj.reset();
    } finally {
      signUpCnpj.setIsSubmitting(false);
    }
  };

  return (
    <>
      <div>
        <main>
          {!user.user && <AccountIcon onClick={() => setChoicesIsOpen(true)} />}
          {user.user && <AccountDropdown />}

          {/* Choices dialog */}
          <Dialog
            title="Welcome"
            isOpen={choicesIsOpen}
            size="lg"
            icon={<LogIn />}
            onClose={() => setChoicesIsOpen(false)}
            buttons={{
              cancel: {
                text: 'Close',
                onClick: () => setChoicesIsOpen(false),
              },
            }}
          >
            <div className="flex flex-col gap-6">
              {/*  ----- Google button ----- */}
              <Button
                text="Continue with Google"
                variant="secondary"
                size="md"
                loading={user.isLoading}
                onClick={handleGoogleSignIn}
                startIcon={<GoogleIcon />}
                className="bg-charcoal-800 hover:bg-charcoal-700 border-charcoal-600 hover:border-charcoal-500 glass-effect border"
              />

              {/*  ----- Email button ----- */}
              <Button
                text="Continue with Email"
                variant="secondary"
                size="md"
                loading={false}
                onClick={() => {
                  setChoicesIsOpen(false);
                  setLoginIsOpen(true);
                }}
                startIcon={<Mail />}
                className="bg-charcoal-800 hover:bg-charcoal-700 border-charcoal-600 hover:border-charcoal-500 glass-effect border"
              />
            </div>
          </Dialog>

          {/* login dialog */}
          <Dialog
            title={user.user ? 'Success!' : 'Log in'}
            isOpen={loginIsOpen}
            description={
              user.user
                ? `Welcome back ${user.user.first_name}`
                : 'Log in with your existing account'
            }
            size="lg"
            icon={user.user ? <CircleCheck /> : <LogIn />}
            onClose={() => setLoginIsOpen(false)}
            buttons={
              user.user
                ? {
                    cancel: {
                      text: 'Close',
                      onClick: () => setLoginIsOpen(false),
                    },
                  }
                : {
                    cancel: {
                      text: 'Close',
                      onClick: () => setLoginIsOpen(false),
                    },
                    confirm: {
                      text: 'Log in',
                      onClick: handleSubmitLogin,
                      props: { loading: user.isLoading },
                    },
                  }
            }
          >
            {!user.user && (
              <FormGrid
                fields={loginFields}
                values={login.values}
                errors={login.errors}
                onChange={login.setValue}
                columns={2}
              />
            )}
            {/* Already have an account link */}
            {!user.user && (
              <div className="mt-4 text-center">
                <span className="text-charcoal-300 text-sm">
                  Don't have a account?{' '}
                  <button
                    type="button"
                    className="text-ember-400 cursor-pointer font-semibold hover:underline"
                    onClick={() => {
                      setSignUpCpfIsOpen(true);
                      setLoginIsOpen(false);
                    }}
                  >
                    Create Account
                  </button>
                </span>
              </div>
            )}
          </Dialog>

          {/* signup as CPF dialog */}
          <Dialog
            title="Sign Up as a individual"
            isOpen={signUpCpfIsOpen}
            description="Create your account"
            size="lg"
            icon={<UserPlus />}
            onClose={() => setSignUpCpfIsOpen(false)} // ✅ Correct
            buttons={{
              cancel: {
                text: 'Close',
                onClick: () => setSignUpCpfIsOpen(false),
              }, // ✅ Correct
              confirm: {
                text: signUpCpf.isSubmitting ? 'Creating...' : 'Create User',
                onClick: handleSubmitSignUpCPF,
                props: { loading: signUpCpf.isSubmitting },
              },
            }}
          >
            <FormGrid
              fields={signUpFieldsCpf}
              values={signUpCpf.values}
              errors={signUpCpf.errors}
              onChange={signUpCpf.setValue}
              columns={2}
            />
            {/* Already have an account link */}
            <div className="mt-4 flex flex-col gap-4 text-center">
              <span className="text-charcoal-300 text-sm">
                Already have a account?{' '}
                <button
                  type="button"
                  className="text-ember-400 cursor-pointer font-semibold hover:underline"
                  onClick={() => {
                    setLoginIsOpen(true);
                    setSignUpCnpjIsOpen(false);
                    setSignUpCpfIsOpen(false);
                  }}
                >
                  Log in
                </button>
              </span>

              <span className="text-charcoal-300 text-sm">
                You have a CNPJ?{' '}
                <button
                  type="button"
                  className="text-ember-400 cursor-pointer font-semibold hover:underline"
                  onClick={() => {
                    setSignUpCnpjIsOpen(true);
                    setSignUpCpfIsOpen(false);
                    setLoginIsOpen(false);
                  }}
                >
                  Create as a company
                </button>
              </span>
            </div>
          </Dialog>

          {/* signup as CNPJ dialog */}
          <Dialog
            title="Sign Up as a company"
            isOpen={signUpCnpjIsOpen}
            description="Create your account"
            size="lg"
            icon={<Store />}
            onClose={() => setSignUpCnpjIsOpen(false)}
            buttons={{
              cancel: {
                text: 'Close',
                onClick: () => setSignUpCnpjIsOpen(false),
              },
              confirm: {
                text: signUpCnpj.isSubmitting ? 'Creating...' : 'Create User',
                onClick: handleSubmitSignUpCNPJ,
                props: { loading: signUpCnpj.isSubmitting },
              },
            }}
          >
            <FormGrid
              fields={signUpFieldsCnpj}
              values={signUpCnpj.values}
              errors={signUpCnpj.errors}
              onChange={signUpCnpj.setValue}
              columns={2}
            />
            {/* Already have an account link */}
            <div className="mt-4 flex flex-col gap-4 text-center">
              <span className="text-charcoal-300 text-sm">
                Already have a account?{' '}
                <button
                  type="button"
                  className="text-ember-400 cursor-pointer font-semibold hover:underline"
                  onClick={() => {
                    setLoginIsOpen(true);
                    setSignUpCnpjIsOpen(false);
                    setSignUpCpfIsOpen(false);
                  }}
                >
                  Log in
                </button>
              </span>

              <span className="text-charcoal-300 text-sm">
                You have a CPF?{' '}
                <button
                  type="button"
                  className="text-ember-400 cursor-pointer font-semibold hover:underline"
                  onClick={() => {
                    setSignUpCpfIsOpen(true);
                    setSignUpCnpjIsOpen(false);
                    setLoginIsOpen(false);
                  }}
                >
                  Create as a individual
                </button>
              </span>
            </div>
          </Dialog>
        </main>
      </div>
    </>
  );
};

export default AccountHeader;
