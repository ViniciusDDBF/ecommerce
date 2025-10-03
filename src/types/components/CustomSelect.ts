export interface SelectOption {
  value: string;
  label: string;
}

export interface CustomSelectProps {
  options?: SelectOption[];
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
}
