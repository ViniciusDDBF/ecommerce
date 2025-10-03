export interface DrawerProps {
  isOpen: boolean;
  children?: React.ReactNode;
  position?: 'left' | 'right';
  className?: string;
}
