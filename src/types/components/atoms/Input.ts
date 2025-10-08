import type React from 'react';

export interface InputProps
  extends Omit<React.ComponentPropsWithoutRef<'input'>, 'onChange'> {
  value: string | number;
  onChange: (value: string) => void;
  error?: boolean;
}
