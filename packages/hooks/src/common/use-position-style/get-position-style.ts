import React from 'react';

const ReverseDir: Record<string, string> = {
  left: 'right',
  right: 'left',
  top: 'bottom',
  bottom: 'top',
};
export const getPositionStyle = (
  position: string,
  config?: { popupGap?: number; zIndex?: number },
) => {
  const { popupGap = 0 } = config || {};
  const mainMargin = `calc(100% + ${popupGap}px`;
  const halfMargin = `calc(50% + ${popupGap}px`;
  let newStyle: React.CSSProperties = { zIndex: config?.zIndex };
  if (position === 'drop-down') {
    newStyle.top = mainMargin;
    newStyle.left = 0;
  } else if (position === 'drop-up') {
    newStyle.bottom = mainMargin;
    newStyle.left = 0;
  } else {
    const positionArr = (position || '').split('-');
    if (positionArr.length === 2) {
      let [m, n] = positionArr;

      newStyle[ReverseDir[m] as 'margin'] = mainMargin;
      newStyle[n as 'top'] = 0;
    } else {
      const [m] = positionArr;
      newStyle[ReverseDir[m] as 'margin'] = mainMargin;
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
