import { useRef, useState } from 'react';
import { useClickOutside } from '../../hooks/useClickOutside';
import CartIcon from './CartIcon';
import Overlay from '../Overlay';
import Drawer from '../Drawer';

const Cart = () => {
  const [isOpen, setIsOpen] = useState(false);
  const cartRef = useRef<HTMLDivElement | null>(null);

  useClickOutside(cartRef, () => setIsOpen(false));

  return (
    <>
      <Overlay isOpen={isOpen}>
        <Drawer ref={cartRef} isOpen={isOpen}></Drawer>
      </Overlay>

      <CartIcon onClick={() => setIsOpen(true)} />
    </>
  );
};

export default Cart;
