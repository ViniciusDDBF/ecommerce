import React from 'react';
import CustomSelect from '../../components/atoms/CustomSelect';

interface onSortByProps {
  onSortBy: (sort: string) => void;
}

const ReviewSortBy: React.FC<onSortByProps> = ({ onSortBy }) => {
  return (
    <div className="flex justify-end">
      <div className="w-40">
        <h1>Sort by</h1>
        <CustomSelect
          value="latest"
          placeholder="Sort"
          options={[
            { label: 'Latest', value: 'latest' },
            { label: 'Oldest', value: 'oldest' },
            { label: 'Positive Votes', value: 'positive_votes' },
            { label: 'Negative Votes', value: 'negative_votes' },
          ]}
          onChange={onSortBy}
        />
      </div>
    </div>
  );
};

export default ReviewSortBy;
