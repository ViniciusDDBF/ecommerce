import type { FC, SupabaseUserArgs, ThunkCreateCustomerArgs } from '@/types';
import { useEffect, useState } from 'react';
import { CircleCheck, LogIn, Mail, MessageCircleX } from 'lucide-react';
import { Button, Dialog, Modal } from '@/components/atoms';
import {
  AccountDropdown,
  AccountIcon,
  GoogleIcon,
  LoginDialog,
  loginFields,
  SignUpDialog,
  signUpFields,
} from '@/components/molecules';
import { useForm, useScrollLock } from '@/hooks/';
import { supabase } from '@/SupabaseConfig';
import { useAppDispatch, useAppSelector } from '@/store/hooks/hooks';
import {
  resetError,
  ThunkCreateCustomer,
  ThunkLogIn,
} from '@/store/slices/userSlice';

const handleGoogleSignIn = async () => {
  try {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  } catch (_err) {}
};

export const AccountHeader: FC = () => {
  const [choicesIsOpen, setChoicesIsOpen] = useState(false);
  const [loginIsOpen, setLoginIsOpen] = useState(false);
  const [signUpIsOpen, setSignUpIsOpen] = useState(false);
  const login = useForm({ fields: loginFields, initialValues: {} });
  const signUp = useForm<ThunkCreateCustomerArgs>({
    fields: signUpFields,
    initialValues: {},
  });
  const dispatch = useAppDispatch();
  const user = useAppSelector('user');
  const [isLocked, setIsLocked] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [signUpSuccess, setSignUpSuccess] = useState(false);
  const [errorModal, setErrorModal] = useState(false);

  /* ---------- Lock the scroll ---------- */
  useEffect(() => {
    if (
      choicesIsOpen ||
      loginIsOpen ||
      signUpIsOpen ||
      loginSuccess ||
      signUpSuccess ||
      errorModal
    ) {
      setIsLocked(true);
    } else {
      setIsLocked(false);
    }
  }, [
    choicesIsOpen,
    loginIsOpen,
    signUpIsOpen,
    loginSuccess,
    signUpSuccess,
    errorModal,
  ]);

  useScrollLock({ isActive: isLocked });

  const handleSubmitLogin = async () => {
    if (!login.validate()) return;
    try {
      await dispatch(
        ThunkLogIn({
          email: login.values.email,
          password: login.values.password,
        } as SupabaseUserArgs),
      );
      setLoginIsOpen(false);
      setLoginSuccess(true);
      login.reset();
    } catch (_err) {
      setErrorModal(true);
    }
  };

  const handleSubmitSignUp = async () => {
    if (!signUp.validate()) return;
    const {
      confirm_password: _,
      cpf,
      email,
      first_name,
      last_name,
      password,
      phone,
    } = signUp.values;
    const newUser: ThunkCreateCustomerArgs = {
      cpf,
      email,
      first_name,
      last_name,
      password,
      phone,
    };
    try {
      signUp.setIsSubmitting(true);
      await dispatch(ThunkCreateCustomer(newUser));
      setSignUpSuccess(true);
      signUp.reset();
    } catch (_err) {
      setErrorModal(true);
    } finally {
      signUp.setIsSubmitting(false);
      setSignUpIsOpen(false);
    }
  };

  return (
    <div>
      <main>
        {!user.user && <AccountIcon onClick={() => setChoicesIsOpen(true)} />}
        {user.user && <AccountDropdown />}

        {/* ---------- Login With: Dialog ---------- */}
        <Dialog
          buttons={{
            cancel: {
              text: 'Close',
              onClick: () => setChoicesIsOpen(false),
            },
          }}
          icon={<LogIn />}
          isOpen={choicesIsOpen}
          onClose={() => setChoicesIsOpen(false)}
          scrollLock={false}
          size="lg"
          title="Welcome"
        >
          <div className="flex flex-col gap-6">
            {/* ---------- Google button ---------- */}
            <Button
              className="bg-charcoal-800 hover:bg-charcoal-700 border-charcoal-600 hover:border-charcoal-500 glass-effect border"
              loading={user.isLoading}
              onClick={handleGoogleSignIn}
              size="md"
              startIcon={<GoogleIcon />}
              text="Continue with Google"
              variant="secondary"
            />

            {/* ---------- Email button ---------- */}
            <Button
              className="bg-charcoal-800 hover:bg-charcoal-700 border-charcoal-600 hover:border-charcoal-500 glass-effect border"
              loading={false}
              onClick={() => {
                setChoicesIsOpen(false);
                setLoginIsOpen(true);
              }}
              size="md"
              startIcon={<Mail />}
              text="Continue with Email"
              variant="secondary"
            />
          </div>
        </Dialog>

        {/* ---------- Login Dialog ---------- */}
        <LoginDialog
          fields={loginFields}
          handleSubmitLogin={handleSubmitLogin}
          isLoading={user.isLoading}
          isOpen={loginIsOpen}
          loginForm={login}
          onClose={() => {
            dispatch(resetError());
            login.reset();
            setLoginIsOpen(false);
          }}
          onSwitchToSignUp={() => {
            setSignUpIsOpen(true);
            setLoginIsOpen(false);
          }}
        />

        {/* ---------- Login Success ---------- */}
        <Modal
          buttons={{
            cancel: {
              text: 'Close',
              onClick() {
                setLoginSuccess(false);
              },
            },
          }}
          icon={<CircleCheck />}
          isOpen={loginSuccess}
          message={`Welcome back ${user.user?.first_name}!`}
          title="Success!"
        />

        {/* ---------- Signup as CPF Dialog ---------- */}
        <SignUpDialog
          fields={signUpFields}
          handleSubmitSignUp={handleSubmitSignUp}
          isLoading={user.isLoading}
          isOpen={signUpIsOpen}
          onClose={() => {
            dispatch(resetError());
            signUp.reset();
            setSignUpIsOpen(false);
          }}
          onSwitchToLogin={() => {
            setLoginIsOpen(true);
            setSignUpIsOpen(false);
          }}
          signUpForm={signUp}
        />

        {/* ---------- SignUp Success ---------- */}
        <Modal
          buttons={{
            cancel: {
              text: 'Close',
              onClick() {
                setSignUpSuccess(false);
              },
            },
          }}
          icon={<CircleCheck />}
          isOpen={signUpSuccess}
          message={`You account has been succesfully created!`}
          title="Success!"
        />

        {/* ---------- Error modal ---------- */}
        <Modal
          buttons={{
            cancel: {
              text: 'Close',
              onClick() {
                setErrorModal(false);
              },
            },
          }}
          icon={<MessageCircleX />}
          isOpen={errorModal}
          message={`Something went wrong, i'm sorry for the inconvinience!`}
          title="Error!"
        />
      </main>
    </div>
  );
};
