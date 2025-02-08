import React from 'react';

type CSSDirection = 'left' | 'right' | 'top' | 'bottom';

const ReverseDir: Record<string, CSSDirection> = {
  left: 'right',
  right: 'left',
  top: 'bottom',
  bottom: 'top',
};
export const getPositionStyle = (
  position: string,
  config?: { popupGap?: number; zIndex?: number; fixedWidth?: boolean | 'min', parentBorderWidth?: number },
) => {
  const { popupGap = 0 } = config || {};
  const mainMargin = `calc(100% + ${popupGap}px)`;
  const halfMargin = `calc(50% + ${popupGap}px)`;

  let newStyle: React.CSSProperties = { zIndex: config?.zIndex };

  if (config?.fixedWidth) {
    const key = config.fixedWidth === 'min' ? 'minWidth' : 'width';
    newStyle[key] = '100%';

    if(config.parentBorderWidth){
      newStyle[key] = `calc(100% + ${config.parentBorderWidth}px)`;
    }
  }
  if (position === 'drop-down') {
    newStyle.top = mainMargin;
    newStyle.left = 0;
  } else if (position === 'drop-up') {
    newStyle.bottom = mainMargin;
    newStyle.left = 0;
  } else {
    const positionArr = (position || '').split('-') as CSSDirection[];
    if (positionArr.length === 2) {
      const [vDirection, hDirection] = positionArr;

      newStyle[ReverseDir[vDirection]] = mainMargin;
      newStyle[hDirection] = 0;
      if(config?.parentBorderWidth){
        newStyle[hDirection] = - config.parentBorderWidth / 2;
      }
    } else {
      const [vDirection] = positionArr;
      newStyle[ReverseDir[vDirection]] = mainMargin;
      if (vDirection === 'left' || vDirection === 'right') {
        newStyle.top = halfMargin;
        newStyle.transform = 'translateY(-50%)';
      }
      if (vDirection === 'top' || vDirection === 'bottom') {
        newStyle.left = halfMargin;
        newStyle.transform = 'translateX(-50%)';
      }
    }
  }
  return newStyle;
};
