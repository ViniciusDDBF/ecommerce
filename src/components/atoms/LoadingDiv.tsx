import { type ReactNode } from 'react';

interface LoadingDivProps {
  loader?: boolean;
  children?: ReactNode;
  [key: string]: any;
}

export const LoadingDiv = ({
  loader = false,
  children,
  ...divProps
}: LoadingDivProps) => {
  return (
    <div className="relative" {...divProps}>
      {children}
      {loader && (
        <div className="glass-effect absolute inset-0 z-10 flex items-center justify-center bg-charcoal-800 opacity-80">
          <div className="border-ember-500 h-16 w-16 animate-spin rounded-full border-4 border-t-transparent" />
        </div>
      )}
    </div>
  );
};
