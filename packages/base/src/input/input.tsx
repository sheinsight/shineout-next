import SimpleInputInput from './simple-input';
import { useInputFormat, util } from '@sheinx/hooks';
import { InputProps } from './input.type';
import useInputCommon from './use-input-common';
import { useConfig } from '../config';
import React from 'react';

const Input = (props: InputProps) => {
  const commonProps = useInputCommon<InputProps['value'], InputProps>(props);
  const config = useConfig();
  const inputFormatParams = {
    coin: commonProps.coin,
    autoFix: commonProps.autoFix,
    type: commonProps.type,
    onBlur: commonProps.onBlur,
    onFocus: commonProps.onFocus,
    digits: commonProps.digits,
    integerLimit: commonProps.integerLimit,
    numType: commonProps.numType,
    trim: commonProps.trim ?? config.trim ?? false,
  };
  const inputFormatProps = useInputFormat({
    value: commonProps.value,
    onChange: commonProps.onChange,
    ...inputFormatParams,
  });

  const forwardProps = util.removeProps(commonProps, {
    ...inputFormatParams,
  });

  return (
    <SimpleInputInput
      {...forwardProps}
      {...inputFormatProps}
      value={inputFormatProps.value ?? ''}
      hasSuffix={!!props.suffix}
      showClear={props.showClear}
      onKeyDown={(e) => {
        if (e.key === 'Enter' && !e.defaultPrevented) {
          const value = (e.target as HTMLInputElement).value;
          props.onChange?.(value);
        }

        props.onKeyDown?.(e);
      }}
    />
  );
};

export default React.memo(Input);
