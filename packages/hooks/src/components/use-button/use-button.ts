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
    loading,
    onClick,
    onRef,
    ...propsToForward
  } = props;

  const buttonRef = React.useRef<HTMLButtonElement>(null);

  const handleButtonRef = useForkRef(buttonRef, buttonRefPo);

  const handleClick =
    (otherHandlers: HandlerType) =>
    (event: React.MouseEvent<HTMLButtonElement> | React.MouseEvent<HTMLAnchorElement>) => {
      if (disabled || loading) {
        return;
      }
      onClick?.(event);
      otherHandlers?.onClick?.(event);
    };

  const getSpaceChildren = (children: React.ReactNode, space?: boolean, className?: string) => {
    return wrapSpan(children, space, className);
  };

  const getAnchorProps = <TOther extends ObjectType = ObjectType>(
    externalProps: TOther = {} as TOther,
  ) => {
    const externalEventHandlers = {
      ...extractEventHandlers(externalProps),
    };

    const mergedEventHandlers = {
      ...propsToForward,
      ...externalProps,
      onClick: handleClick(externalEventHandlers),
      onRef,
    };

    return {
      ...mergedEventHandlers,
      href,
      target,
    };
  };

  const getButtonProps = <TOther extends ObjectType = ObjectType>(
    externalProps: TOther = {} as TOther,
  ) => {
    const externalEventHandlers = {
      ...extractEventHandlers(externalProps),
    };

    const mergedEventHandlers = {
      ...propsToForward,
      ...externalProps,
      disabled: disabled || loading,
      htmlType,
      onRef,
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
