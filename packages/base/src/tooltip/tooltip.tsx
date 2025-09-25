import { usePersistFn, usePopup, util } from '@sheinx/hooks';
import classNames from 'classnames';
import React, { cloneElement, isValidElement, useEffect, useMemo } from 'react';
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
    showArrow = true,
    persistent: persistentProp,
    type = 'default',
    position: popsitionProps = 'auto',
    popupGap = 0,
  } = props;

  const tooltipClasses = jssStyle?.tooltip?.();
  const config = useConfig();

  const persistent = persistentProp ?? config.tooltip?.persistent;

  const childrenProps = isValidElement(children)
    ? (children?.props as { [name: string]: any })
    : {};

  const delay = props.delay || props.mouseEnterDelay || defaultDelay;
  const mouseLeaveDelay = props.mouseLeaveDelay || defaultDelay;
  const { open, position, getTargetProps, targetRef, popupRef, closePop } = usePopup({
    position: popsitionProps,
    trigger: trigger,
    autoMode: 'popover',
    priorityDirection,
    mouseEnterDelay: delay,
    mouseLeaveDelay: mouseLeaveDelay,
    targetEvents: disabledChild ? {} : childrenProps,
  });

  const events = getTargetProps();

  const [updateKey, setUpdateKey] = React.useState(0);
  const handleUpdateKey = usePersistFn(() => {
    setUpdateKey((prev) => (prev + 1) % 2);
  });

  const bindEvents = () => {
    const targetEl = targetRef.current;
    if (!targetEl) return;
    if (events.onMouseEnter) targetEl.addEventListener('mouseenter', events.onMouseEnter);
    if (events.onMouseLeave) targetEl.addEventListener('mouseleave', events.onMouseLeave);
    if (events.onClick) targetEl.addEventListener('click', events.onClick);

    window?.addEventListener('resize', handleUpdateKey);
  };

  const unbindEvents = () => {
    const targetEl = targetRef.current;
    if (!targetEl) return;
    const events = getTargetProps();
    if (events.onMouseEnter) targetEl.removeEventListener('mouseenter', events.onMouseEnter);
    if (events.onMouseLeave) targetEl.removeEventListener('mouseleave', events.onMouseLeave);
    if (events.onClick) targetEl.removeEventListener('click', events.onClick);
    targetEl.removeEventListener('click', closePop);

    window?.removeEventListener('resize', handleUpdateKey);
  };

  useEffect(() => {
    if (!persistent) return;
    bindEvents();
    return () => {
      unbindEvents();
    };
  }, [persistent]);

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

  const innerProps = useMemo(() => {
    if (persistent) {
      return trigger === 'hover' ? {
        ...events,
        onMouseEnter: undefined,
        onMouseLeave: undefined,
      } : {
        ...events,
        onClick: undefined,
      };
    }
    return events;
  }, [persistent, events, trigger]);

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
      {cloneElement(inner, innerProps)}
      <AbsoluteList
        focus={open}
        parentElRef={targetRef}
        popupElRef={popupRef}
        absolute
        position={position}
        fixedWidth={false}
        popupGap={popupGap}
        zIndex={zIndex}
        adjust={popsitionProps === 'auto'}
        updateKey={updateKey}
      >
        <div
          className={classNames(
            className,
            tooltipClasses?.rootClass,
            tooltipClasses?.wrapper,
            open && tooltipClasses?.wrapperOpen,
          )}
          style={{ pointerEvents: persistent ? 'initial' : undefined, display: open ? 'block' : 'none' }}
          {...util.getDataAttribute({ type, position })}
          ref={popupRef}
          onMouseLeave={events.onMouseLeave}
          dir={config.direction}
        >
          {showArrow && (
            <span
              className={tooltipClasses?.arrow}
              {...util.getDataAttribute({ role: 'arrow' })}
            />
          )}
          <div style={style} className={classNames(tooltipClasses?.content)}>
            {tip}
          </div>
        </div>
      </AbsoluteList>
    </>
  );
};

export default Tooltip;
