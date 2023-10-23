import { useRef, useState } from "react";
import useClickOutside from "./useClickOutside";

const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null)

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  useClickOutside(ref,closeModal)

  return {
    openModal,
    closeModal,
    isOpen,
    ref,
  };
};

export default useModal


