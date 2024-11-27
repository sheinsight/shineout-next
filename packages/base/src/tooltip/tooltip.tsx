import { usePopup, util } from '@sheinx/hooks';
import classNames from 'classnames';
import React, { cloneElement, isValidElement, useRef } from 'react';
import { TooltipProps } from './tooltip.type';
import AbsoluteList from '../absolute-list';
import { useConfig } from '../config';

const { devUseWarning } = util;

const defaultDelay = 0;

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
    zIndex,
    type = 'default',
    position: popsitionProps = 'auto',
  } = props;

  const arrowStyleRef = useRef<React.CSSProperties>({});

  const tooltipClasses = jssStyle?.tooltip?.();
  const config = useConfig();

  const childrenProps = isValidElement(children)
    ? (children?.props as { [name: string]: any })
    : {};

  const delay = props.delay || props.mouseEnterDelay || defaultDelay;
  const { open, position, getTargetProps, targetRef, popupRef, arrowRef } = usePopup({
    position: popsitionProps,
    trigger: trigger,
    autoMode: 'popover',
    priorityDirection,
    mouseEnterDelay: delay,
    targetEvents: disabledChild ? {} : childrenProps,
  });

  if (!isValidElement(children)) {
    devUseWarning.error('Tooltip children expect a single ReactElement.');
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
        parentElRef={targetRef}
        popupElRef={popupRef}
        arrowRef={arrowRef}
        absolute
        adjust={popsitionProps === 'auto'}
        position={position}
        fixedWidth={false}
        popupGap={0}
        // arrowStyleRef={arrowStyleRef}
        zIndex={zIndex}
      >
        <div
          className={classNames(
            className,
            tooltipClasses?.rootClass,
            tooltipClasses?.wrapper,
            open && tooltipClasses?.wrapperOpen,
          )}
          {...util.getDataAttribute({ type, position })}
          ref={popupRef}
          onMouseLeave={events.onMouseLeave}
          dir={config.direction}
        >
          <span
            ref={arrowRef}
            style={arrowStyleRef.current}
            className={tooltipClasses?.arrow}
            {...util.getDataAttribute({ role: 'arrow' })}
          ></span>
          <div style={style} className={classNames(tooltipClasses?.content)}>
            {tip}
          </div>
        </div>
      </AbsoluteList>
    </>
  );
};

export default Tooltip;
