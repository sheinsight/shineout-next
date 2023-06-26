/**
 * 状态 disabled
 * dom wrapper  input  indicator  desc
 * 事件 onClick(模拟点击) 点击wrapper
 */
import React from 'react';
import { HandlerType, ObjectType } from '../../common/type';
import { extractEventHandlers } from '../../utils';
import useForkRef from '../../common/use-fork-ref';
import { BaseRadioProps } from './use-radio.type';

const useRadio = (props: BaseRadioProps) => {
  const { checked, defaultChecked, onChange, disabled, inputRef: inputRefPo, onClick } = props;
  const [checkedState, setCheckedState] = React.useState<boolean>(defaultChecked || false);

  const getChecked = () => {
    if (checked !== undefined) {
      return checked;
    }
    return checkedState;
  };

  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleInputRef = useForkRef(inputRef, inputRefPo);

  const handleClick =
    (otherHandlers: HandlerType) => (event: React.MouseEvent<HTMLInputElement>) => {
      inputRef.current?.click();
      otherHandlers?.onClick?.(event);
    };

  const getRootProps = <TOther extends ObjectType>(externalProps: TOther = {} as TOther) => {
    const externalEventHandlers = extractEventHandlers(externalProps);
    return {
      ...externalProps,
      checked: getChecked(),
      onClick: handleClick(externalEventHandlers),
    };
    //封装点击事件 点击触发input 的点击
    // disabled 禁用后不可点击
  };

  const handleChange =
    (otherHandlers: HandlerType) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setCheckedState(event.target.checked);
      onChange?.(event.target.checked, event);
      otherHandlers?.onChange?.(event);
    };

  const getInputProps = <TOther extends ObjectType>(externalProps: TOther = {} as TOther) => {
    // 封装onChange 事件
    // ref
    return {
      ...externalProps,
      ref: handleInputRef,
      checked,
      disabled,
      defaultChecked,
      onClick: (e: React.MouseEvent<HTMLInputElement>) => {
        e.stopPropagation();
        onClick?.(e);
      },
      onChange: handleChange(extractEventHandlers(externalProps)),
      tabIndex: 0,
      style: { display: 'none' },
    };
  };

  const getIndicatorProps = <TOther extends ObjectType>(externalProps: TOther = {} as TOther) => {
    return {
      ...externalProps,
      tabIndex: disabled ? -1 : 1,
    };
  };

  return {
    getIndicatorProps,
    getInputProps,
    getRootProps,
    disabled,
    checked: getChecked(),
  };
};

export default useRadio;
