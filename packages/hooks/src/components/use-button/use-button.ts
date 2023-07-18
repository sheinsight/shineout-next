import * as React from 'react';
import useForkRef from '../../common/use-fork-ref';
import { HandlerType, ObjectType } from '../../common/type';
import { extractEventHandlers } from '../../utils';
import { wrapSpan } from '../../utils/dom/element';
import { BaseButtonProps } from './use-button.type';

const useButton = (props: BaseButtonProps = {}) => {
  const {
    htmlType,
    href,
    target,
    buttonRef: buttonRefPo,
    disabled,
    onClick,
    ...propsToForward
  } = props;

  const buttonRef = React.useRef<HTMLButtonElement>(null);

  const handleButtonRef = useForkRef(buttonRef, buttonRefPo);

  /**
   * 点击事件
   *
   * @param otherHandlers 外部传入的事件
   * @returns 点击事件
   */
  const handleClick =
    (otherHandlers: HandlerType) =>
    (event: React.MouseEvent<HTMLButtonElement> | React.MouseEvent<HTMLAnchorElement>) => {
      onClick?.(event);
      otherHandlers?.onClick?.(event);
    };

  const getSpaceChildren = (children: React.ReactNode, space?: boolean) => {
    return wrapSpan(children, space);
  };

  const getAnchorProps = <TOther extends ObjectType = ObjectType>(
    externalProps: TOther = {} as TOther,
  ) => {
    const externalEventHandlers = {
      onClick,
      ...extractEventHandlers(externalProps),
    };

    const mergedEventHandlers = {
      ...propsToForward,
      ...externalProps,
      onClick: handleClick(externalEventHandlers),
    };

    return {
      ...mergedEventHandlers,
      href,
      target,
    };
  };

  /**
   * 获取包含外部传入以及内部定义的的 props
   * 返回的 props 最终会直接传递给 button 元素
   *
   * @param externalProps 外部传入的 props
   * @returns 所有的 props
   */
  const getButtonProps = <TOther extends ObjectType = ObjectType>(
    externalProps: TOther = {} as TOther,
  ) => {
    const externalEventHandlers = {
      ...extractEventHandlers(externalProps),
    };

    const mergedEventHandlers = {
      ...propsToForward,
      ...externalProps,
      disabled,
      htmltype: htmlType,
      onClick: handleClick(externalEventHandlers),
    };
    return {
      ...mergedEventHandlers,
      ref: handleButtonRef,
    };
  };

  return {
    disabled,
    getAnchorProps,
    getButtonProps,
    getSpaceChildren,
  };
};

export default useButton;
