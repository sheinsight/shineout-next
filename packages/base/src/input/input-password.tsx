import SimpleInput from './simple-input';
import { useInputPassword, util } from '@sheinx/hooks';
import useInputCommon from './use-input-common';

import { InputPasswordProps } from './input-password.type';
export default (props: InputPasswordProps) => {
  const commonProps = useInputCommon<InputPasswordProps['value'], InputPasswordProps>(props);

  const inputPasswordParams = {
    point: props.point,
  };

  const inputFormatProps = useInputPassword({
    value: commonProps.value,
    onChange: commonProps.onChange,
    ...inputPasswordParams,
  });

  const forwardProps = util.removeProps(commonProps, {
    ...inputPasswordParams,
  });

  return (
    <SimpleInput {...forwardProps} {...inputFormatProps} value={inputFormatProps.value || ''} />
  );
};
