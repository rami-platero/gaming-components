import { useEffect, useRef } from "react";

const useOnUpdate = (callback: ()=>void, deps:any) => {
  const isFirst = useRef(true);
  useEffect(() => {
    if (!isFirst.current) {
      callback();
    }
  }, deps);

  useEffect(() => {
    isFirst.current = false;
  }, []);
};

export default useOnUpdate;