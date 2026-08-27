import support from './support';
import React from 'react';
import classNames from 'classnames';
import { GapProps, GapSemanticKey } from './gap.type';
import { useSemantic } from '../common';
import { useConfig } from '../config';

let supportFlexGap: boolean | undefined = undefined;
const Gap = (props: GapProps) => {
  if (supportFlexGap === undefined) supportFlexGap = support();
  const { column = 8, row = 8, style, className, children, itemStyle: itemStyleProps, jssStyle, classNames: classNamesProp, styles: stylesProp } = props;

  const config = useConfig();
  const styles = jssStyle?.gap?.();

  // Semantic DOM
  const globalSemanticConfig = config.gap
    ? { classNames: config.gap.classNames, styles: config.gap.styles }
    : undefined;

  const [semClass, semStyle] = useSemantic<GapSemanticKey>(
    classNamesProp,
    stylesProp,
    globalSemanticConfig,
  );

  const extendStyle = (
    supportFlexGap
      ? {
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          rowGap: row,
          columnGap: column,
        }
      : {
          marginBottom: -Number(row),
          marginRight: -Number(column),
        }
  ) as React.CSSProperties;

  const itemStyle = supportFlexGap
    ? itemStyleProps
    : {
        ...itemStyleProps,
        marginBottom: row,
        marginRight: column,
      };

  const itemSemStyle = semStyle('item');
  const mergedItemStyle = itemSemStyle ? { ...itemStyle, ...itemSemStyle } : itemStyle;

  return (
    <div className={classNames(className, styles?.rootClass, styles?.wrapper, semClass('root'))} style={{ ...extendStyle, ...style, ...semStyle('root') }}>
      {React.Children.map(children, (child) => child && <div className={classNames(styles?.item, semClass('item'))} style={mergedItemStyle}>{child}</div>)}
    </div>
  );
};

export default Gap;
