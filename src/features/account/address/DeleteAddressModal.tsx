import { Modal } from '../../../components/atoms';
import type { DeleteAddressModalProps } from '../../../types';

export const DeleteAddressModal = ({
  isOpen,
  onClose,
  onConfirm,
}: DeleteAddressModalProps) => {
  return (
    <Modal
      isOpen={isOpen}
      title="Delete Address"
      message="This action is permanent"
      buttons={{
        cancel: {
          text: 'Close',
          onClick: onClose,
        },
        confirm: {
          text: 'Delete',
          onClick: onConfirm,
        },
      }}
    />
  );
};
