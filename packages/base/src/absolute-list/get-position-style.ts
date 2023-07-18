import React from 'react';

export const PICKER_MARGIN = 4;
const mainMargin = `calc(100% + ${PICKER_MARGIN}px`;
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
      const reverse = {
        left: 'right',
        right: 'left',
        top: 'bottom',
        bottom: 'top',
      };
      m = reverse[m as 'left'];
      newStyle = {
        [m]: mainMargin,
        [n]: 0,
      };
    }
  }
  return newStyle;
};
