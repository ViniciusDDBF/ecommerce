interface StockStatusProps {
  stockStatus: string;
  currentStock: number;
}

export const StockStatus = ({
  stockStatus,
  currentStock,
}: StockStatusProps) => {
  if (stockStatus === 'in_stock') return null;

  return (
    <div className="text-xs sm:text-sm">
      {stockStatus === 'low_stock' ? (
        <span className="text-yellow-400">
          Low stock ({currentStock} remaining)
        </span>
      ) : (
        <span className="text-red-400">Out of stock</span>
      )}
    </div>
  );
};
