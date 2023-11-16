import { useState, useEffect } from "react";

function useDebounce<T>(value: T, delay?: number): T {
  const [debouncevalue, setDebounceValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceValue(value);
    }, delay || 500);

    return () => {
      clearInterval(timer);
    };
  }, [value, delay]);

  return debouncevalue;
}

export default useDebounce;
