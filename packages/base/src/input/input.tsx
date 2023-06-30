import SimpleInputInput from './simple-input';
import { useInputFormat, util } from '@sheinx/hooks';
import { InputProps } from './input.type';
import useInputCommon from './use-input-common';

export default (props: InputProps) => {
  const commonProps = useInputCommon<InputProps['value'], InputProps>(props);

  const inputFormatParams = {
    coin: commonProps.coin,
    autoFix: commonProps.autoFix,
    type: commonProps.type,
    onBlur: commonProps.onBlur,
    onFocus: commonProps.onFocus,
    digits: commonProps.digits,
    integerLimit: commonProps.integerLimit,
    numType: commonProps.numType,
    trim: commonProps.trim,
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
      value={inputFormatProps.value || ''}
    />
  );
};
