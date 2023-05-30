import useForkRef from '../../common/use-fork-ref';
import * as React from 'react';
import { extractEventHandlers } from '../../utils';
import {
  UseInputParams,
  UseInputRootSlotProps,
  UseInputSlotProps,
  UseInputClearProps,
} from './use-input.type';
import { HandlerType, ObjectType } from '../../common/type';

/*
  数据:
  value  focused  disabled  showClear

  逻辑:
  1. 输入触发 onChange
  2. 聚焦 focus 为 true
  3. 失去焦点 focus 为 false
  4. 清空数据触发 onChange
*/

const useInput = (params: UseInputParams) => {
  const {
    inputRef: inputRefPo,
    value,
    onChange,
    onFocus,
    onBlur,
    clearable,
    disabled,
    autoSelect,
    onClear,
    showClear,
    ...propsToForward
  } = params;

  const inputRef = React.useRef<HTMLInputElement>(null);

  const [focused, setFocused] = React.useState(false);

  const handleClick =
    (otherHandlers: HandlerType) => (event: React.MouseEvent<HTMLInputElement>) => {
      if (inputRef.current && event.currentTarget === event.target) {
        inputRef.current.focus();
      }

      otherHandlers.onClick?.(event);
    };
  const getRootProps = <TOther extends ObjectType = ObjectType>(
    externalProps: TOther = {} as TOther,
  ): UseInputRootSlotProps<TOther> => {
    // onBlur, onChange and onFocus are forwarded to the input slot.
    const propsEventHandlers = extractEventHandlers(params, ['onBlur', 'onChange', 'onFocus']);
    const externalEventHandlers = { ...propsEventHandlers, ...extractEventHandlers(externalProps) };

    return {
      ...externalProps,
      ...externalEventHandlers,
      onClick: handleClick(externalEventHandlers),
    };
  };

  const handleBlur =
    (otherHandlers: HandlerType) => (event: React.FocusEvent<HTMLInputElement>) => {
      otherHandlers.onBlur?.(event);
      setFocused(false);
    };

  const handleFocus =
    (otherHandlers: HandlerType) => (event: React.FocusEvent<HTMLInputElement>) => {
      otherHandlers.onFocus?.(event);
      setFocused(true);
      if (autoSelect) {
        event.target.select();
      }
    };

  const handleChange =
    (otherHandlers: HandlerType) => (event: React.ChangeEvent<HTMLInputElement>) => {
      otherHandlers.onChange?.(event);
      onChange?.(event.target.value);
    };

  const handleInputRef = useForkRef(inputRef, inputRefPo);

  const getInputProps = <TOther extends ObjectType = ObjectType>(
    externalProps: TOther = {} as TOther,
  ): UseInputSlotProps<TOther> => {
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
      value: value,
    };
  };

  const handleClear =
    (otherHandlers: { onClick?: React.EventHandler<any> }) =>
    (event: React.MouseEvent<HTMLInputElement>) => {
      // do not blur
      event.preventDefault();
      if (onClear) {
        onClear?.();
      } else {
        onChange?.('');
      }
      otherHandlers.onClick?.(event);
    };

  const getClearProps = <TOther extends ObjectType = ObjectType>(
    externalProps: TOther = {} as TOther,
  ): UseInputClearProps<TOther> => {
    const externalEventHandlers = extractEventHandlers(externalProps);

    return {
      ...externalProps,
      onMouseDown: handleClear(externalEventHandlers),
    };
  };

  const showClearValue = showClear !== undefined ? !!showClear : clearable && value;

  return {
    focused,
    disabled,
    showClear: showClearValue,
    getRootProps,
    getInputProps,
    getClearProps,
  };
};

export default useInput;
