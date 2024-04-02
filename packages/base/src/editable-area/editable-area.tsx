import React, { useEffect, useState } from 'react';
import { Textarea } from '../textarea';
import { EditableAreaProps } from './editable-area.type';
import AbsoluteList from '../absolute-list';
import { useInputAble, usePersistFn } from '@sheinx/hooks';
import classNames from 'classnames';
import Icons from '../icons';
import useInnerTitle from '../common/use-inner-title';

function formatShowValue(value: unknown) {
  if (!value && value !== 0) return '';
  const arr = String(value).split('\n');
  const len = arr.length;
  if (len > 1) return `${arr[0]}...`;
  return String(value);
}

const EditableArea = (props: EditableAreaProps) => {
  const {
    jssStyle,
    delay,
    trim,
    disabled,
    className,
    style,
    placeholder,
    error,
    clearable,
    width,
    maxHeight,
    onFocus,
    getPopupContainer,
    renderFooter,
    renderResult,
    innerTitle,
    placeTitle,
    bordered = false,
  } = props;

  const editableAreaStyle = jssStyle?.editableArea?.();

  const status = error ? 'error' : props.status;

  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  const wrapperRef = React.useRef<HTMLDivElement>(null);

  const { value, onChange } = useInputAble({
    control: 'value' in props,
    value: props.value,
    defaultValue: props.defaultValue,
    onChange: props.onChange,
    beforeChange: props.beforeChange,
    delay: 0,
  });

  const [show, setShow] = useState(false);

  useEffect(() => {
    if (show && textareaRef.current) {
      setTimeout(() => {
        if (show && textareaRef.current) textareaRef.current.focus();
      });
    }
  }, [show]);

  const updateShowTextarea = (flag: boolean) => {
    if (flag === show || disabled) return;
    setShow(flag);
    props.onShowTextareaChange?.(flag);
  };

  const renderInput = useInnerTitle({
    innerTitle,
    placeTitle,
    open: !!value,
    // size: props.size,
    jssStyle: props.jssStyle,
  });

  const renderPlaceholder = () => {
    const defaultContent =
      !show && value ? (
        formatShowValue(value)
      ) : (
        <span className={editableAreaStyle?.placeholder}>{placeholder}</span>
      );
    const content = (
      <div className={editableAreaStyle?.content}>
        {typeof renderResult === 'function' ? renderResult(value as string) : defaultContent}
      </div>
    );
    return (
      <div
        tabIndex={disabled ? undefined : 0}
        onFocus={() => {
          updateShowTextarea(true);
        }}
        onClick={() => {
          updateShowTextarea(true);
        }}
        className={classNames(
          editableAreaStyle?.place,
          editableAreaStyle?.wrapperPaddingBox,
          editableAreaStyle?.wrapperInnerTitleTop,
          editableAreaStyle?.wrapperInnerTitleBottom,
        )}
      >
        {renderInput(content)}
      </div>
    );
  };

  const handleBlur = usePersistFn((e: React.FocusEvent) => {
    updateShowTextarea(false);
    props.onBlur?.(e);
  });

  const renderPopup = () => {
    return (
      <AbsoluteList
        absolute={getPopupContainer || true}
        focus={show}
        parentElRef={wrapperRef}
        popupElRef={textareaRef}
        fixedWidth={true}
        position={'cover'}
      >
        <Textarea
          jssStyle={jssStyle}
          textareaRef={textareaRef}
          status={status}
          placeholder={placeholder}
          className={classNames(editableAreaStyle?.popup, show && editableAreaStyle?.popupShow)}
          trim={trim}
          delay={delay}
          rows={1}
          autosize
          value={value}
          onChange={onChange}
          onBlur={handleBlur}
          onFocus={onFocus}
          maxHeight={maxHeight}
          renderFooter={renderFooter}
          innerTitle={innerTitle}
          placeTitle={placeTitle}
        />
      </AbsoluteList>
    );
  };

  const renderClear = () => {
    if (!clearable || !value) return null;
    return (
      <span
        onClick={() => {
          onChange('');
          updateShowTextarea(true);
        }}
        className={editableAreaStyle?.clear}
      >
        {Icons.editableArea.Close}
      </span>
    );
  };

  return (
    <div
      className={classNames(
        className,
        editableAreaStyle?.wrapper,
        status === 'error' && editableAreaStyle?.wrapperError,
        disabled && editableAreaStyle?.wrapperDisabled,
        !bordered && editableAreaStyle?.wrapperNoBorder,
        !!props.innerTitle && editableAreaStyle?.wrapperInnerTitle,
      )}
      style={{ ...style, width }}
      ref={wrapperRef}
    >
      {renderPlaceholder()}
      {renderClear()}
      {renderPopup()}
    </div>
  );
};

export default EditableArea;
