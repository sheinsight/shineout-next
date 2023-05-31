import { Input } from '@shined/ui';
import { useInputStyle } from '@shined/shineout-style';
import { useInputFormat, useInputAble, util } from '@shined/hooks';
import useClear from '../hooks/use-clear';
import { BaseInputProps } from './input.type';

export default (props: BaseInputProps) => {
  const { forwardRef, ...otherProps } = props;
  const inputAbleParams = {
    value: props.value,
    onChange: props.onChange,
    defaultValue: props.defaultValue,
    beforeChange: props.beforeChange,
  };
  const inputAbleProps = useInputAble({
    control: 'value' in props,
    ...inputAbleParams,
  });

  const clearParams = {
    clearable: props.clearable,
    clearToUndefined: props.clearToUndefined,
  };
  const clearProps = useClear({
    ...clearParams,
    value: inputAbleProps.value,
    onChange: inputAbleProps.onChange,
  });

  const inputFormatParams = {
    coin: props.coin,
    autoFix: props.autoFix,
    type: props.type,
    onBlur: props.onBlur,
    onFocus: props.onFocus,
    digits: props.digits,
    integerLimit: props.integerLimit,
    numType: props.numType,
    trim: props.trim,
  };
  const inputFormatProps = useInputFormat({
    value: inputAbleProps.value,
    onChange: inputAbleProps.onChange,
    ...inputFormatParams,
  });

  const jssStyle = useInputStyle();

  const forwardProps = util.removeProps(otherProps, {
    ...inputFormatParams,
    ...inputAbleParams,
    ...clearParams,
  });

  return (
    <Input
      jssStyle={jssStyle}
      {...forwardProps}
      {...clearProps}
      {...inputFormatProps}
      value={inputFormatProps.value || ''}
      inputRef={forwardRef}
    />
  );
};
