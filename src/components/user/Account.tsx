import { useRef, useState } from 'react';
import { UserPlus, LogIn } from 'lucide-react';
import { useClickOutside } from '../../hooks/useClickOutside';
import AccountIcon from './AccountIcon';
import Dialog from '../Dialog';
import FormGrid from '../FormGrid';
import type { FormField } from '../../hooks/useForm';
import { useForm } from '../../hooks/useForm';

const loginFields: FormField[] = [
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    required: true,
    placeholder: 'Enter your email',
    colSpan: 2,
  },
  {
    name: 'password',
    label: 'Password',
    type: 'password',
    required: true,
    placeholder: 'Enter your password',
    colSpan: 2,
  },
];

const signUpFields: FormField[] = [
  {
    name: 'first_name',
    label: 'First Name',
    type: 'text',
    required: true,
    placeholder: 'Enter your first name',
    colSpan: 2,
  },
  {
    name: 'last_name',
    label: 'Last Name',
    type: 'text',
    required: true,
    placeholder: 'Enter your Last name',
    colSpan: 2,
  },
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    required: true,
    placeholder: 'Enter your email',
    colSpan: 2,
  },
  {
    name: 'password',
    label: 'Password',
    type: 'password',
    required: true,
    placeholder: 'Enter your password',
    colSpan: 2,
  },
];

const Account = () => {
  const [loginIsOpen, setLoginIsOpen] = useState(false);
  const [signUpIsOpen, setSignUpIsOpen] = useState(false);
  const loginRef = useRef<HTMLDivElement | null>(null);
  const signUpRef = useRef<HTMLDivElement | null>(null);

  const login = useForm(loginFields);
  const signUp = useForm(signUpFields);

  useClickOutside(loginRef, () => setLoginIsOpen(false));
  useClickOutside(signUpRef, () => setSignUpIsOpen(false));

  const handleSubmitLogin = async () => {
    if (!login.validate()) return;

    login.setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log('Form submitted:', login.values);
      setLoginIsOpen(false);
      login.reset();
    } finally {
      login.setIsSubmitting(false);
    }
  };

  const handleSubmitSignUp = async () => {
    if (!signUp.validate()) return;

    signUp.setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log('Form submitted:', signUp.values);
      setSignUpIsOpen(false);
      signUp.reset();
    } finally {
      signUp.setIsSubmitting(false);
    }
  };

  return (
    <>
      <div>
        <main>
          <AccountIcon onClick={() => setLoginIsOpen(true)} />

          {/* login dialog */}
          <Dialog
            title="Login"
            isOpen={loginIsOpen}
            description="Login with your existing account"
            size="lg"
            icon={<LogIn />}
            onClose={() => setLoginIsOpen(false)}
            buttons={{
              cancel: { text: 'Close', onClick: () => setLoginIsOpen(false) },
              confirm: {
                text: login.isSubmitting ? 'Creating...' : 'Create User',
                onClick: handleSubmitLogin,
                props: { loading: login.isSubmitting },
              },
            }}
          >
            <FormGrid
              fields={loginFields}
              values={login.values}
              errors={login.errors}
              onChange={login.setValue}
              columns={2}
            />
            {/* Already have an account link */}
            <div className="mt-4 text-center">
              <span className="text-sm text-charcoal-300">
                Don't have a account?{' '}
                <button
                  type="button"
                  className="text-ember-400 hover:underline font-semibold cursor-pointer"
                  onClick={() => {
                    setSignUpIsOpen(true);
                    setLoginIsOpen(false);
                  }}
                >
                  Create Account
                </button>
              </span>
            </div>
          </Dialog>

          {/* signup dialog */}
          <Dialog
            title="SignUp"
            isOpen={signUpIsOpen}
            description="Create your account"
            size="lg"
            icon={<UserPlus />}
            onClose={() => setSignUpIsOpen(false)} // ✅ Correct
            buttons={{
              cancel: { text: 'Close', onClick: () => setSignUpIsOpen(false) }, // ✅ Correct
              confirm: {
                text: signUp.isSubmitting ? 'Creating...' : 'Create User',
                onClick: handleSubmitSignUp,
                props: { loading: signUp.isSubmitting },
              },
            }}
          >
            <FormGrid
              fields={signUpFields}
              values={signUp.values}
              errors={signUp.errors}
              onChange={signUp.setValue}
              columns={2}
            />
            {/* Already have an account link */}
            <div className="mt-4 text-center">
              <span className="text-sm text-charcoal-300">
                Don't have a account?{' '}
                <button
                  type="button"
                  className="text-ember-400 hover:underline font-semibold cursor-pointer"
                  onClick={() => {
                    setSignUpIsOpen(false);
                    setLoginIsOpen(true);
                  }}
                >
                  Create Account
                </button>
              </span>
            </div>
          </Dialog>
        </main>
      </div>
    </>
  );
};

export default Account;
