import React from 'react';
import usePersistFn from '../../common/use-persist-fn';
import { InputFormatProps } from './use-input-format.type';
import { preciseString } from '../../utils/number';

function regLength(size?: number) {
  return /\d+/.test(String(size)) && size! > 0 ? `{0,${size}}` : '*';
}

const useInputFormat = (props: InputFormatProps) => {
  const {
    trim,
    onChange,
    onBlur,
    onFocus,
    type,
    numType,
    integerLimit,
    digits,
    autoFix,
    coin,
    cancelBlurChange,
  } = props;
  const [showCoin, setShowCoin] = React.useState(coin);
  function isValidNumber(val: string) {
    const { numType } = props;
    const noNeg = numType === 'non-negative' || numType === 'positive';
    const regExp = new RegExp(`^(${noNeg ? '' : '-'})?\\d*\\.?\\d*$`, 'g');
    return regExp.test(val);
  }

  const handleChange = usePersistFn((v: string | undefined) => {
    let value = v;
    if (v === undefined) {
      onChange(value);
      return;
    } else if (type === 'number') {
      value = String(value).replace(/。/g, '.'); // 中文小数点转英文小数点
      if (coin) {
        // 千分位
        value = value.replace(/,/g, '');
      }
      if (!isValidNumber(value)) {
        return;
      }

      const noNeg = numType === 'non-negative' || numType === 'positive';

      const regExp = new RegExp(
        `^(${noNeg ? '' : '-'})?(\\d${regLength(integerLimit)})(${
          digits !== 0 ? `\\.\\d${regLength(digits)}` : ''
        })?.*$`,
        'g',
      );

      value = value.replace(regExp, '$1$2$3');

      // 修正小数位数
      const _value = v.split('.');
      const __value = value.split('.');
      if (_value[1] !== undefined && __value[1] === undefined && digits !== 0) {
        value = `${value}.${_value[1]}`;
      }
    }
    onChange(value);
  });

  const handleBlur = usePersistFn((e: React.FocusEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    let value = target.value;
    let before = value;

    // 没有输入任何值
    if (props.value === undefined && value === '') {
      onBlur?.(e);
      return;
    }

    // 去除前后空格
    if (trim) {
      value = value.trim();
    }
    // 修正value
    if (type === 'number' && value) {
      if (/^[.-]+$/.test(value)) value = '';
      value = value
        // -.0 => -0.0 .123 => 0.123
        .replace(/^(-)?(\.\d+)(?!=\.).*/g, '$10$2')
        //0001.123 => 1.123
        // eslint-disable-next-line no-useless-escape
        .replace(/(-|^)0+(?=0\.?|[^0\.])/g, '$1')
        //  1. => 1
        .replace(/\.$/, '');

      // 限制为正数
      if (numType === 'positive' && Number(value) <= 0) value = '';

      if (digits !== undefined && autoFix) {
        if (digits > 0) {
          value = preciseString(value, digits);
        } else if (digits === 0) {
          value = parseInt(value, 10).toString();
        }
      }
    }
    if (value !== before) {
      target.value = value;
      if (!cancelBlurChange) onChange?.(value);
    }
    if (type === 'number' && coin) {
      setShowCoin(true);
    }
    onBlur?.(e);
  });

  const focusHandler = usePersistFn((e: React.FocusEvent<HTMLInputElement>) => {
    if (type === 'number' && coin) {
      setShowCoin(false);
    }
    onFocus?.(e);
  });

  function getValue(str?: string) {
    if (type === 'number' && coin) {
      let _str = str as unknown as number;
      if (showCoin && _str) {
        return `${_str}`.replace(/\d+/, (n) => n.replace(/(\d)(?=(\d{3})+$)/g, ($1) => `${$1},`));
      }
      return `${_str === 0 ? _str : _str || ''}`.replace(/,/g, '');
    }
    return str;
  }

  return {
    onChange: handleChange,
    onBlur: handleBlur,
    onFocus: focusHandler,
    value: getValue(props.value),
    type: type === 'number' ? 'text' : type,
  };
};

export default useInputFormat;
