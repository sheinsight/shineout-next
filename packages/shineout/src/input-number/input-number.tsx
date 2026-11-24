import React from 'react';
import InputNumberBase from '../input/number';
import { InputNumberProps } from './input-number.type';

/**
 * 与 Input.Number 相同，区别是 allowNull 默认为 true：
 * 清空后失焦保持为空并返回 null，而不是回填 0 / min。
 */
const InputNumber = (props: InputNumberProps) => {
  const { allowNull = true, ...rest } = props;
  return <InputNumberBase {...rest} allowNull={allowNull} />;
};

export default InputNumber;
