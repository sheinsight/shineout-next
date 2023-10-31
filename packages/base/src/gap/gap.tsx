import support from './support';
import React from 'react';
import { GapProps } from './gap.type';

let supportFlexGap: boolean | undefined = undefined;
const Gap = (props: GapProps) => {
  if (supportFlexGap === undefined) supportFlexGap = support();
  const { column = 8, row = 8, style, className, children } = props;

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
        marginBottom: row,
        marginRight: column,
      };

  return (
    <div className={className} style={{ ...extendStyle, ...style }}>
      {React.Children.map(children, (child) => child && <div style={itemStyle}>{child}</div>)}
    </div>
  );
};

export default Gap;
