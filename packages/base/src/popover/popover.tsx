import { usePersistFn, usePopup, useRender, util } from '@sheinx/hooks';
import AbsoluteList from '../absolute-list';
import React, { useEffect } from 'react';
import { PopoverProps } from './popover.type';
import { useConfig } from '../config';
import classNames from 'classnames';

const Popover = (props: PopoverProps) => {
  const {
    children,
    jssStyle,
    className,
    style,
    priorityDirection,
    trigger = 'hover',
    type,
    destroy,
    showArrow = true,
    zIndex = 1060,
  } = props;
  const { current: context } = React.useRef({ rendered: false });

  const config = useConfig();

  const popoverStyle = jssStyle?.popover?.();

  const render = useRender();

  const onVisibleChange = usePersistFn((v: boolean) => {
    props.onVisibleChange?.(v);
    if (v) {
      props.onOpen?.();
    } else {
      props.onClose?.();
    }
  });

  const { open, position, getTargetProps, targetRef, popupRef, closePop, Provider, providerValue } =
    usePopup({
      open: props.visible,
      defaultOpen: props.defaultVisible,
      onCollapse: onVisibleChange,
      position: props.position,
      trigger: trigger,
      autoMode: 'popover',
      priorityDirection,
      mouseEnterDelay: props.mouseEnterDelay,
      mouseLeaveDelay: props.mouseLeaveDelay,
    });

  const events = getTargetProps();

  const bindEvents = () => {
    const targetEl = targetRef.current;
    if (!targetEl) return;
    if (events.onMouseEnter) targetEl.addEventListener('mouseenter', events.onMouseEnter);
    if (events.onMouseLeave) targetEl.addEventListener('mouseleave', events.onMouseLeave);
    if (events.onClick) targetEl.addEventListener('click', events.onClick);
    // clickToCancelDelay
    if (trigger === 'hover' && props.clickToCancelDelay && props.mouseEnterDelay) {
      targetEl.addEventListener('click', closePop);
    }
  };

  const unbindEvents = () => {
    const targetEl = targetRef.current;
    if (!targetEl) return;
    const events = getTargetProps();
    if (events.onMouseEnter) targetEl.removeEventListener('mouseenter', events.onMouseEnter);
    if (events.onMouseLeave) targetEl.removeEventListener('mouseleave', events.onMouseLeave);
    if (events.onClick) targetEl.removeEventListener('click', events.onClick);
    targetEl.removeEventListener('click', closePop);
  };

  useEffect(() => {
    bindEvents();
    return () => {
      unbindEvents();
    };
  }, []);

  // scrollDismiss
  useEffect(() => {
    const { scrollDismiss } = props;
    let target: HTMLElement | Document = document;
    if (scrollDismiss) {
      if (typeof scrollDismiss === 'function') target = scrollDismiss() || document;
      target.addEventListener('scroll', closePop);
    }
    return () => {
      if (scrollDismiss) {
        target.removeEventListener('scroll', closePop);
      }
    };
  });

  const noRender = !open && !context.rendered;

  if (!targetRef.current || !children || noRender) {
    return (
      <noscript
        ref={(el) => {
          if (!el) return;
          const targetEl = el.parentElement as HTMLDivElement;
          if (targetRef.current === targetEl) return;
          targetRef.current = targetEl;
          bindEvents();
          render();
        }}
      />
    );
  }

  context.rendered = true;

  const childrened = util.isFunc(children) ? children(closePop) : children;
  const colorStyle = {
    borderColor: props.border,
    backgroundColor: props.background,
  };
  return (
    <AbsoluteList
      focus={open}
      parentElRef={targetRef}
      popupElRef={popupRef}
      absolute={typeof props.getPopupContainer === 'function' ? props.getPopupContainer : true}
      position={position}
      fixedWidth={false}
      popupGap={0}
      destroy={destroy}
      zIndex={zIndex}
    >
      <div
        className={classNames(
          className,
          popoverStyle?.wrapper,
          open && popoverStyle?.wrapperOpen,
          !showArrow && popoverStyle?.hideArrow,
        )}
        style={colorStyle}
        {...util.getDataAttribute({ position, type })}
        ref={popupRef}
        onMouseLeave={events.onMouseLeave}
        dir={config.direction}
      >
        {showArrow && <div className={popoverStyle?.arrow} dir={config.direction} />}
        <div
          style={style}
          className={classNames(
            popoverStyle?.content,
            (typeof childrened === 'string' || props.useTextStyle) && popoverStyle?.text,
          )}
        >
          <Provider value={providerValue}>{childrened}</Provider>
        </div>
      </div>
    </AbsoluteList>
  );
};

export default Popover;
