import React from 'react';

export const PICKER_MARGIN = 4;

export const getPositionStyle = (position: string) => {
  let newStyle: React.CSSProperties = {};
  if (position === 'drop-down') {
    newStyle = {
      top: '100%',
      marginTop: PICKER_MARGIN,
      left: 0,
    };
  } else if (position === 'drop-up') {
    newStyle = {
      bottom: '100%',
      marginBottom: PICKER_MARGIN,
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
      const capitalizedStr = m.charAt(0).toUpperCase() + m.slice(1);

      newStyle = {
        [m]: '100%',
        [`margin${capitalizedStr}`]: PICKER_MARGIN,
        [n]: 0,
      };
    }
  }
  return newStyle;
};
