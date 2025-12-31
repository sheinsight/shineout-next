import React, { Children, cloneElement } from 'react';
import clsx from 'clsx';
import { getGrid } from './util';
import { GridProps } from './grid.type';

const Grid = (props: GridProps) => {
  const { width = 1, offset, responsive, stretch, children, gutter, jssStyle, ...other } = props;
  let autoCount = 0;
  let settleWidth = 0;
  Children.toArray(children).forEach((c) => {
    const child = c as React.ReactElement<GridProps, any>;
    if (child.type && child.type.isGrid) {
      if (child.props.width) settleWidth += child.props.width;
      else autoCount += 1;
    }
  });
  const autoWidth = autoCount > 0 ? (1 - settleWidth) / autoCount : 0;

  const gridClasses = jssStyle?.grid?.();

  const className = clsx(
    props.className,
    gridClasses?.rootClass,
    gridClasses?.wrapper,
    gridClasses?.full,
    getGrid({ width, offset, responsive }),
  );
  const style = Object.assign({}, props.style);
  if (gutter && gutter > 0) {
    style.width = 'auto';
    style.display = 'block';
    style.marginLeft = `${0 - gutter / 2}px`;
    style.marginRight = `${0 - gutter / 2}px`;
  }
  return (
    <div {...other} style={style} className={className}>
      {Children.toArray(children).map((c) => {
        const child = c as React.ReactElement<GridProps, any>;
        if (child.type && child.type.isGrid) {
          const pps: { style: React.CSSProperties; width?: number } = {
            style: Object.assign({}, child.props.style),
          };
          if (!child.props.width) pps.width = autoWidth;
          if (stretch) pps.style = { ...pps.style, minHeight: '100%', height: '100%' };
          if (gutter && gutter > 0) {
            pps.style = { ...pps.style, paddingLeft: gutter / 2, paddingRight: gutter / 2 };
          }

          return cloneElement(child, pps);
        }
        return child;
      })}
    </div>
  );
};
Grid.isGrid = true;

export default Grid;
