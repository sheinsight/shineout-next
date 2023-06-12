import { Input } from '@sheinx/ui';
import { useInputStyle } from '@sheinx/shineout-style';
import { useInputFormat, util } from '@sheinx/hooks';
import { BaseInputProps } from './input.type';
import useInputCommon from './use-input-common';

export default (props: BaseInputProps) => {
  const jssStyle = useInputStyle();

  const commonProps = useInputCommon<BaseInputProps['value'], BaseInputProps>(props);

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
    value: commonProps.value,
    onChange: commonProps.onChange,
    ...inputFormatParams,
  });

  const forwardProps = util.removeProps(commonProps, {
    ...inputFormatParams,
  });

  return (
    <Input
      jssStyle={jssStyle}
      {...forwardProps}
      {...inputFormatProps}
      value={inputFormatProps.value || ''}
    />
  );
};
