import { getClosestScrollContainer, usePersistFn, usePopup, useRender, util } from '@sheinx/hooks';
import AbsoluteList from '../absolute-list';
import React, { useEffect, useMemo } from 'react';
import { useConfig } from '../config';
import { arrowHCenterOffset, arrowVCenterOffset } from '../common/arrow';
import { PopoverProps, PopoverPosition, PopoverSemanticKey } from './popover.type';
import { useSemantic } from '../common/use-semantic';

const emptyEvent = <U extends { stopPropagation: () => void }>(e: U) => e.stopPropagation();

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
    disabled,
    popupGap = 0,
    showArrow = true,
    zIndex = 1060,
    pointAtCenter = false,
  } = props;
  const { current: context } = React.useRef({ rendered: false, hasOpened: false });

  const config = useConfig();

  // Use global config animation if props.animation is not explicitly set
  const animation = props.animation ?? config.popover?.animation ?? true;

  const popoverStyle = jssStyle?.popover?.();

  // Semantic DOM 访问器：合并用户 classNames / styles、setConfig 全局兜底与内部 JSS class
  // 优先级（高→低）：props > setConfig({ popover: { ... } }) > 内部默认
  // 见 /docs/rfc/0001-semantic-dom.md §4.4
  const sem = useSemantic<PopoverSemanticKey>(
    props.classNames,
    props.styles,
    config.popover,
  );

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
      position: util.getRTLPosition(props.position, config.direction === 'rtl'),
      trigger: trigger,
      autoMode: 'popover',
      priorityDirection,
      mouseEnterDelay: props.mouseEnterDelay,
      mouseLeaveDelay: props.mouseLeaveDelay,
    });
  const [positionState, setPositionState] = React.useState<PopoverPosition>(position);
  const [contentStyle, setContentStyle] = React.useState<React.CSSProperties>();

  const events = getTargetProps();

  // 计算 pointAtCenter 的偏移量，使箭头指向触发元素的中心，并与用户传入的 offset 合并
  const mergedOffset = useMemo((): [number, number] | undefined => {
    const userOffset = props.offset;
    if (!pointAtCenter) return userOffset;
    const rect = targetRef.current?.getBoundingClientRect();
    if (!rect) return userOffset;
    let centerOffsetX = 0;
    let centerOffsetY = 0;
    // 垂直方向的非居中位置：bottom-left, bottom-right, top-left, top-right
    if (/^(top|bottom)-(left|right)$/.test(position)) {
      centerOffsetX = arrowHCenterOffset - rect.width / 2;
    // 水平方向的非居中位置：left-top, left-bottom, right-top, right-bottom
    } else if (/^(left|right)-(top|bottom)$/.test(position)) {
      centerOffsetY = arrowVCenterOffset - rect.height / 2;
    }
    return [
      centerOffsetX + (userOffset?.[0] ?? 0),
      centerOffsetY + (userOffset?.[1] ?? 0),
    ];
  }, [pointAtCenter, position, targetRef.current, props.offset]);

  const [updateKey, setUpdateKey] = React.useState(0);
  const handleUpdateKey = usePersistFn(() => {
    setUpdateKey(prev => (prev + 1) % 2);
  });

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

    window?.addEventListener('resize', handleUpdateKey);
    if (props.adjust) {
      const scrollContainer = getClosestScrollContainer(targetEl);
      if(scrollContainer) scrollContainer.addEventListener('scroll', handleUpdateKey);
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

    window?.removeEventListener('resize', handleUpdateKey);
    if (props.adjust) {
      const scrollContainer = getClosestScrollContainer(targetEl);
      if(scrollContainer) scrollContainer.removeEventListener('scroll', handleUpdateKey);
    }
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

  if (disabled) return null;

  const noRender = props.lazy && !open && !context.rendered;

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

  // Track if popover has ever been opened
  if (open && !context.hasOpened) {
    context.hasOpened = true;
  }

  // Only execute functional children after popover has been opened at least once
  const childrened = util.isFunc(children) ? (context.hasOpened ? children(closePop) : null) : children;
  const containerStyle = {
    display: open ? undefined : 'none',
    borderColor: props.border,
    backgroundColor: props.background,
    '--popover-background-color': props.background,
  };

  if (popupGap) {
    Object.assign(containerStyle, {
      '--popover-arrow-gap-extra': `${popupGap}px`,
    });
  };

  return (
    <AbsoluteList
      focus={open}
      parentElRef={targetRef}
      popupElRef={popupRef}
      boundary={props.boundary}
      absolute={typeof props.getPopupContainer === 'function' ? props.getPopupContainer : true}
      position={position}
      fixedWidth={false}
      popupGap={popupGap}
      destroy={destroy}
      zIndex={zIndex}
      adjust={props.adjust}
      onAdjust={props.adjust ? setPositionState : undefined}
      lazy={props.lazy}
      offset={mergedOffset}
      updateKey={updateKey}
      setSizingStyle={props.boundary ? setContentStyle : undefined}
    >
      <div
        className={sem('root', [
          className,
          popoverStyle?.rootClass,
          popoverStyle?.wrapper,
          open && popoverStyle?.wrapperOpen,
          !showArrow && popoverStyle?.hideArrow,
          animation === false && popoverStyle?.wrapperNoAnimation,
        ]).className}
        style={{ ...containerStyle, ...sem('root').style }}
        {...util.getDataAttribute({ position: props.adjust ? positionState : position, type })}
        {...props.attributes}
        ref={popupRef}
        onMouseLeave={events.onMouseLeave}
        onMouseEnter={events.onMouseEnter}
        dir={config.direction}
      >
        {showArrow && (
          <div
            className={sem('arrow', [popoverStyle?.arrow, props.arrowClass]).className}
            style={sem('arrow').style}
            dir={config.direction}
          />
        )}
        <div
          style={{ ...contentStyle, ...style, ...sem('content').style }}
          onClick={emptyEvent}
          className={sem('content', [
            popoverStyle?.content,
            (typeof childrened === 'string' || props.useTextStyle) && popoverStyle?.text,
          ]).className}
        >
          <Provider value={providerValue}>{childrened}</Provider>
        </div>
      </div>
    </AbsoluteList>
  );
};

export default Popover;
