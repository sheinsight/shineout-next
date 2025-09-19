import useForkRef from '../../common/use-fork-ref';
import * as React from 'react';
import { util } from '@sheinx/hooks';
import { extractEventHandlers } from '../../utils';
import {
  BaseInputProps,
  UseInputClearProps,
  UseInputRootSlotProps,
  UseInputSlotProps,
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

const useInput = (params: BaseInputProps) => {
  const {
    inputRef: inputRefPo,
    rootRef,
    value,
    onChange,
    onFocus,
    onBlur,
    clearable,
    disabled,
    autoSelect,
    onClear,
    onClick,
    showClear,
    onFocusedChange,
    ...propsToForward
  } = params;

  const inputRef = React.useRef<HTMLInputElement>(null);

  const [focused, changeFocued] = React.useState(false);

  const setFocused = (focus: boolean) => {
    changeFocued(focus);
    onFocusedChange?.(focus);
  };

  const handleClick =
    (otherHandlers: HandlerType) => (event: React.MouseEvent<HTMLInputElement>) => {
      if (inputRef.current) {
        inputRef.current.focus();
      }

      otherHandlers.onClick?.(event);
    };
  const getRootProps = <TOther extends ObjectType = ObjectType>(
    externalProps: TOther = {} as TOther,
  ): UseInputRootSlotProps<TOther> => {
    const externalEventHandlers = { onClick, ...extractEventHandlers(externalProps) };
    return {
      ...externalProps,
      ...externalEventHandlers,
      onClick: handleClick(externalEventHandlers),
      onMouseDown: (event: React.MouseEvent<HTMLInputElement>) => {
        const target = event.target as HTMLElement;
        if (target.tagName === 'INPUT') return;
        event.preventDefault();
      },
      ref: rootRef,
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
        // why requestAnimationFrame: 当在文字身体上hover后立即点击，select()与浏览器的光标定位逻辑产生竞争，有可能导致只选中的部分文本，所以需要延迟一下
        requestAnimationFrame(() => {
          event.target.select();
        });
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
      if (!focused) {
        setFocused(true);
        inputRef.current?.focus();
      }
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

  const showClearValue = showClear !== undefined ? !!showClear : clearable && !util.isEmpty(value);

  return {
    focused,
    disabled,
    showClear: !disabled && showClearValue,
    getRootProps,
    getInputProps,
    getClearProps,
  };
};

export default useInput;
