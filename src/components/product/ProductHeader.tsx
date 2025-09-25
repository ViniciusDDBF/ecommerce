interface ProductHeaderProps {
  productName: string;
  description: string;
  currentPrice: number;
  originalPrice: number;
}

export default function ProductHeader({
  productName,
  description,
  currentPrice,
  originalPrice,
}: ProductHeaderProps) {
  return (
    <div className="space-y-3 sm:space-y-4 lg:space-y-6">
      <h1 className="text-charcoal-50 text-xl leading-tight font-bold sm:text-2xl md:text-3xl lg:text-4xl">
        {productName}
      </h1>
      <p className="text-charcoal-400 text-sm leading-relaxed sm:text-base lg:text-lg">
        {description}
      </p>
      <div className="text-ember-500 text-xl font-bold sm:text-2xl md:text-3xl">
        ${currentPrice.toFixed(2)}
        {originalPrice && originalPrice > currentPrice && (
          <>
            <span className="text-charcoal-400 ml-2 text-sm line-through sm:text-base md:text-lg">
              ${originalPrice.toFixed(2)}
            </span>
            <span className="text-ember-300 ml-2 text-xs sm:text-sm">
              {Math.round(
                ((originalPrice - currentPrice) / originalPrice) * 100,
              )}
              % OFF
            </span>
          </>
        )}
      </div>
    </div>
  );
}
