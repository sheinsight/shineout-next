import React, { useMemo, useRef } from 'react';
import SimpleTextarea from './simple-textarea';
import { useInputAble, usePersistFn, useTextareaFormat, util } from '@sheinx/hooks';
import { TextareaProps } from './textarea.type';
import useAutoSize from './use-auto-size';
import clsx from 'clsx';
import useWithFormConfig from '../common/use-with-form-config';
import useTip from '../common/use-tip';
import { useConfig } from '../config';
import useInnerTitle from '../common/use-inner-title';

const defaultInfo = (num: number, msg: any) => {
  if (!msg || msg.length === 0) return null;
  const text = `${msg.length} / ${num}`;
  if (msg.length <= num) return text;
  return new Error(text);
};
const Textarea = (props0: TextareaProps) => {
  const props = useWithFormConfig(props0);
  const {
    info,
    suffix,
    renderFooter,
    width,
    style,
    jssStyle,
    onBlur,
    status,
    limit,
    trim: trimProps,
    delay: delayProps,
    ...resetProps
  } = props;
  const config = useConfig();
  const textareaClasses = jssStyle?.textarea?.();
  const rootRef = useRef<HTMLElement>(null);

  const trim = trimProps ?? config.trim ?? false;
  const delay = delayProps ?? config.delay ?? 0;

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
    beforeChange:
      typeof limit === 'number'
        ? (v: string) => {
            if (v.length > limit) return v.slice(0, limit);
            if (resetProps.beforeChange) resetProps.beforeChange?.(v);
            return v;
          }
        : resetProps.beforeChange,
    defaultValue: resetProps.defaultValue,
    delay: delay,
  };
  const inputAbleProps = useInputAble({
    ...inputAbleParams,
    control: 'value' in resetProps,
  });

  const handleBlur = usePersistFn((e: React.FocusEvent<HTMLTextAreaElement>) => {
    onBlur?.(e);
    inputAbleProps.forceDelayChange();
  });

  // format
  const formatParams = {
    trim,
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

  const getInfoState = () => {
    const notNumber = typeof info !== 'number';
    if (typeof info !== 'function' && typeof info !== 'object' && notNumber) return null;
    let infoContent: number | ((value: string) => React.ReactNode | Error);
    if (typeof info === 'object') {
      infoContent = info.content;
    } else {
      infoContent = info;
    }
    const notContentNumber = typeof infoContent !== 'number';
    const textInfo = notContentNumber
      ? (infoContent as (value: string) => React.ReactNode | Error)
      : defaultInfo.bind(null, infoContent as number);
    const error = textInfo(inputAbleProps.value!);
    if (!error) return null;
    const isError = error instanceof Error;
    const text = isError ? error.message : error;
    if (!isError && !focused) return null;
    return { text, error }
  }

  const infoState = useMemo(getInfoState, [info, inputAbleProps.value, focused])
  const infoPopoverProps = {
    popover: resetProps.popover || (typeof info === 'object' ? info.position : 'bottom-right'),
    popoverProps: Object.assign(
      {
        style: { width: 'auto', fontSize: 12 },
        adjust: true,
      },
      resetProps.popoverProps,
    ),
    error: infoState?.error && infoState?.error instanceof Error ? infoState?.error?.message : undefined,
    tip: <div className={textareaClasses?.info}>{infoState?.text}</div>,
  };

  const infoPopoverNode = useTip({
    ...infoPopoverProps,
    focused,
    rootRef,
    jssStyle,
  });

  const mergeSuffix = (
    <React.Fragment>
      {suffix}
      {tipNode}
      {infoState?.text && infoPopoverNode}
      {util.isFunc(renderFooter) && (
        <div
          onMouseDown={(e) => {
            e.preventDefault();
          }}
          className={clsx(textareaClasses?.wrapperPaddingBox, textareaClasses?.footer)}
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
      className={clsx(
        innerTitleProps.innerTitle && textareaClasses?.wrapperInnerTitle,
        props.clearable && textareaClasses?.wrapperWithClear,
        resetProps.className,
      )}
      renderTextarea={renderTextarea}
      limit={limit}
      status={tipProps.error ? 'error' : status}
      onStatusChange={onStatusChange}
      value={inputAbleProps.value || ''}
      suffix={mergeSuffix}
      style={mergeStyle}
      rootRef={rootRef}
      autosize={props.autosize}
    />
  );
};

export default React.memo(Textarea);
