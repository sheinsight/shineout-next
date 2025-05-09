import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { BasePopupProps, PositionType } from './use-popup.type';
import useClickAway from '../../common/use-click-away';
import { getPosition } from '../../utils/position';
import usePersistFn from '../../common/use-persist-fn';
import popupContext from './popup-context';


const usePopup = (props: BasePopupProps) => {
  const {
    disabled,
    trigger = 'click',
    mouseEnterDelay = 0,
    autoMode = 'popover',
    mouseLeaveDelay,
    targetEvents,
    defaultOpen = false,
  } = props;

  const [openState, setOpenState] = useState(defaultOpen);
  const { bindChild, removeChild } = useContext(popupContext);

  const targetRef = useRef<HTMLDivElement | null>(null);
  const popupRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bindChild(popupRef);
    return () => {
      removeChild(popupRef);
    };
  }, []);

  const { current: context } = useRef({
    triggerTimer: null as NodeJS.Timeout | null,
    // 记录所有的子popup 点击子 popup 不关闭弹窗
    chain: [targetRef, popupRef] as React.MutableRefObject<HTMLElement | null>[],
  });
  const open = openState;
  const changeOpen = (openIn: boolean, delay?: number) => {
    if (context.triggerTimer) clearTimeout(context.triggerTimer);
    context.triggerTimer = setTimeout(() => {
      if (open === openIn) return;
      props.onCollapse?.(openIn);
      if (props.open === undefined) {
        setOpenState(openIn);
      }
    }, delay);
  };

  const isPositionControl = props.position && props.position !== 'auto';

  const [positionState, setPositionState] = useState<PositionType>(
    isPositionControl ? (props.position as PositionType) : 'bottom-left',
  );

  const position = (isPositionControl ? props.position : positionState) as PositionType;

  const updatePosition = usePersistFn(() => {
    // if (isPositionControl) return;
    // if (props.position === 'auto' || !props.position) {
    const newPosition = getPosition(
      targetRef.current,
      props.priorityDirection,
      autoMode,
      popupRef.current || undefined,
    );
    if (newPosition !== position) setPositionState(newPosition);
  });

  useEffect(() => {
    if (props.open) {
      updatePosition();
    }
    setOpenState(!!props.open);
  }, [props.open]);

  // const getPopUpHeight = () => {
  //   let height = 0;
  //   if (popupRef.current) {
  //     const el = popupRef.current;
  //     const parent = el?.parentElement;
  //     let clone = el.cloneNode(true) as HTMLElement;
  //     clone.style.opacity = '0';
  //     clone.style.display = '';
  //     clone.style.visibility = 'visible';
  //     clone.style.pointerEvents = 'none';
  //     parent?.appendChild(clone);
  //     height = clone.offsetHeight;
  //     parent?.removeChild(clone);
  //     //@ts-ignore
  //     clone = null;
  //   }
  //   return height;
  // };

  const handleFocus = (delay?: number) => {
    if (props.open === undefined) {
      updatePosition();
    }
    changeOpen(true, delay);
  };

  const handleBlur = (delay = 0) => {
    changeOpen(false, delay);
  };

  const handleClickToggle = usePersistFn((e: { target: EventTarget | null }) => {
    targetEvents?.onClick?.(e);
    if (disabled) return;
    if (trigger !== 'click') return;
    if (popupRef.current?.contains(e.target as Node)) return;
    if (open) {
      handleBlur();
    } else {
      handleFocus();
    }
  });

  const handleHoverToggle = (show: boolean) => {
    if (disabled) return;
    if (trigger !== 'hover') return;
    if (show) {
      handleFocus(mouseEnterDelay);
    } else {
      handleBlur(mouseLeaveDelay);
    }
  };

  const handleMouseEnter = usePersistFn((e: { target: EventTarget | null }) => {
    targetEvents?.onMouseEnter?.(e);
    if (trigger !== 'hover') return;
    handleHoverToggle(true);
  });

  const handleMouseLeave = usePersistFn((e: { target: EventTarget | null }) => {
    targetEvents?.onMouseLeave?.(e);
    if (trigger !== 'hover') return;
    // @ts-ignore
    if (e.relatedTarget instanceof HTMLElement && popupRef.current?.contains(e.relatedTarget)) {
      return;
    }
    handleHoverToggle(false);
  });

  const openPop = usePersistFn(() => {
    handleFocus();
  });

  const closePop = usePersistFn(() => {
    handleBlur();
  });

  // 点击触发弹窗的元素
  const getTargetProps = () => {
    if (trigger === 'hover')
      return {
        onMouseEnter: handleMouseEnter,
        onMouseLeave: handleMouseLeave,
      };
    if (trigger === 'click') {
      return {
        onClick: handleClickToggle,
      };
    }

    if (trigger === 'focus') {
      return {
        onFocus: openPop,
        onBlur: closePop,
      };
    }
    return {};
  };

  useClickAway({
    onClickAway: () => handleBlur(),
    target: context.chain,
    effect: (trigger === 'click' || trigger === 'hover') && open,
    event: 'mousedown',
  });

  const providerValue = useMemo(
    () => ({
      bindChild: (elRef: React.MutableRefObject<HTMLElement | null>) => {
        context.chain.push(elRef);
      },
      removeChild: (elRef: React.MutableRefObject<HTMLElement | null>) => {
        const index = context.chain.findIndex((item) => item === elRef);
        if (index > -1) {
          context.chain.splice(index, 1);
        }
      },
    }),
    [],
  );

  return {
    open,
    position,
    targetRef,
    popupRef,
    getTargetProps,
    openPop,
    closePop,
    Provider: popupContext.Provider,
    providerValue,
  };
};

export default usePopup;
