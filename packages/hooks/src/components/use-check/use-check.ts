/**
 * 状态 disabled
 * dom wrapper  input  indicator  desc
 * 事件 onClick(模拟点击) 点击wrapper
 */
import React from 'react';
import { HandlerType, ObjectType } from '../../common/type';
import { extractEventHandlers } from '../../utils';
import { util } from '@sheinx/hooks';
import useForkRef from '../../common/use-fork-ref';
import { BaseCheckProps } from './use-check.type';

const useCheck = (props: BaseCheckProps) => {
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

  const handleClick = (otherHandlers: HandlerType, needStopPropagation: boolean) => (event: React.MouseEvent) => {
    if(needStopPropagation) {
      event.stopPropagation();
    }
    inputRef.current?.click();
    otherHandlers?.onClick?.(event);
  };

  const getRootProps = <TOther extends ObjectType>(externalProps: TOther = {} as TOther) => {
    const externalEventHandlers = extractEventHandlers(externalProps);
    return {
      ...util.removeProps(externalProps, { needStopPropagation: true }),
      onClick: handleClick(externalEventHandlers, externalProps.needStopPropagation),
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
    const checkProps = {
      checked,
      defaultChecked,
    };
    if (checked !== undefined) {
      delete checkProps.defaultChecked;
    }
    return {
      ...externalProps,
      ref: handleInputRef,
      disabled,
      ...checkProps,
      onClick: (e: React.MouseEvent<HTMLInputElement>) => {
        // TODO: 这个e.stopPropagation生效不了，外部的触发是通过inputRef.current?.click()方式的；没啥用的代码
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

export default useCheck;
