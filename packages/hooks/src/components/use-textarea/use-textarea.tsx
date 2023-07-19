import React from 'react';
import {
  BaseTextareaProps,
  UseTextareaRootSlotProps,
  UseTextareaSlotProps,
} from './use-textarea.type';
import { HandlerType, ObjectType } from '../../common/type';
import { extractEventHandlers } from '../../utils';
import useForkRef from '../../common/use-fork-ref';

// 状态 focused height
// 结构 wrapper textarea
// 逻辑
//  1. 点击聚焦
const useTextarea = (props: BaseTextareaProps) => {
  const { onClick, onChange, onBlur, value, disabled, onFocus, textareaRef, ...propsToForward } =
    props;
  const [focused, setFocused] = React.useState(false);
  const textRef = React.useRef<HTMLTextAreaElement>(null);

  const handleClick =
    (otherHandlers: HandlerType) => (event: React.MouseEvent<HTMLInputElement>) => {
      if (textRef.current) {
        textRef.current.focus();
      }
      otherHandlers.onClick?.(event);
    };

  const getRootProps = <TOther extends ObjectType = ObjectType>(
    externalProps: TOther = {} as TOther,
  ): UseTextareaRootSlotProps<TOther> => {
    const externalEventHandlers = { onClick, ...extractEventHandlers(externalProps) };
    return {
      ...externalProps,
      ...externalEventHandlers,
      onClick: handleClick(externalEventHandlers),
    };
  };

  const handleBlur =
    (otherHandlers: HandlerType) => (event: React.FocusEvent<HTMLTextAreaElement>) => {
      otherHandlers.onBlur?.(event);
      setFocused(false);
    };

  const handleFocus =
    (otherHandlers: HandlerType) => (event: React.FocusEvent<HTMLTextAreaElement>) => {
      otherHandlers.onFocus?.(event);
      setFocused(true);
    };

  const handleChange =
    (otherHandlers: HandlerType) => (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      otherHandlers.onChange?.(event);
      onChange?.(event.target.value);
    };

  const handleInputRef = useForkRef(textRef, textareaRef);

  const getTextAreaProps = <TOther extends ObjectType = ObjectType>(
    externalProps: TOther = {} as TOther,
  ): UseTextareaSlotProps<TOther> => {
    const externalEventHandlers = {
      onBlur,
      onFocus,
      ...extractEventHandlers(externalProps),
    };
    const mergedEventHandlers = {
      ...propsToForward,
      ...externalProps,
      disabled,
      onFocus: handleFocus(externalEventHandlers),
      onBlur: handleBlur(externalEventHandlers),
      onChange: handleChange(externalEventHandlers),
    };

    return {
      ...mergedEventHandlers,
      ref: handleInputRef,
      value,
    };
  };

  return {
    focused,
    disabled,
    getRootProps,
    getTextAreaProps,
  };
};

export default useTextarea;
