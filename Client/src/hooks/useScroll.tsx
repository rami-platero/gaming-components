import { useRef } from "react";

const useScroll = () => {
    const scrollRef = useRef<HTMLElement | null>(null);

    const scrollToElement = () => {
      if (scrollRef.current) {
        scrollRef.current.scrollIntoView({ behavior: 'smooth', block: "start"});
      }
    };
  
    return { scrollRef, scrollToElement };
}

export default useScroll