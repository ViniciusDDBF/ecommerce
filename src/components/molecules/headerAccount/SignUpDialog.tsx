import type { FC, SignUpDialogProps } from '@/types';
import { UserPlus } from 'lucide-react';
import { Dialog } from '@/components/atoms';
import { FormGrid } from '@/components/molecules';

export const SignUpDialog: FC<SignUpDialogProps> = ({
  isOpen,
  onClose,
  signUpForm,
  handleSubmitSignUp,
  isLoading,
  onSwitchToLogin,
  fields,
}) => {
  return (
    <Dialog
      ScrollLock={false}
      title="Create Account"
      isOpen={isOpen}
      description="Create your account to access the full flow of the website"
      size="lg"
      icon={<UserPlus />}
      buttons={{
        cancel: {
          text: 'Close',
          onClick: onClose,
        },
        confirm: {
          text: 'Log in',
          onClick: handleSubmitSignUp,
          loading: isLoading,
        },
      }}
    >
      <FormGrid
        fields={fields}
        values={signUpForm.values}
        errors={signUpForm.errors}
        onChange={signUpForm.setValue}
        columns={2}
      />
      <div className="mt-4 text-center">
        <span className="text-charcoal-300 text-sm">
          Already have a account?{' '}
          <button
            type="button"
            className="text-ember-400 cursor-pointer font-semibold hover:underline"
            onClick={onSwitchToLogin}
          >
            Log in
          </button>
        </span>
      </div>
    </Dialog>
  );
};
