import { useMemo } from 'react';
import { useSafeState } from '../use-safe-state';

type IState = string | number | boolean | undefined;

export interface Actions<T = IState> {
  setLeft: () => void;
  setRight: () => void;
  toggle: (value?: T) => void;
}

export function useToggle<T = IState, U = IState>(
  defaultValue: T,
  reverseValue?: U,
): [T | U, Actions<T>] {
  const [state, setState] = useSafeState<T | U>(defaultValue);

  const actions = useMemo(() => {
    const reverseValueOrigin = (reverseValue === undefined ? !defaultValue : reverseValue) as T | U;

    // 切换返回值
    const toggle = (value?: T | U) => {
      // 强制返回状态值，适用于点击操作
      if (value !== undefined) {
        setState(value);
      } else {
        setState((value) => (value === defaultValue ? reverseValueOrigin : defaultValue));
      }
    };
    // 设置默认值
    const setLeft = () => setState(defaultValue);
    // 设置取反值
    const setRight = () => setState(reverseValueOrigin);
    return {
      toggle,
      setLeft,
      setRight,
    };
  }, [defaultValue, reverseValue]);

  return [state, actions];
}
