import { AccountHeader } from '../../components/molecules';
import { Cart, Logo, CategoryNav } from '..';

export const Header = () => {
  return (
    <>
      {/* ---------- Main Header ---------- */}
      <header className="bg-charcoal-800 top-0 z-50">
        <div className="flex items-center justify-between px-4 py-3 sm:px-6 sm:py-4 md:px-10 md:py-6">
          <Logo />
          <div className="flex items-center gap-2 sm:gap-4">
            <AccountHeader />
            <Cart />
          </div>
        </div>
      </header>

      <CategoryNav />
    </>
  );
};
