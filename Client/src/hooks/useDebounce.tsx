import { useEffect, useState } from "react";

function useDebounce<T extends number | string> (value: T, delay = 300):T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const id = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(id);
    };
  }, [value, delay]);
  return debouncedValue;
};

export default useDebounce;
