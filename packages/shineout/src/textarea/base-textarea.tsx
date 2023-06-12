import { Textarea } from '@sheinx/ui';
import { useTextareaStyle } from '@sheinx/shineout-style';
import { useInputAble, useTextareaFormat, util } from '@sheinx/hooks';
import { BaseTextareaProps } from './textarea.type';
import useAutoSize from './use-auto-size';
import classNames from 'classnames';
import React, { useMemo } from 'react';

const defaultInfo = (num: number, msg: any) => {
  if (!msg || msg.length === 0) return null;
  const text = `${msg.length} / ${num}`;
  if (msg.length <= num) return text;
  return new Error(text);
};
export default (props: BaseTextareaProps) => {
  const { info, suffix, renderFooter, width, style, ...resetProps } = props;
  const jssStyle = useTextareaStyle();

  // inputAble
  const inputAbleParams = {
    value: resetProps.value,
    onChange: resetProps.onChange,
    beforeChange: resetProps.beforeChange,
    control: 'value' in resetProps,
    defaultValue: resetProps.defaultValue,
  };
  const inputAbleProps = useInputAble(inputAbleParams);

  // format
  const formatParams = {
    trim: resetProps.trim,
    value: inputAbleProps.value,
    onChange: inputAbleProps.onChange,
    onBlur: resetProps.onBlur,
  };
  const formatProps = useTextareaFormat(formatParams);

  // autosize
  const autosizeParams = {
    autosize: resetProps.autosize,
    maxHeight: resetProps.maxHeight,
  };
  const renderTextarea = useAutoSize({
    ...autosizeParams,
    value: inputAbleProps.value,
  });

  // forwardProps
  const forwardProps = util.removeProps(resetProps, {
    ...inputAbleParams,
    ...autosizeParams,
    ...formatParams,
  });

  const getInfo = () => {
    const notNumber = typeof info !== 'number';
    if (typeof info !== 'function' && notNumber) return null;
    const textInfo = notNumber ? info : defaultInfo.bind(null, info);
    const res = textInfo(inputAbleProps.value);
    // empty
    if (!res) return null;
    const isError = res instanceof Error;
    const text = isError ? res.message : res;
    return (
      <div
        key='info'
        style={{ minWidth: 'auto' }}
        className={classNames({
          [jssStyle.info]: true,
          [jssStyle.infoError]: isError,
        })}
      >
        {text}
      </div>
    );
  };

  const mergeSuffix = (
    <React.Fragment>
      {suffix}
      {getInfo()}
      {util.isFunc(renderFooter) && (
        <div className={classNames(jssStyle.paddingBox, jssStyle.footer)}>
          {renderFooter(inputAbleProps.value)}
        </div>
      )}
    </React.Fragment>
  );

  const mergeStyle = useMemo(() => {
    return { width, ...(style || {}) };
  }, [width, style]) as React.CSSProperties;

  return (
    <Textarea
      rows={4}
      jssStyle={jssStyle}
      {...forwardProps}
      {...inputAbleProps}
      {...formatProps}
      renderTextarea={renderTextarea}
      value={inputAbleProps.value || ''}
      suffix={mergeSuffix}
      style={mergeStyle}
    />
  );
};
