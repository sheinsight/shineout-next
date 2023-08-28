import { useRef, useState } from 'react';
import { BasePopupProps, PositionType } from './use-popup.type';
import useClickAway from '../../common/use-click-away';
import { getPosition } from '../../utils/position';
import usePersistFn from '../../common/use-persist-fn';

const usePopup = (props: BasePopupProps) => {
  const {
    disabled,
    trigger = 'click',
    mouseEnterDelay = 0,
    autoMode = 'popover',
    mouseLeaveDelay,
    targetEvents,
  } = props;
  const [openState, setOpenState] = useState(false);
  const { current: context } = useRef({
    triggerTimer: null as NodeJS.Timeout | null,
  });
  const open = props.open !== undefined ? props.open : openState;
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

  const targetRef = useRef<HTMLDivElement | null>(null);
  const popupRef = useRef<HTMLDivElement | null>(null);

  const handleFocus = (delay?: number) => {
    if (!isPositionControl) {
      if (props.position === 'auto') {
        const newPosition = getPosition(targetRef.current, 'vertical', autoMode);
        if (newPosition !== position) setPositionState(newPosition);
      }
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

  // 点击触发弹窗的元素
  const getTargetProps = () => {
    return {
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
      onClick: handleClickToggle,
    };
  };

  const openPop = usePersistFn(() => {
    handleFocus();
  });

  const closePop = usePersistFn(() => {
    handleBlur();
  });

  useClickAway({
    onClickAway: () => handleBlur(),
    target: [targetRef, popupRef],
    effect: open,
  });

  return {
    open,
    position,
    targetRef,
    popupRef,
    getTargetProps,
    openPop,
    closePop,
  };
};

export default usePopup;
