import React, { useRef, useState } from 'react';
import { BasePopupProps, MenuPosition } from './use-popup.type';
import useClickAway from '../../common/use-click-away';
import { getMenuPosition } from '../../utils';

const usePopup = (props: BasePopupProps) => {
  const { disabled, trigger } = props;
  const [openState, setOpenState] = useState(false);
  const open = props.open !== undefined ? props.open : openState;
  const changeOpen = (open: boolean) => {
    props.onCollapse?.(open);
    if (props.open === undefined) {
      setOpenState(open);
    }
  };

  const isPositionControl = props.position && props.position !== 'auto';

  const [positionState, setPositionState] = useState<MenuPosition>(
    isPositionControl ? (props.position as MenuPosition) : 'bottom-left',
  );

  const position = (isPositionControl ? props.position : positionState) as MenuPosition;

  const { current: context } = useRef({
    closeTimer: null as NodeJS.Timeout | null,
  });
  const targetRef = useRef<HTMLDivElement | null>(null);
  const popupRef = useRef<HTMLDivElement | null>(null);

  const handleFocus = () => {
    if (context.closeTimer) clearTimeout(context.closeTimer);
    if (!isPositionControl) {
      if (props.position === 'auto') {
        const newPosition = getMenuPosition(targetRef.current);
        if (newPosition !== position) setPositionState(newPosition);
      }
    }
    if (open) return;
    changeOpen(true);
  };

  const handleBlur = (delay = 0) => {
    console.log('handleBlur', popupRef);
    if (!open) return;
    if (context.closeTimer) clearTimeout(context.closeTimer);
    context.closeTimer = setTimeout(() => {
      changeOpen(false);
    }, delay);
  };

  const handleClickToggle = (e: React.MouseEvent) => {
    if (disabled) return;
    if (trigger === 'hover') return;
    if (popupRef.current?.contains(e.target as Node)) return;
    if (open) {
      handleBlur();
    } else {
      handleFocus();
    }
  };

  const handleHoverToggle = (show: boolean) => {
    if (disabled) return;
    if (trigger === 'click') return;
    if (show) {
      handleFocus();
    } else {
      handleBlur(200);
    }
  };

  const handleMouseEnter = () => {
    handleHoverToggle(true);
  };

  const handleMouseLeave = () => {
    handleHoverToggle(false);
  };

  // 点击触发弹窗的元素
  const getTargetProps = () => {
    return {
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
      onClick: handleClickToggle,
    };
  };

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
    closePop: handleBlur,
    openPop: handleFocus,
  };
};

export default usePopup;
