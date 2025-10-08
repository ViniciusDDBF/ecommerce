import type { DeleteAddressModalProps, FC } from '@/types';
import { Modal } from '@/components/atoms';

export const DeleteAddressModal: FC<DeleteAddressModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  return (
    <Modal
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
      isOpen={isOpen}
      message="This action is permanent"
      title="Delete Address"
    />
  );
};
