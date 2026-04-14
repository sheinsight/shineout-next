import React, { useEffect } from 'react';
import usePersistFn from '../../common/use-persist-fn';
import { InputNumberProps } from './use-input-number.type';
import useInputFormat from './use-input-format';
import { sub } from '../../utils/number';
import { isNumber } from '../../utils/is';

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
    coin,
    defaultValue,
  } = props;

  const getStringValue = (value: string | number | null | undefined) => {
    if (value === undefined) return value;
    if (typeof value === 'number') {
      if (isNaN(value as unknown as number)) return '0';
      return String(value);
    }
    return value || '';
  };

  const [inernalInputValue, setInternalInputValue] = React.useState<string | undefined>(getStringValue(props.value));

  const focusedRef = React.useRef(false);

  useEffect(() => {
    // 聚焦编辑期间不同步外部值，避免 form 回填 defaultValue 覆盖用户输入
    // 但当外部值被清空时(如 clearable 触发)，即使聚焦也需要同步
    if(props.value !== inernalInputValue && (!focusedRef.current || props.value == null || props.value === '')){
      setInternalInputValue(getStringValue(props.value))
    }
  }, [props.value])

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
      if (isNumber(min) && num < min) num = min;
      if (isNumber(max) && num > max) num = max;
    }
    return num;
  };

  const onInnerChange = usePersistFn((val?: string | number | null) => {
    setInternalInputValue(getStringValue(val));
    if(typeof val === 'string'){
      if (val.endsWith('.') || (val.includes('.') && val.endsWith('0'))) return;
      const num = parseFloat(val);
      if(val === '') {
        // 聚焦编辑期间清空发送 null 而非 undefined
        // 因为 form 层的 defaultValue 回填仅检查 value === undefined
        // 发送 null 可以让 form 数据跟随更新，同时避免触发回填
        onChange?.(focusedRef.current ? null : (allowNull ? null : undefined));
        return;
      }
      if(isNaN(num)) return
      onChange?.(num);
    }else{
      onChange?.(val);
    };
  })

  const onNumberBlur = usePersistFn((e: React.FocusEvent<HTMLInputElement>) => {
    focusedRef.current = false;
    const target = e.target as HTMLInputElement;
    const newValue = target.value;

    // 输入为空且有 defaultValue 时，失焦恢复为 defaultValue
    if (newValue === '' && defaultValue != null) {
      let num = typeof defaultValue === 'number' ? defaultValue : parseFloat(String(defaultValue));
      if (isNaN(num)) num = 0;
      if (typeof digits === 'number') {
        num = parseFloat(num.toFixed(digits));
      }
      num = commonFormat(num) as number;
      setInternalInputValue(getStringValue(num));
      if (num !== value) {
        target.value = String(num);
        if (!cancelBlurChange) onInnerChange(num);
      }
      onBlur?.(e);
      return;
    }

    // 没有输入值
    if (newValue === '' && value === undefined) {
      onBlur?.(e);
      return;
    }

    if (newValue === '' && allowNull) {
      onInnerChange(null);
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

    // 失焦时，将非法值转换为合法值
    setInternalInputValue(getStringValue(num));
    if (num !== value) {
      target.value = typeof num === 'number' ? String(num) : '';
      if (!cancelBlurChange) onInnerChange(num);
    }
    onBlur?.(e);
  });

  const onNumberFocus = usePersistFn((e: React.FocusEvent<HTMLInputElement>) => {
    focusedRef.current = true;
    props.onFocus?.(e);
  });

  const onNumberChange = usePersistFn((value: string | undefined) => {
    const result = value;
    onInnerChange(result);
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
    return num;
  };

  const handlePlus = usePersistFn(() => {
    if (disabled) return;
    const num = changeValue(step);
    if (num !== undefined) setInternalInputValue(getStringValue(num));
  });
  const handleMinus = usePersistFn(() => {
    if (disabled) return;
    const num = changeValue(-step);
    if (num !== undefined) setInternalInputValue(getStringValue(num));
  });

  return {
    ...useInputFormat({
      value: inernalInputValue,
      type: 'number',
      numType,
      integerLimit,
      digits,
      coin,
      onChange: onNumberChange,
      onBlur: onNumberBlur,
      onFocus: onNumberFocus,
      cancelBlurChange: true,
    }),
    onPlus: handlePlus,
    onMinus: handleMinus,
  };
};

export default useNumberFormat;
