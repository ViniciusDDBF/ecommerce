import type React from 'react';

export interface InputProps
  extends Omit<React.ComponentPropsWithoutRef<'input'>, 'onChange'> {
  error?: boolean;
  onChange: (value: string) => void;
  value: string | number;
}
