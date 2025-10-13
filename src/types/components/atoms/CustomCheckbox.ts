import type { Label } from '@/types/Common';

export interface CustomCheckboxProps {
  checked: boolean;
  label: Label;
  onChange: (checked: boolean) => void;
}
