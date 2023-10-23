import { DependencyList, useEffect, useRef } from "react";

const useInfiniteScroll = (callback: () => void, hasNextPage: boolean, dep: DependencyList) => {
  const ref = useRef(null);

  const onIntersection = (entries: IntersectionObserverEntry[]) => {
    const firstEntry = entries[0];
    if (firstEntry.isIntersecting && hasNextPage) {
      callback();
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(onIntersection);
    if (observer && ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [...dep]);

  return ref;
};

export default useInfiniteScroll
