export const LoadingOverlay = () => {
  return (
    <div className="glass-effect fixed inset-0 z-50 flex items-center justify-center bg-black opacity-70">
      <div className="border-ember-500 h-16 w-16 animate-spin rounded-full border-4 border-t-transparent"></div>
    </div>
  );
};
