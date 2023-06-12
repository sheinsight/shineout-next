import { Textarea } from '@shined/ui';
import { useTextareaStyle } from '@shined/shineout-style';
import { useInputAble, useTextareaFormat, util } from '@shined/hooks';
import { BaseTextareaProps } from './textarea.type';
import useAutoSize from './use-auto-size';

export default (props: BaseTextareaProps) => {
  const jssStyle = useTextareaStyle();

  // inputAble
  const inputAbleParams = {
    value: props.value,
    onChange: props.onChange,
    beforeChange: props.beforeChange,
    control: 'value' in props,
    defaultValue: props.defaultValue,
  };
  const inputAbleProps = useInputAble(inputAbleParams);

  // format
  const formatParams = {
    trim: props.trim,
    value: inputAbleProps.value,
    onChange: inputAbleProps.onChange,
    onBlur: props.onBlur,
  };
  const formatProps = useTextareaFormat(formatParams);

  // autosize
  const autosizeParams = {
    autosize: props.autosize,
    maxHeight: props.maxHeight,
  };
  const renderTextarea = useAutoSize({
    ...autosizeParams,
    value: inputAbleProps.value,
  });

  // forwardProps
  const forwardProps = util.removeProps(props, {
    ...inputAbleParams,
    ...autosizeParams,
    ...formatParams,
  });

  return (
    <Textarea
      rows={4}
      jssStyle={jssStyle}
      {...forwardProps}
      {...inputAbleProps}
      {...formatProps}
      renderTextarea={renderTextarea}
      value={inputAbleProps.value || ''}
    />
  );
};
