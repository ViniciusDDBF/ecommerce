import type { AccountSectionHeaderProps, FC } from '@/types/';
import { Button } from '@/components/atoms';

export const AccountSectionHeader: FC<AccountSectionHeaderProps> = ({
  title,
  subtitle,
  button,
}) => {
  return (
    <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:mb-12 sm:flex-row sm:items-center">
      <div className="flex-1">
        <h1 className="text-charcoal-50 mb-2 text-2xl font-light sm:mb-3 sm:text-3xl md:text-4xl">
          {title}
        </h1>
        <div className="bg-ember-500 mb-2 h-1 w-16 rounded-full sm:w-20"></div>
        <p className="text-charcoal-400 text-sm sm:text-base">{subtitle}</p>
      </div>
      {button && (
        <Button
          text={button.text}
          variant="primary"
          size="sm"
          startIcon={button.startIcon}
          onClick={button.onClick}
          className="w-full sm:w-auto"
        />
      )}
    </div>
  );
};
