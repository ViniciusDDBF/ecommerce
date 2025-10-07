import type { DeleteAddressModalProps, FC } from '../../../types';
import { Modal } from '../../../components/atoms';

export const DeleteAddressModal: FC<DeleteAddressModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
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
