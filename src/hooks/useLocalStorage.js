import { useEffect, useState } from 'react';

const PREFIX = 'codeeditor-';

export default function useLocalStorage(key, initialValue) {
  const prefixedKey = PREFIX + key;
  const [value, setValue] = useState(() => {
    const jsonValue = localStorage.getItem(prefixedKey);
    console.log(`Loading ${prefixedKey} from local storage:`, jsonValue);
    if (jsonValue !== null && jsonValue !== 'undefined') return JSON.parse(jsonValue);
    if (typeof initialValue === 'function') return initialValue();
    else return initialValue;
  });

  useEffect(() => {
    console.log(`Saving ${prefixedKey} to local storage:`, value);
    if (value !== undefined) {
      localStorage.setItem(prefixedKey, JSON.stringify(value));
    }
  }, [prefixedKey, value]);

  return [value, setValue];
}
