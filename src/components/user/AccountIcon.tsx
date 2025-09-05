import { User } from 'lucide-react';

type AccountIcon = {
  count?: number;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
};

const AccountIcon: React.FC<AccountIcon> = ({ onClick }) => {
  return (
    <div
      onClick={onClick}
      className="relative inline-flex items-center justify-center w-12 h-12 rounded-full bg-charcoal-700 hover:bg-charcoal-600 transition-colors cursor-pointer align-middle"
    >
      {/* User Icon */}
      <User className="w-6 h-6 text-gray-200" />
    </div>
  );
};

export default AccountIcon;
