import { usePopup } from '@sheinx/hooks';
import classNames from 'classnames';
import React, { cloneElement, isValidElement } from 'react';
import { TooltipProps } from './tooltip.type';
import AbsoluteList from '../absolute-list';

const Tooltip = (props: TooltipProps) => {
  const {
    trigger = 'hover',
    priorityDirection,
    children,
    tip,
    disabledChild,
    jssStyle,
    className,
    style,
  } = props;

  const tooltipClasses = jssStyle?.tooltip?.();

  const childrenProps = isValidElement(children)
    ? (children?.props as { [name: string]: any })
    : {};

  const { open, position, getTargetProps, targetRef, popupRef } = usePopup({
    position: props.position,
    trigger: trigger,
    disabled: props.disabled,
    autoMode: 'popover',
    priorityDirection,
    mouseEnterDelay: props.delay,
    targetEvents: disabledChild ? {} : childrenProps,
  });

  if (!isValidElement(children)) {
    console.error(new Error('Tooltip children expect a single ReactElement.'));
    return null;
  }

  if (!tip) return children;

  const inner = disabledChild ? (
    <span className={tooltipClasses?.target} style={{ cursor: 'not-allowed' }}>
      {cloneElement(children as React.ReactElement, {
        style: { ...childrenProps.style, pointerEvents: 'none' },
      })}
    </span>
  ) : (
    children
  );

  const events = getTargetProps();

  return (
    <>
      <noscript
        ref={(el) => {
          if (!el) return;
          const targetEl = el.nextElementSibling;
          if (!targetEl) return;
          if (targetRef.current === targetEl) return;
          targetRef.current = targetEl as HTMLDivElement;
        }}
        key='ns'
      />
      {cloneElement(inner, events)}
      <AbsoluteList
        focus={open}
        parentElement={targetRef.current}
        absolute
        position={position}
        fixedWidth={false}
        popupGap={0}
      >
        <div
          className={classNames(
            className,
            tooltipClasses?.wrapper,
            open && tooltipClasses?.wrapperOpen,
          )}
          data-soui-position={position}
          ref={popupRef}
          onMouseLeave={events.onMouseLeave}
        >
          <div style={style} className={classNames(tooltipClasses?.content)}>
            {tip}
          </div>
        </div>
      </AbsoluteList>
    </>
  );
};

export default Tooltip;
