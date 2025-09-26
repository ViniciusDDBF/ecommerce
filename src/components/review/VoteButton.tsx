import { ThumbsUp, ThumbsDown } from 'lucide-react';

interface VoteButtonsProps {
  positiveVotes: number;
  negativeVotes: number;
  hasVoted: boolean;
  onLike: () => void;
  onDislike: () => void;
  className?: string;
}

export const VoteButtons = ({
  positiveVotes,
  negativeVotes,
  hasVoted,
  onLike,
  onDislike,
  className = '',
}: VoteButtonsProps) => (
  <div
    className={`border-charcoal-700/50 flex items-center justify-center gap-4 border-t pt-4 ${className}`}
  >
    <button
      onClick={onLike}
      className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
        hasVoted
          ? 'text-charcoal-500 cursor-not-allowed'
          : 'text-charcoal-300 hover:text-ember-400 hover:bg-ember-500/10'
      } ${positiveVotes > 0 ? 'bg-ember-500/10 text-ember-400' : ''}`}
      disabled={hasVoted}
      aria-label={`Mark as helpful (${positiveVotes} likes)`}
    >
      <ThumbsUp className="h-4 w-4" />
      Helpful ({positiveVotes})
    </button>
    <button
      onClick={onDislike}
      className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
        hasVoted
          ? 'text-charcoal-500 cursor-not-allowed'
          : 'text-charcoal-300 hover:text-ember-400 hover:bg-ember-500/10'
      } ${negativeVotes > 0 ? 'bg-ember-500/10 text-ember-400' : ''}`}
      disabled={hasVoted}
      aria-label={`Mark as unhelpful (${negativeVotes} dislikes)`}
    >
      <ThumbsDown className="h-4 w-4" />
      Unhelpful ({negativeVotes})
    </button>
  </div>
);
