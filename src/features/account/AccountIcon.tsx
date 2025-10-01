import { User } from 'lucide-react';
import IconOverlay from '../../components/atoms/IconOverlay';

type AccountIconProps = {
  onClick?: React.MouseEventHandler<HTMLDivElement>;
};

const AccountIcon: React.FC<AccountIconProps> = ({ onClick }) => {
  // Handle keyboard events for accessibility
  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault(); // Prevent default behavior like scrolling on Space
      onClick?.(event as any); // Call the onClick handler
    }
  };

  return (
    <IconOverlay
      onClick={onClick}
      icon={<User className="text-charcoal-200 h-5 w-5 sm:h-6 sm:w-6" />}
      tabIndex={onClick ? 0 : -1} // Focusable only if clickable
      onKeyDown={handleKeyDown} // Handle keyboard interaction
      role="button" // Indicate the element is interactive
      aria-label="User account" // Accessibility label
    />
  );
};

export default AccountIcon;
