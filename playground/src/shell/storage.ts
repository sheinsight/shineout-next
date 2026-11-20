import { useState } from 'react';

// 只用于记住界面选项，读写失败时退回默认值
export function useStored<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? (JSON.parse(raw) as T) : initial;
    } catch (e) {
      return initial;
    }
  });
  const update = (next: T) => {
    setValue(next);
    try {
      localStorage.setItem(key, JSON.stringify(next));
    } catch (e) {
      // ignore
    }
  };
  return [value, update] as const;
}
