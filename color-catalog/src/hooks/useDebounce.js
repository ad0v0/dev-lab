import { useState, useEffect } from "react";

export const useDebounce = (newValue, delay = 200) => {
  const [value, setValue] = useState(newValue)

  useEffect(() => {
    const timer = setTimeout(() => {
      setValue(newValue);
    }, delay);

    return () => clearTimeout(timer);
  }, [newValue, delay])

  return value;
}
