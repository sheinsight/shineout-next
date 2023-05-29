import { Input } from '@shined/ui';
import { useInputStyle } from '@shined/shineout-style';
import { useInputPassword, useInputAble, util } from '@shined/hooks';
import { BasePasswordProps } from './password.type';
export default (props: BasePasswordProps) => {
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

  const InputPasswordParams = {
    point: props.point,
  };

  const InputFormatProps = useInputPassword({
    value: InputAbleProps.value,
    onChange: InputAbleProps.onChange,
    ...InputPasswordParams,
  });

  const jssStyle = useInputStyle();

  const resetProps = util.removeProps(props, { ...InputPasswordParams, ...inputAbleParams });

  return <Input jssStyle={jssStyle} {...resetProps} {...InputFormatProps} />;
};
