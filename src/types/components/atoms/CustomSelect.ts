export interface ISelectOption {
  value: string;
  label: string;
}

export interface CustomSelectProps {
  options?: ISelectOption[];
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
}
