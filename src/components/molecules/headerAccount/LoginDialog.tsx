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
      description="Log in with your existing account"
      icon={<LogIn />}
      isOpen={isOpen}
      scrollLock={false}
      size="lg"
      title="Log in"
    >
      <FormGrid
        columns={2}
        errors={loginForm.errors}
        fields={fields}
        onChange={loginForm.setValue}
        values={loginForm.values as Record<string, string>}
      />
      <div className="mt-4 text-center">
        <span className="text-charcoal-300 text-sm">
          Don't have an account?{' '}
          <button
            className="text-ember-400 cursor-pointer font-semibold hover:underline"
            onClick={onSwitchToSignUp}
            type="button"
          >
            Create Account
          </button>
        </span>
      </div>
    </Dialog>
  );
};
