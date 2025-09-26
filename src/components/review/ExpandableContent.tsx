interface ExpandableContentProps {
  title: string;
  content: string;
  isExpanded: boolean;
  onToggle: () => void;
}

export const ExpandableContent = ({
  title,
  content,
  isExpanded,
  onToggle,
}: ExpandableContentProps) => (
  <div className="space-y-4">
    <h3 className="text-charcoal-100 mb-4 text-2xl leading-tight font-bold">
      {title}
    </h3>
    <p
      className={`text-charcoal-300 mb-4 text-lg leading-relaxed ${!isExpanded ? 'line-clamp-3' : ''}`}
    >
      {content}
    </p>
    {content.length > 200 && (
      <button
        className="text-ember-400 hover:text-ember-500 text-sm"
        onClick={onToggle}
      >
        {isExpanded ? 'Read Less' : 'Read More'}
      </button>
    )}
  </div>
);
