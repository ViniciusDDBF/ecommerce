import type { FC, ReviewSortByProps } from '@/types';
import { CustomSelect } from '@/components/atoms';

export const ReviewSortBy: FC<ReviewSortByProps> = ({ onSortBy }) => {
  return (
    <div className="flex justify-end">
      <div className="w-40">
        <h1>Sort by</h1>
        <CustomSelect
          onChange={onSortBy}
          options={[
            { label: 'Latest', value: 'latest' },
            { label: 'Oldest', value: 'oldest' },
            { label: 'Positive Votes', value: 'positive_votes' },
            { label: 'Negative Votes', value: 'negative_votes' },
          ]}
          placeholder="Sort"
          value="latest"
        />
      </div>
    </div>
  );
};
