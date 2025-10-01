interface ProductInfoPanelProps {
  sku: string;
  description: string;
  dimensions?: {
    weight: number;
    height: number;
    width: number;
    length: number;
  };
}

export default function ProductInfoPanel({
  sku,
  description,
  dimensions,
}: ProductInfoPanelProps) {
  return (
    <div className="bg-charcoal-600 glass-effect rounded-xl p-4 sm:p-6">
      <h3 className="text-ember-400 mb-3 text-base font-semibold sm:mb-4 sm:text-lg md:text-xl">
        Description
      </h3>
      <ul className="text-charcoal-300 mb-4 space-y-2 text-xs sm:text-sm">
        <li className="flex items-start">
          <span>{description}</span>
        </li>
      </ul>
      <h3 className="text-ember-400 mb-3 text-base font-semibold sm:mb-4 sm:text-lg md:text-xl">
        Product Information
      </h3>
      <ul className="text-charcoal-300 space-y-2 text-xs sm:text-sm">
        <li className="flex items-start">
          <span className="text-ember-500 mr-2">•</span>
          <span>SKU: {sku}</span>
        </li>
        {dimensions && (
          <>
            <li className="flex items-start">
              <span className="text-ember-500 mr-2">•</span>
              <span>Weight: {dimensions.weight}kg</span>
            </li>
            <li className="flex items-start">
              <span className="text-ember-500 mr-2">•</span>
              <span>
                Dimensions: {dimensions.height}x{dimensions.width}x
                {dimensions.length}cm
              </span>
            </li>
          </>
        )}
      </ul>
    </div>
  );
}
