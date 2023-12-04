import React, { Fragment } from 'react';
import classNames from 'classnames';
import type { DescriptionsProps, DescriptionsClasses } from './descriptions.type';
import { useDescriptions, usePersistFn, type DescriptionsItemProps } from '@sheinx/hooks';

const Descriptions = (props: DescriptionsProps) => {
  const {
    className,
    jssStyle: jssStyleProps,
    style,
    title,
    extra,
    column = 3,
    items = [],
    colon,
    layout = 'inlineHorizontal',
    border = false,
    tableLayout = 'auto',
    valueStyle,
    labelStyle,
    size = 'default',
  } = props;
  const { renderItem } = useDescriptions({
    items,
    column,
    valueStyle,
    labelStyle,
  });

  const jssStyle = jssStyleProps?.descriptions?.() || ({} as DescriptionsClasses);

  const Header = () => (
    <div className={jssStyle?.header}>
      {title && <div className={jssStyle?.title}>{title}</div>}
      {extra && <div className={jssStyle?.extra}>{extra}</div>}
    </div>
  );

  const getColSpan = usePersistFn((d: DescriptionsItemProps, isHorizontal?: boolean) =>
    d.span && d.span > 1 ? (isHorizontal ? { colSpan: d.span * 2 - 1 } : { colSpan: d.span }) : {},
  );

  const renderHorizontal = (d: DescriptionsItemProps[], i: number) => (
    <tr key={i} className={jssStyle?.row}>
      {d.map((_d, _i) => {
        console.log('112', _d.label, _d.span, getColSpan(_d, true));
        return (
          <Fragment key={_d.key || _i}>
            <td className={jssStyle?.label} style={_d.ItemLabelStyle}>
              {_d?.label}
              {colon}
            </td>
            <td className={jssStyle?.value} style={_d.ItemValueStyle} {...getColSpan(_d, true)}>
              {_d?.value}
            </td>
          </Fragment>
        );
      })}
    </tr>
  );

  const renderVertical = (d: DescriptionsItemProps[], i: number) => (
    <Fragment key={i}>
      <tr className={jssStyle?.row}>
        {d.map((_d, _i) => {
          return (
            <td
              key={`${_d.key || _i}_k`}
              className={jssStyle?.label}
              style={_d.ItemLabelStyle}
              {...getColSpan(_d)}
            >
              {_d?.label}
              {colon}
            </td>
          );
        })}
      </tr>
      <tr className={jssStyle?.row}>
        {d.map((_d, _i) => {
          return (
            <td
              key={`${_d.key || _i}_v`}
              className={jssStyle?.value}
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
    <tr key={i} className={jssStyle?.row}>
      {d.map((_d, _i) => {
        return (
          <td key={_d.key || _i} {...getColSpan(_d)} className={jssStyle?.inlineTable}>
            <div className={jssStyle?.item}>
              <div className={jssStyle?.labelInline} style={_d.ItemLabelStyle}>
                {_d?.label}
                {colon}
              </div>
              <div className={jssStyle?.valueInline} style={_d.ItemValueStyle}>
                {_d?.value}
              </div>
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

  const rootClassName = classNames(className, jssStyle?.wrapper);
  const bodyClassName = classNames(
    jssStyle?.body,
    border && jssStyle?.border,
    tableLayout === 'fixed' && jssStyle?.tableLayoutFixed,
    layout === 'inlineHorizontal' && jssStyle?.inlineHorizontal,
    layout === 'horizontal' && jssStyle?.horizontal,
    size === 'small' && jssStyle?.small,
    size === 'large' && jssStyle?.large,
  );

  return (
    <div className={rootClassName} style={style}>
      <Header />
      <div className={bodyClassName}>
        <table className={jssStyle?.table} cellPadding={0} cellSpacing={0}>
          <tbody>
            {renderItem.map((d: DescriptionsItemProps[], i: number) => renderHandle(d, i))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Descriptions;
