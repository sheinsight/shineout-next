import { Input } from '@shined/ui';
import { useInputStyle } from '@shined/shineout-style';
import { useInputPassword, useInputAble, util } from '@shined/hooks';
import useClear from '../hooks/use-clear';

import { BasePasswordProps } from './password.type';
export default (props: BasePasswordProps) => {
  const { forwardRef, ...restProps } = props;
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

  const inputPasswordParams = {
    point: props.point,
  };

  const inputFormatProps = useInputPassword({
    value: inputAbleProps.value,
    onChange: inputAbleProps.onChange,
    ...inputPasswordParams,
  });

  const jssStyle = useInputStyle();

  const forwardProps = util.removeProps(restProps, {
    ...inputPasswordParams,
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
