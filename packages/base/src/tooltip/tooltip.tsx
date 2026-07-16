import { usePersistFn, usePopup, util } from '@sheinx/hooks';
import React, { cloneElement, isValidElement, useEffect, useMemo } from 'react';
import { TooltipClassNamesInfo, TooltipProps, TooltipSemanticKey } from './tooltip.type';
import AbsoluteList from '../absolute-list';
import { useConfig } from '../config';
import { useSemantic } from '../common';
import { arrowHCenterOffset, arrowVCenterOffset } from '../common/arrow';

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
    pointAtCenter = false,
  } = props;

  // Early validation checks BEFORE any hooks
  if (!isValidElement(children)) {
    devUseWarning.error('Tooltip children expect a single ReactElement.');
    return null;
  }

  const tooltipClasses = jssStyle?.tooltip?.();
  const config = useConfig();

  const persistent = persistentProp ?? config.tooltip?.persistent;

  const childrenProps = isValidElement(children)
    ? (children?.props as { [name: string]: any })
    : {};

  const delay = props.delay || props.mouseEnterDelay || defaultDelay;
  const mouseLeaveDelay = props.mouseLeaveDelay || defaultDelay;
  const { open, position, getTargetProps, targetRef, popupRef, closePop } = usePopup({
    position: util.getRTLPosition(popsitionProps, config.direction === 'rtl'),
    trigger: trigger,
    autoMode: 'popover',
    priorityDirection,
    mouseEnterDelay: delay,
    mouseLeaveDelay: mouseLeaveDelay,
    targetEvents: disabledChild ? {} : childrenProps,
  });

  // Semantic DOM 访问器：合并用户 classNames / styles、setConfig 全局兜底与内部 JSS class
  // 优先级（高→低）：props > setConfig({ tooltip: { ... } }) > 内部默认
  // 见 /docs/rfc/0001-semantic-dom.md §4.4
  const semInfo: TooltipClassNamesInfo = {
    open,
    position,
    type,
  };
  const [semClass, semStyle] = useSemantic<TooltipSemanticKey, TooltipClassNamesInfo>(
    props.classNames,
    props.styles,
    config.tooltip,
    semInfo,
  );

  const events = getTargetProps();

  // 计算 pointAtCenter 的偏移量，使箭头指向触发元素的中心
  const pointAtCenterOffset = useMemo((): [number, number] | undefined => {
    if (!pointAtCenter) return undefined;
    const rect = targetRef.current?.getBoundingClientRect();
    if (!rect) return undefined;
    // 垂直方向的非居中位置：bottom-left, bottom-right, top-left, top-right
    // 箭头水平中心 = 内边距(8) + 半宽(8) = 16px
    if (/^(top|bottom)-(left|right)$/.test(position)) {
      return [arrowHCenterOffset - rect.width / 2, 0];
    }
    // 水平方向的非居中位置：left-top, left-bottom, right-top, right-bottom
    // 箭头旋转 90° 后，垂直中心 = 内边距(8) + 半高(4) = 12px
    if (/^(left|right)-(top|bottom)$/.test(position)) {
      return [0, arrowVCenterOffset - rect.height / 2];
    }
    return undefined;
  }, [pointAtCenter, position, targetRef.current]);

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

  const inner = disabledChild && tip ? (
    <span className={tooltipClasses?.target} style={{ cursor: 'not-allowed' }}>
      {cloneElement(children as React.ReactElement, {
        style: { ...childrenProps.style, pointerEvents: 'none' },
      })}
    </span>
  ) : (
    children
  );

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
      {tip && (
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
          checkPosition
          updateKey={updateKey}
          offset={pointAtCenterOffset}
        >
          <div
            className={semClass('root', [
              className,
              tooltipClasses?.rootClass,
              tooltipClasses?.wrapper,
              open && tooltipClasses?.wrapperOpen,
            ])}
            style={{ pointerEvents: persistent ? 'initial' : undefined, display: open ? 'block' : 'none', ...semStyle('root') }}
            {...util.getDataAttribute({ type, position })}
            ref={popupRef}
            onMouseLeave={events.onMouseLeave}
            dir={config.direction}
          >
            {showArrow && (
              <span
                className={semClass('arrow', [tooltipClasses?.arrow])}
                style={semStyle('arrow')}
                {...util.getDataAttribute({ role: 'arrow' })}
              />
            )}
            <div style={{ ...style, ...semStyle('content') }} className={semClass('content', [tooltipClasses?.content])}>
              {tip}
            </div>
          </div>
        </AbsoluteList>
      )}
    </>
  );
};

export default Tooltip;
