import type { SignUpArgs } from '../../../types';
import { useEffect, useState } from 'react';
import { LogIn, CircleCheck, Mail } from 'lucide-react';
import { Dialog, Button, Modal } from '../../atoms/';
import {
  LoginDialog,
  SignUpDialog,
  AccountIcon,
  AccountDropdown,
  loginFields,
  signUpFields,
  GoogleIcon,
} from '../../molecules';
import { useForm, useScrollLock } from '../../../hooks/';
import {
  resetError,
  ThunkCreateCustomer,
  ThunkLogIn,
} from '../../../store/slices/userSlice';
import { supabase } from '../../../SupabaseConfig';
import { useAppDispatch, useAppSelector } from '../../../store/hooks/hooks';

const handleGoogleSignIn = async () => {
  try {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  } catch (err) {}
};

export const AccountHeader = () => {
  const [choicesIsOpen, setChoicesIsOpen] = useState(false);
  const [loginIsOpen, setLoginIsOpen] = useState(false);
  const [signUpIsOpen, setSignUpIsOpen] = useState(false);
  const login = useForm(loginFields);
  const signUp = useForm(signUpFields);
  const dispatch = useAppDispatch();
  const user = useAppSelector('user');
  const [isLocked, setIsLocked] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);

  /* ---------- Lock the scroll ---------- */
  useEffect(() => {
    if (choicesIsOpen || loginIsOpen || signUpIsOpen) {
      setIsLocked(true);
    } else {
      setIsLocked(false);
    }
  }, [choicesIsOpen, loginIsOpen, signUpIsOpen]);
  useScrollLock(isLocked);

  const handleSubmitLogin = async () => {
    if (!login.validate()) return;
    try {
      await dispatch(
        ThunkLogIn({
          email: login.values.email,
          password: login.values.password,
        }),
      );
      setLoginIsOpen(false);
      setLoginSuccess(true);
      login.reset();
    } catch (err) {}
  };

  const handleSubmitSignUp = async () => {
    console.log(signUp, 'SIGN UP');
    if (!signUp.validate()) return;
    const { confirm_password, ...newUser } = signUp.values;
    console.log(newUser, 'NEW USER');
    await dispatch(ThunkCreateCustomer(newUser as SignUpArgs));
    try {
      signUp.setIsSubmitting(true);
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
          {!user.user && <AccountIcon onClick={() => setChoicesIsOpen(true)} />}
          {user.user && <AccountDropdown />}

          {/* ---------- Login With: Dialog ---------- */}
          <Dialog
            ScrollLock={false}
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
              {/* ---------- Google button ---------- */}
              <Button
                text="Continue with Google"
                variant="secondary"
                size="md"
                loading={user.isLoading}
                onClick={handleGoogleSignIn}
                startIcon={<GoogleIcon />}
                className="bg-charcoal-800 hover:bg-charcoal-700 border-charcoal-600 hover:border-charcoal-500 glass-effect border"
              />

              {/* ---------- Email button ---------- */}
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

          {/* ---------- Login Dialog ---------- */}
          <LoginDialog
            isOpen={loginIsOpen}
            onClose={() => {
              dispatch(resetError());
              login.reset();
              setLoginIsOpen(false);
            }}
            fields={loginFields}
            loginForm={login}
            handleSubmitLogin={handleSubmitLogin}
            isLoading={user.isLoading}
            onSwitchToSignUp={() => {
              setSignUpIsOpen(true);
              setLoginIsOpen(false);
            }}
          />

          {/* ---------- Login Success ---------- */}
          <Modal
            title="Success!"
            message={`Welcome back ${user.user?.first_name}!`}
            icon={<CircleCheck />}
            buttons={{
              cancel: {
                text: 'Close',
                onClick() {
                  setLoginSuccess(false);
                },
              },
            }}
            isOpen={loginSuccess}
          />

          {/* ---------- Signup as CPF Dialog ---------- */}
          <SignUpDialog
            isOpen={signUpIsOpen}
            onClose={() => {
              dispatch(resetError());
              signUp.reset();
              setSignUpIsOpen(false);
            }}
            fields={signUpFields}
            signUpForm={signUp}
            handleSubmitSignUp={handleSubmitSignUp}
            isLoading={user.isLoading}
            onSwitchToLogin={() => {
              setLoginIsOpen(true);
              setSignUpIsOpen(false);
            }}
          />

          {/* ---------- SignUp Success ---------- */}
          <Modal
            title="Success!"
            message={`You account has been succesfully created!`}
            icon={<CircleCheck />}
            buttons={{
              cancel: {
                text: 'Close',
                onClick() {
                  setLoginSuccess(false);
                },
              },
            }}
            isOpen={loginSuccess}
          />
        </main>
      </div>
    </>
  );
};
