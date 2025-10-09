export interface HelperProps {
  tooltip: React.ReactNode | string;
  value: React.ReactNode | string;
  onClick?: (value: unknown) => void;
}
