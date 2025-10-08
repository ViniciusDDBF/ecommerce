import type { FC, LoginDialogProps } from '@/types';
import { LogIn } from 'lucide-react';
import { Dialog } from '@/components/atoms';
import { FormGrid } from '@/components/molecules';

export const LoginDialog: FC<LoginDialogProps> = ({
  isOpen,
  onClose,
  loginForm,
  handleSubmitLogin,
  isLoading,
  onSwitchToSignUp,
  fields,
}) => {
  return (
    <Dialog
      ScrollLock={false}
      title="Log in"
      isOpen={isOpen}
      description="Log in with your existing account"
      size="lg"
      icon={<LogIn />}
      buttons={{
        cancel: {
          text: 'Close',
          onClick: onClose,
        },
        confirm: {
          text: 'Log in',
          onClick: handleSubmitLogin,
          loading: isLoading,
        },
      }}
    >
      <FormGrid
        fields={fields}
        values={loginForm.values}
        errors={loginForm.errors}
        onChange={loginForm.setValue}
        columns={2}
      />
      <div className="mt-4 text-center">
        <span className="text-charcoal-300 text-sm">
          Don't have an account?{' '}
          <button
            type="button"
            className="text-ember-400 cursor-pointer font-semibold hover:underline"
            onClick={onSwitchToSignUp}
          >
            Create Account
          </button>
        </span>
      </div>
    </Dialog>
  );
};
