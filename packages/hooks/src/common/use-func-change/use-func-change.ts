import React from 'react';
import { isFunc } from '../../utils';
import useRender from '../use-render';
import { produce } from 'immer';

interface UseFuncChangeProps<T> {
  value: T;
  onChange: (value: T) => void;
}
const useFuncChange = <T>(props: UseFuncChangeProps<T>) => {
  const render = useRender();
  const context = React.useRef<{ value: T }>({ value: props.value });
  context.current.value = props.value;

  const handleChange = (v: T | ((origin: T) => T | void)) => {
    const result = (isFunc(v) ? produce(context.current.value, v) : v) as T;
    context.current.value = result;
    props.onChange(result);
    render();
  };
  return {
    value: props.value,
    onChange: handleChange,
  };
};

export default useFuncChange;
