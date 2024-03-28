import * as React from 'react';
import { HandlerType, ObjectType } from '../../common/type';
import { extractEventHandlers } from '../../utils';
import { wrapSpan } from '../../utils/dom/element';
import { BaseButtonProps } from './use-button.type';

const useButton = (props: BaseButtonProps = {}) => {
  const { htmlType, href, target, disabled, loading, onClick, ...propsToForward } = props;

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
      onClick: handleClick(externalEventHandlers),
    };

    return mergedEventHandlers;
  };

  return {
    disabled,
    getAnchorProps,
    getButtonProps,
    getSpaceChildren,
  };
};

export default useButton;
