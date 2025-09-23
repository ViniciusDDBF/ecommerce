const LoadingOverlay = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center glass-effect bg-black opacity-70">
      <div className="w-16 h-16 border-4 border-t-transparent border-ember-500 rounded-full animate-spin"></div>
    </div>
  );
};


export default LoadingOverlay;
