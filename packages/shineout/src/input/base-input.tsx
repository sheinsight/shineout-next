import { Input } from '@shined/ui';
import { useInputStyle } from '@shined/shineout-style';
import { useInputFormat, useInputAble, util } from '@shined/hooks';
import useClear from './use-clear';
import { BaseInputProps } from './input.type';

export default (props: BaseInputProps) => {
  const inputAbleParams = {
    value: props.value,
    onChange: props.onChange,
    defaultValue: props.defaultValue,
    beforeChange: props.beforeChange,
  };
  const InputAbleProps = useInputAble({
    control: 'value' in props,
    ...inputAbleParams,
  });

  const clearParams = {
    clearable: props.clearable,
    clearToUndefined: props.clearToUndefined,
  };
  const clearProps = useClear({
    ...clearParams,
    value: InputAbleProps.value,
    onChange: InputAbleProps.onChange,
  });

  const InputFormatParams = {
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
  const InputFormatProps = useInputFormat({
    value: InputAbleProps.value,
    onChange: clearProps.onChange,
    ...InputFormatParams,
  });

  const jssStyle = useInputStyle();

  const resetProps = util.removeProps(props, {
    ...InputFormatParams,
    ...inputAbleParams,
    ...clearParams,
  });

  return (
    <Input
      jssStyle={jssStyle}
      {...resetProps}
      {...clearProps}
      {...InputFormatProps}
      value={InputFormatProps.value || ''}
    />
  );
};
