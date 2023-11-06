import React, { Fragment } from 'react';
import classNames from 'classnames';
import { DescriptionsProps } from './descriptions.type';
import { useDescriptions, usePersistFn, type DescriptionsItemProps } from '@sheinx/hooks';

const Descriptions = (props: DescriptionsProps) => {
  const {
    className,
    jssStyle,
    style,
    title,
    extra,
    column = 3,
    items = [],
    colon,
    layout = 'horizontal',
    border = false,
    tableLayout = 'auto',
    valueStyle,
    labelStyle,
    // TODO: with tss
    // size
  } = props;
  const { renderItem } = useDescriptions({
    items,
    column,
    valueStyle,
    labelStyle,
  });

  const Header = () => (
    <div className={jssStyle?.descriptions.header}>
      {title && <div className={jssStyle?.descriptions.title}>{title}</div>}
      {extra && <div className={jssStyle?.descriptions.extra}>{extra}</div>}
    </div>
  );

  const getColSpan = usePersistFn((d: DescriptionsItemProps, isHorizontal?: boolean) =>
    d.span && d.span > 1 ? (isHorizontal ? { colSpan: d.span * 2 - 1 } : { colSpan: d.span }) : {},
  );

  const renderHorizontal = (d: DescriptionsItemProps[], i: number) => (
    <tr key={i} className={jssStyle?.descriptions.row}>
      {d.map((_d, _i) => {
        return (
          <Fragment key={_d.key || _i}>
            <td className={jssStyle?.descriptions.label} style={_d.ItemLabelStyle}>
              {_d?.label}
              {colon}
            </td>
            <td
              className={jssStyle?.descriptions.value}
              style={_d.ItemValueStyle}
              {...getColSpan(_d, true)}
            >
              {_d?.value}
            </td>
          </Fragment>
        );
      })}
    </tr>
  );

  const renderVertical = (d: DescriptionsItemProps[], i: number) => (
    <Fragment key={i}>
      <tr className={jssStyle?.descriptions.row}>
        {d.map((_d, _i) => {
          return (
            <td
              key={`${_d.key || _i}_k`}
              className={jssStyle?.descriptions.label}
              style={_d.ItemLabelStyle}
              {...getColSpan(_d)}
            >
              {_d?.label}
              {colon}
            </td>
          );
        })}
      </tr>
      <tr className={jssStyle?.descriptions.row}>
        {d.map((_d, _i) => {
          return (
            <td
              key={`${_d.key || _i}_v`}
              className={jssStyle?.descriptions.value}
              style={_d.ItemValueStyle}
              {...getColSpan(_d)}
            >
              {_d?.value}
            </td>
          );
        })}
      </tr>
    </Fragment>
  );

  const renderInline = (d: DescriptionsItemProps[], i: number) => (
    <tr key={i} className={jssStyle?.descriptions.row}>
      {d.map((_d, _i) => {
        return (
          <td key={_d.key || _i} {...getColSpan(_d)} className={jssStyle?.descriptions.item}>
            <div className={jssStyle?.descriptions.labelInline} style={_d.ItemLabelStyle}>
              {_d?.label}
              {colon}
            </div>
            <div className={jssStyle?.descriptions.valueInline} style={_d.ItemValueStyle}>
              {_d?.value}
            </div>
          </td>
        );
      })}
    </tr>
  );

  const renderHandle = (d: DescriptionsItemProps[], i: number) => {
    if (layout === 'inlineHorizontal' || layout === 'inlineVertical') return renderInline(d, i);
    return layout === 'horizontal' ? renderHorizontal(d, i) : renderVertical(d, i);
  };

  const rootClassName = classNames(className, jssStyle?.descriptions.wrapper);
  const bodyClassName = classNames(
    jssStyle?.descriptions.body,
    border && jssStyle?.descriptions.border,
    tableLayout === 'fixed' && jssStyle?.descriptions.tableLayoutFixed,
    layout === 'inlineHorizontal' && jssStyle?.descriptions.inlineHorizontal,
    layout === 'horizontal' && jssStyle?.descriptions.horizontal,
  );

  return (
    <div className={rootClassName} style={style}>
      <Header />
      <div className={bodyClassName}>
        <table className={jssStyle?.descriptions.table} cellPadding={0} cellSpacing={0}>
          <tbody>
            {renderItem.map((d: DescriptionsItemProps[], i: number) => renderHandle(d, i))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Descriptions;
