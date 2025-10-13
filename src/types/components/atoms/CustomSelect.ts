import type { Classname, Label, Placeholder, Value } from '@/types/Common';

export interface CustomSelectProps {
  className?: Classname;
  onChange?: (value: string) => void;
  options?: SelectOption[];
  placeholder?: Placeholder;
  value?: Value;
}

export interface SelectOption {
  label: Label;
  value: Value;
}
