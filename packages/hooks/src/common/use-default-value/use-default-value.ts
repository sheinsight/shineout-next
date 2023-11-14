import { useState, useEffect, useRef } from 'react';
import { isUndefined } from '../../utils';
import usePrevious from './use-previous';

const useDefaultValue = <T>(
  defaultStateValue: T,
  props?: {
    defaultValue?: T;
    value?: T;
  },
): [T, React.Dispatch<React.SetStateAction<T>>, T] => {
  const { defaultValue, value } = props || {};
  const firstRenderRef = useRef(true);
  const prevValue = usePrevious(value);

  const [stateValue, setStateValue] = useState<T>(
    !isUndefined(value) ? value : !isUndefined(defaultValue) ? defaultValue : defaultStateValue,
  );

  useEffect(() => {
    if (firstRenderRef.current) {
      firstRenderRef.current = false;
      return;
    }

    if (value === undefined && prevValue !== value) {
      setStateValue(value);
    }
  }, [value]);

  const mergedValue = isUndefined(value) ? stateValue : value;

  return [mergedValue, setStateValue, stateValue];
};

export default useDefaultValue;
