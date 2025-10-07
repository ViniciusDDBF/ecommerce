import type { LoadingDivProps, FC } from '../../types';

export const LoadingDiv: FC<LoadingDivProps> = ({
  loader = false,
  children,
  ...divProps
}) => {
  return (
    <div className="relative" {...divProps}>
      {children}
      {loader && (
        <div className="glass-effect bg-charcoal-800 absolute inset-0 z-10 flex items-center justify-center opacity-80">
          <div className="border-ember-500 h-16 w-16 animate-spin rounded-full border-4 border-t-transparent" />
        </div>
      )}
    </div>
  );
};
