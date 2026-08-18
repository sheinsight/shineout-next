import React, { Children, cloneElement } from 'react';
import classNames from 'classnames';
import { getGrid } from './util';
import { GridProps, GridSemanticKey } from './grid.type';
import { useSemantic } from '../common';
import { useConfig } from '../config';

const Grid = (props: GridProps) => {
  const { width = 1, offset, responsive, stretch, children, gutter, jssStyle, classNames: classNamesProp, styles: stylesProp, ...other } = props;
  const config = useConfig();

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

  // Semantic DOM
  const globalSemanticConfig = config.grid
    ? { classNames: config.grid.classNames, styles: config.grid.styles }
    : undefined;

  const [semClass, semStyle] = useSemantic<GridSemanticKey>(
    classNamesProp,
    stylesProp,
    globalSemanticConfig,
  );

  const className = classNames(
    props.className,
    gridClasses?.rootClass,
    gridClasses?.wrapper,
    gridClasses?.full,
    getGrid({ width, offset, responsive }),
    semClass('root'),
  );
  const style = Object.assign({}, props.style, semStyle('root'));
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
