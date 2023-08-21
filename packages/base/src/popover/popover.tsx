import { usePopup, util } from '@sheinx/hooks';
import AbsoluteList from '../absolute-list';
import React from 'react';
import { PopoverProps } from './popover.type';
import classNames from 'classnames';

const Popover = (props: PopoverProps) => {
  const { children, jssStyle, className, style, priorityDirection, trigger = 'hover' } = props;
  const { current: context } = React.useRef({ rendered: false });

  const { open, position, getTargetProps, targetRef, popupRef, closePop } = usePopup({
    open: props.visible,
    onCollapse: props.onVisibleChange,
    position: props.position,
    trigger: trigger,
    disabled: props.disabled,
    autoMode: 'popover',
    priorityDirection,
    mouseEnterDelay: props.mouseEnterDelay,
    mouseLeaveDelay: props.mouseLeaveDelay,
  });

  const events = getTargetProps();

  const bindEvents = () => {
    const targetEl = targetRef.current;
    if (!targetEl) return;

    targetEl.addEventListener('mouseenter', events.onMouseEnter);
    targetEl.addEventListener('mouseleave', events.onMouseLeave);
    targetEl.addEventListener('click', events.onClick);
  };

  const unbindEvents = () => {
    const targetEl = targetRef.current;
    if (!targetEl) return;
    const events = getTargetProps();
    targetEl.removeEventListener('mouseenter', events.onMouseEnter);
    targetEl.removeEventListener('mouseleave', events.onMouseLeave);
    targetEl.removeEventListener('click', events.onClick);
  };

  React.useEffect(() => {
    bindEvents();
    return () => {
      unbindEvents();
    };
  }, []);

  const noRender = !open && !context.rendered;
  if (!targetRef.current || !children || noRender) {
    return (
      <noscript
        ref={(el) => {
          if (!el) return;
          const targetEl = el.parentElement as HTMLDivElement;
          targetRef.current = targetEl;
          bindEvents();
        }}
      />
    );
  }

  context.rendered = true;

  const childrened = util.isFunc(children) ? children(closePop) : children;
  return (
    <AbsoluteList
      focus={open}
      parentElement={targetRef.current}
      absolute={typeof props.getPopupContainer === 'function' ? props.getPopupContainer : true}
      position={position}
      fixedWidth={false}
      popupGap={0}
    >
      <div
        className={classNames(
          className,
          jssStyle?.popover?.wrapper,
          open && jssStyle?.popover?.wrapperOpen,
        )}
        data-soui-position={position}
        ref={popupRef}
        onMouseLeave={events.onMouseLeave}
      >
        <div
          style={style}
          className={classNames(
            jssStyle?.popover?.content,
            (typeof childrened === 'string' || props.useTextStyle) && jssStyle?.popover?.text,
          )}
        >
          {childrened}
        </div>
      </div>
    </AbsoluteList>
  );
};

export default Popover;
