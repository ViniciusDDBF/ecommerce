import type { Classname, Label, Placeholder, Value } from '@/types/Common';

export interface SelectOption {
  label: Label;
  value: Value;
}

export interface CustomSelectProps {
  className?: Classname;
  onChange?: (value: string) => void;
  options?: SelectOption[];
  placeholder?: Placeholder;
  value?: Value;
}
