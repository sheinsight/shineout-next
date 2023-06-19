import { Input } from '@sheinx/base';
import { useInputStyle } from '@sheinx/shineout-style';
import { useInputPassword, util } from '@sheinx/hooks';
import useInputCommon from './use-input-common';

import { BasePasswordProps } from './password.type';
export default (props: BasePasswordProps) => {
  const jssStyle = useInputStyle();
  const commonProps = useInputCommon<BasePasswordProps['value'], BasePasswordProps>(props);

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
    <Input
      jssStyle={jssStyle}
      {...forwardProps}
      {...inputFormatProps}
      value={inputFormatProps.value || ''}
    />
  );
};
