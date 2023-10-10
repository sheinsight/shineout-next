import React, { useMemo, useRef } from 'react';
import SimpleTextarea from './simple-textarea';
import { useInputAble, usePersistFn, useTextareaFormat, util } from '@sheinx/hooks';
import { TextareaProps } from './textarea.type';
import useAutoSize from './use-auto-size';
import classNames from 'classnames';
import useWithFormConfig from '../common/use-with-form-config';
import useTip from '../common/use-tip';
import useInnerTitle from '../common/use-inner-title';

const defaultInfo = (num: number, msg: any) => {
  if (!msg || msg.length === 0) return null;
  const text = `${msg.length} / ${num}`;
  if (msg.length <= num) return text;
  return new Error(text);
};
export default (props: TextareaProps) => {
  const { info, suffix, renderFooter, width, style, jssStyle, onBlur, status, ...resetProps } =
    props;
  const textareaClasses = jssStyle?.textarea?.();
  const rootRef = useRef<HTMLElement>(null);

  const { disabled, size } = useWithFormConfig(props);
  resetProps.disabled = disabled;
  resetProps.size = size;

  const [focused, setFocused] = React.useState(false);

  const onStatusChange = usePersistFn((status: { focused?: boolean }) => {
    setFocused(!!status.focused);
  });

  const tipProps = {
    popover: resetProps.popover,
    popoverProps: resetProps.popoverProps,
    error: resetProps.error,
    tip: resetProps.tip,
  };

  const tipNode = useTip({
    ...tipProps,
    focused,
    rootRef,
    jssStyle,
  });

  // inputAble
  const inputAbleParams = {
    value: resetProps.value,
    onChange: resetProps.onChange,
    beforeChange: resetProps.beforeChange,
    defaultValue: resetProps.defaultValue,
    delay: resetProps.delay,
  };
  const inputAbleProps = useInputAble({
    ...inputAbleParams,
    control: 'value' in resetProps,
  });

  const handleBlur = usePersistFn((e: React.FocusEvent<HTMLInputElement>) => {
    onBlur?.(e);
    inputAbleProps.forceDelayChange();
  });

  // format
  const formatParams = {
    trim: resetProps.trim,
  };

  const formatProps = useTextareaFormat({
    ...formatParams,
    value: inputAbleProps.value,
    onChange: inputAbleProps.onChange,
    onBlur: handleBlur,
  });

  // autosize
  const autosizeParams = {
    autosize: resetProps.autosize,
    maxHeight: resetProps.maxHeight,
  };

  const renderAutoSize = useAutoSize({
    ...autosizeParams,
    value: inputAbleProps.value,
    jssStyle: jssStyle,
  });

  const innerTitleProps = {
    innerTitle: resetProps.innerTitle,
    placeTitle: resetProps.placeTitle,
  };

  const hasValue = (value: any) => value === 0 || (value && value.length);

  const renderInnerTitle = useInnerTitle({
    ...innerTitleProps,
    open: focused || hasValue(inputAbleProps.value),
    size: resetProps.size,
    jssStyle,
    titleClassName: textareaClasses?.wrapperInnerTitleTop,
  });

  const renderTextarea = usePersistFn((textareaEl: React.ReactElement) => {
    return renderInnerTitle(renderAutoSize(textareaEl));
  });

  // forwardProps
  const forwardProps = util.removeProps(resetProps, {
    ...inputAbleParams,
    ...autosizeParams,
    ...tipProps,
    ...formatParams,
    ...innerTitleProps,
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
        className={classNames(textareaClasses?.info, !!isError && textareaClasses?.infoError)}
      >
        {text}
      </div>
    );
  };

  const mergeSuffix = (
    <React.Fragment>
      {suffix}
      {getInfo()}
      {tipNode}
      {util.isFunc(renderFooter) && (
        <div
          onMouseDown={(e) => {
            e.preventDefault();
          }}
          className={classNames(textareaClasses?.wrapperPaddingBox, textareaClasses?.footer)}
        >
          {renderFooter(inputAbleProps.value)}
        </div>
      )}
    </React.Fragment>
  );

  const mergeStyle = useMemo(() => {
    return { width, ...(style || {}) };
  }, [width, style]) as React.CSSProperties;

  return (
    <SimpleTextarea
      rows={4}
      jssStyle={jssStyle}
      {...forwardProps}
      {...formatProps}
      className={classNames(
        innerTitleProps.innerTitle && textareaClasses?.wrapperInnerTitle,
        resetProps.className,
      )}
      renderTextarea={renderTextarea}
      status={tipProps.error ? 'error' : status}
      value={inputAbleProps.value || ''}
      suffix={mergeSuffix}
      style={mergeStyle}
      getStatus={onStatusChange}
      rootRef={rootRef}
    />
  );
};
