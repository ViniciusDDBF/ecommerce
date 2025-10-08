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
      description="Create your account to access the full flow of the website"
      icon={<UserPlus />}
      isOpen={isOpen}
      scrollLock={false}
      size="lg"
      title="Create Account"
    >
      <FormGrid
        columns={2}
        errors={signUpForm.errors}
        fields={fields}
        onChange={signUpForm.setValue}
        values={signUpForm.values}
      />
      <div className="mt-4 text-center">
        <span className="text-charcoal-300 text-sm">
          Already have a account?{' '}
          <button
            className="text-ember-400 cursor-pointer font-semibold hover:underline"
            onClick={onSwitchToLogin}
            type="button"
          >
            Log in
          </button>
        </span>
      </div>
    </Dialog>
  );
};
