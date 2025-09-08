import { User } from 'lucide-react';
import IconOverlay from '../IconOverlay';

type AccountIcon = {
  onClick?: React.MouseEventHandler<HTMLDivElement>;
};

const AccountIcon: React.FC<AccountIcon> = ({ onClick }) => {
  return (
    <IconOverlay
      onClick={onClick}
      icon={<User className="w-6 h-6 text-gray-200" />}
    />
  );
};

export default AccountIcon;
