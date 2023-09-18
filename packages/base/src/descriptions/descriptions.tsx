import React, { Fragment } from 'react';
import classNames from 'classnames';
import { DescriptionsProps } from './descriptions.type';
import { useDescriptions, type DescriptionsItemProps } from '@sheinx/hooks';

const Descriptions = (props: DescriptionsProps) => {
  const { className, jssStyle, style, title, extra, column, item, colon } = props;
  const { renderItem } = useDescriptions({
    item,
    column,
  });

  const rootClassName = classNames(className, jssStyle?.descriptions.wrapper);

  const Header = () => (
    <div className={jssStyle?.header.wrapper}>
      {title && <div className={jssStyle?.title.wrapper}>{title}</div>}
      {extra && <div className={jssStyle?.extra.wrapper}>{extra}</div>}
    </div>
  );

  const renderHorizontal = (d: DescriptionsItemProps[], i: number) => (
    <tr key={i} className={jssStyle?.row.wrapper}>
      {d.map((_d, _i) => {
        return (
          <Fragment key={_d.key || _i}>
            <td className={jssStyle?.label.wrapper} style={_d.labelStyle}>
              {_d.label}
              {colon}
            </td>
            <td className={jssStyle?.value.wrapper} style={_d.valueStyle}>
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
      <div className={jssStyle?.body.wrapper}>
        <table className={jssStyle?.table.wrapper} cellPadding={0} cellSpacing={0}>
          <tbody>{renderItem.map((d, i) => renderHandle(d, i))}</tbody>
        </table>
      </div>
    </div>
  );
};

export default Descriptions;
