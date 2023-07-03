import React from 'react';
import usePersistFn from '../../common/use-persist-fn';
import { InputNumberProps } from './use-input-number.type';
import useInputFormat from './use-input-format';
import { sub } from '../../utils';

const useNumberFormat = (props: InputNumberProps) => {
  const {
    onChange,
    value,
    onBlur,
    numType,
    integerLimit,
    digits,
    min,
    max,
    allowNull,
    step = 1,
    cancelBlurChange,
    disabled,
  } = props;

  const getStringValue = (value: string | number | null | undefined) => {
    if (value === undefined) return value;
    if (typeof value === 'number') {
      if (isNaN(value as unknown as number)) return '0';
      return String(value);
    }
    return value || '';
  };

  const getNumberValue = (value: string | number | null | undefined) => {
    if (isNaN(value as unknown as number)) return 0;
    if (typeof value === 'number') {
      return value;
    }
    const num = parseFloat(value || '');
    return isNaN(num) ? 0 : num;
  };

  const commonFormat = (val: string | number | null | undefined) => {
    let num = val;
    if (typeof num === 'number') {
      if (isNaN(num)) num = 0;
      if (min && num < min) num = min;
      if (max && num > max) num = max;
    }
    return num;
  };

  const onNumberBlur = usePersistFn((e: React.FocusEvent) => {
    const target = e.target as HTMLInputElement;
    const newValue = target.value;

    if (newValue === '' && allowNull) {
      onChange?.(null);
      onBlur?.(e);
      return;
    }
    let num;
    num = parseFloat(newValue);
    if (isNaN(num)) {
      num = 0;
    }
    if (numType === 'positive' && num <= 0) {
      num = allowNull ? null : undefined;
    } else if (typeof digits === 'number') {
      num = parseFloat(num.toFixed(digits));
    }

    num = commonFormat(num);

    if (num !== value) {
      target.value = typeof num === 'number' ? String(num) : '';
      if (!cancelBlurChange) onChange?.(num);
    }
    onBlur?.(e);
  });

  const onNumberChange = usePersistFn((value: string | undefined) => {
    const result = value;
    onChange?.(result);
  });

  const changeValue = (mod: number) => {
    let num = getNumberValue(props.value);
    num = sub(num, mod);
    if (numType === 'positive' && num <= 0) {
      return;
    }
    if (numType === 'non-negative' && num < 0) {
      return;
    }
    if (integerLimit && String(parseInt(num as unknown as string, 10)).length > integerLimit) {
      return;
    }
    num = commonFormat(num) as number;
    onChange?.(num);
  };

  const handlePlus = usePersistFn(() => {
    if (disabled) return;
    changeValue(step);
  });
  const handleMinus = usePersistFn(() => {
    if (disabled) return;
    changeValue(-step);
  });

  return {
    ...useInputFormat({
      value: getStringValue(props.value),
      type: 'number',
      numType,
      integerLimit,
      digits,
      onChange: onNumberChange,
      onBlur: onNumberBlur,
      cancelBlurChange: true,
    }),
    onPlus: handlePlus,
    onMinus: handleMinus,
  };
};

export default useNumberFormat;
