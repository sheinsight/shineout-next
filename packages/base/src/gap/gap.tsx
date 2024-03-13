import support from './support';
import React from 'react';
import classNames from 'classnames';
import { GapProps } from './gap.type';

let supportFlexGap: boolean | undefined = undefined;
const Gap = (props: GapProps) => {
  if (supportFlexGap === undefined) supportFlexGap = support();
  const { column = 8, row = 8, style, className, children, itemStyle: itemStyleProps, jssStyle } = props;

  const styles = jssStyle?.gap?.();

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
    ? undefined
    : {
        ...itemStyleProps,
        marginBottom: row,
        marginRight: column,
      };

  return (
    <div className={classNames(className, styles?.wrapper)} style={{ ...extendStyle, ...style }}>
      {React.Children.map(children, (child) => child && <div className={styles?.item} style={itemStyle}>{child}</div>)}
    </div>
  );
};

export default Gap;
