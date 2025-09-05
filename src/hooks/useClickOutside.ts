import { useEffect } from 'react';

export function useClickOutside(
  ref: React.RefObject<HTMLElement | null>,
  callback: () => void
) {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, callback]);
}




// export function Dropdown() {
//   const [open, setOpen] = useState(false);
//   const dropdownRef = useRef<HTMLDivElement | null>(null);

//   useClickOutside(dropdownRef, () => setOpen(false));

//   return (
//     <div>
//       <button onClick={() => setOpen(!open)}>Toggle Dropdown</button>
//       {open && (
//         <div ref={dropdownRef} className="absolute bg-white shadow-md p-4">





////////////////////////////////////////////////

// export function Modal() {
//   const [isOpen, setIsOpen] = useState(false);
//   const modalRef = useRef<HTMLDivElement | null>(null);

//   useClickOutside(modalRef, () => setIsOpen(false));

//   return (
//     <div>
//       <button onClick={() => setIsOpen(true)}>Open Modal</button>
//       {isOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//           <div ref={modalRef} className="bg-white p-6 rounded-lg">