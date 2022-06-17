import { useEffect, useState } from "react";

const useLocalstorage = <T>(
  key: string,
  initialValue: T[]
): [a: T[], b: (a: T[]) => void] => {
  const [localStorageValue, setLocalStorageValue] = useState<T[]>(() =>
    getValueFromLS<T>(key, initialValue)
  );

  const setValue = (value: T[]) => {
    setLocalStorageValue(value);
  };

  useEffect(() => {
    if (localStorageValue)
      window.localStorage.setItem(key, JSON.stringify(localStorageValue));
  }, [localStorageValue]);

  return [localStorageValue, setValue];
};

const getValueFromLS = <T>(
  key: string,
  initialValue: T[]
): T[] => {
  const valueLS = localStorage.getItem(key);
  return valueLS ? JSON.parse(valueLS) : initialValue;
};

export default useLocalstorage;
