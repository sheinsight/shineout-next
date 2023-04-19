import { useInputable, useForkRef } from '../../index';
import * as React from 'react';
import extractEventHandlers from '../../utils/extractEventHandlers';
import type {
  UseInputParams,
  UseInputRootSlotProps,
  UseInputSlotProps,
  UseInputClearProps,
} from './types';

/*
  数据:
  value  focused  disabled  showClear

  逻辑:
  1. 输入触发onChange
  2. 聚焦focus 为 true
  3. 失去焦点 focus 为 false
  4. 清空数据触发 onChange
*/

const useInput = (params: UseInputParams) => {
  const {
    value: valuePo,
    defaultValue: defaultValuePo,
    onChange: onChangePo,
    onFocus,
    onBlur,
    inputRef: inputRefPo,
    disabled,
    clearable,
  } = params;

  const inputRef = React.useRef<HTMLInputElement>(null);

  const [focused, setFocused] = React.useState(false);

  const [value, onChange] = useInputable({
    value: valuePo,
    defaultValue: defaultValuePo || '',
    onChange: onChangePo,
  });

  const handleClick =
    (otherHandlers: { onClick?: React.EventHandler<any> }) =>
    (event: React.MouseEvent<HTMLInputElement>) => {
      if (inputRef.current && event.currentTarget === event.target) {
        inputRef.current.focus();
      }

      otherHandlers.onClick?.(event);
    };
  const getRootProps = <TOther extends Record<string, any> = Record<string, unknown>>(
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
    (otherHandlers: Record<string, React.EventHandler<any> | undefined>) =>
    (event: React.FocusEvent<HTMLInputElement>) => {
      otherHandlers.onBlur?.(event);
      setFocused(false);
    };

  const handleFocus =
    (otherHandlers: Record<string, React.EventHandler<any> | undefined>) =>
    (event: React.FocusEvent<HTMLInputElement>) => {
      otherHandlers.onFocus?.(event);
      setFocused(true);
    };

  const handleChange =
    (otherHandlers: Record<string, React.EventHandler<any> | undefined>) =>
    (event: React.ChangeEvent<HTMLInputElement>, ...args: any[]) => {
      // @ts-ignore
      otherHandlers.onChange?.(event, ...args);
      onChange(event?.target.value);
    };

  const handleInputRef = useForkRef(inputRef, inputRefPo);

  const getInputProps = <TOther extends Record<string, any> = Record<string, unknown>>(
    externalProps: TOther = {} as TOther,
  ): UseInputSlotProps<TOther> => {
    const externalEventHandlers = { onBlur, onFocus, ...extractEventHandlers(externalProps) };
    const mergedEventHandlers = {
      ...externalProps,
      ...externalEventHandlers,
      onFocus: handleFocus(externalEventHandlers),
      onBlur: handleBlur(externalEventHandlers),
      onChange: handleChange(externalEventHandlers),
    };

    return {
      ...mergedEventHandlers,
      ref: handleInputRef,
      value: value as string | number | readonly string[] | undefined,
      disabled: disabled,
    };
  };

  const handleClear =
    (otherHandlers: { onClick?: React.EventHandler<any> }) =>
    (event: React.MouseEvent<HTMLInputElement>) => {
      onChange('');
      otherHandlers.onClick?.(event);
    };

  const getClearProps = <TOther extends Record<string, any> = Record<string, unknown>>(
    externalProps: TOther = {} as TOther,
  ): UseInputClearProps<TOther> => {
    const externalEventHandlers = extractEventHandlers(externalProps);

    return {
      ...externalProps,
      ...externalEventHandlers,
      onClick: handleClear(externalEventHandlers),
    };
  };

  const showClear = clearable && value;

  return {
    focused,
    disabled,
    showClear,
    getRootProps,
    getInputProps,
    getClearProps,
  };
};

export default useInput;
