import React, { Fragment } from 'react';
import classNames from 'classnames';
import { DescriptionsProps } from './descriptions.type';
import { useDescriptions, type DescriptionsItemProps } from '@sheinx/hooks';

const Descriptions = (props: DescriptionsProps) => {
  const { className, jssStyle, style, title, extra, column = 3, item, colon } = props;
  const { renderItem } = useDescriptions({
    item,
    column,
  });

  const rootClassName = classNames(className, jssStyle?.descriptions.wrapper);

  const Header = () => (
    <div className={jssStyle?.descriptions.header}>
      {title && <div className={jssStyle?.descriptions.title}>{title}</div>}
      {extra && <div className={jssStyle?.descriptions.extra}>{extra}</div>}
    </div>
  );

  const renderHorizontal = (d: DescriptionsItemProps[], i: number) => (
    <tr key={i} className={jssStyle?.descriptions.row}>
      {d.map((_d, _i) => {
        return (
          <Fragment key={_d.key || _i}>
            <td className={jssStyle?.descriptions.label} style={_d.labelStyle}>
              {_d.label}
              {colon}
            </td>
            <td className={jssStyle?.descriptions.value} style={_d.valueStyle}>
              {_d.value}
            </td>
          </Fragment>
        );
      })}
    </tr>
  );

  const renderHandle = (d: DescriptionsItemProps[], i: number) => {
    return renderHorizontal(d, i);
  };

  return (
    <div className={rootClassName} style={style}>
      <Header />
      <div className={jssStyle?.descriptions.body}>
        <table className={jssStyle?.descriptions.table} cellPadding={0} cellSpacing={0}>
          <tbody>{renderItem.map((d, i) => renderHandle(d, i))}</tbody>
        </table>
      </div>
    </div>
  );
};

export default Descriptions;
