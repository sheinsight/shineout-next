import React from 'react';

export const PICKER_MARGIN = 4;
const mainMargin = `calc(100% + ${PICKER_MARGIN}px`;
const halfMargin = `calc(50% + ${PICKER_MARGIN}px`;
const ReverseDir: Record<string, string> = {
  left: 'right',
  right: 'left',
  top: 'bottom',
  bottom: 'top',
};
export const getPositionStyle = (position: string) => {
  let newStyle: React.CSSProperties = {};
  if (position === 'drop-down') {
    newStyle = {
      top: mainMargin,
      left: 0,
    };
  } else if (position === 'drop-up') {
    newStyle = {
      bottom: mainMargin,
      left: 0,
    };
  } else {
    const positionArr = (position || '').split('-');
    if (positionArr.length === 2) {
      let [m, n] = positionArr;

      newStyle = {
        [ReverseDir[m]]: mainMargin,
        [n]: 0,
      };
    } else {
      const [m] = positionArr;
      newStyle = {
        [ReverseDir[m]]: mainMargin,
      };
      if (m === 'left' || m === 'right') {
        newStyle.top = halfMargin;
        newStyle.transform = 'translateY(-50%)';
      }
      if (m === 'top' || m === 'bottom') {
        newStyle.left = halfMargin;
        newStyle.transform = 'translateX(-50%)';
      }
    }
  }
  return newStyle;
};
