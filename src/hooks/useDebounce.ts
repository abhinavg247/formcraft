import { useEffect, useRef } from "react";

const debounce = (
  callback: (...args: any[]) => any,
  delay = 500
): ((...args: any[]) => void) => {
  let timeoutId: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback(...args), delay);
  };
};

export const useDebounce = (
  callback: (...args: any[]) => any,
  delay: number = 500
) => {
  const ref = useRef<(...args: any[]) => any | null>(null);

  useEffect(() => {
    ref.current = debounce(callback, delay);
  }, [callback, delay]);

  return (...args: any[]) => ref.current?.(...args);
};
