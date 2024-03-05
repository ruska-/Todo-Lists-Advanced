import { useEffect, useState } from "react";

export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    let result = initialValue;
    const storedValue = localStorage.getItem(key);

    if (typeof initialValue === "function") {
      result = initialValue();
    }

    if (storedValue !== null) {
      result = JSON.parse(storedValue);
    }

    return result;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  

  return [value, setValue];
}
