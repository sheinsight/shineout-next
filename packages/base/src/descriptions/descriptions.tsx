import React, { Fragment, useMemo } from 'react';
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

  const longestItem = useMemo(
    () => renderItem.reduce((prev, curr) => (prev.length >= curr.length ? prev : curr)),
    [renderItem],
  );

  const jssStyle = jssStyleProps?.descriptions?.() || ({} as DescriptionsClasses);

  const Header = () => {
    if (!title && !extra) return null;
    return (
      <div className={jssStyle?.header}>
        {title && <div className={jssStyle?.title}>{title}</div>}
        {extra && <div className={jssStyle?.extra}>{extra}</div>}
      </div>
    );
  };

  const getColSpan = usePersistFn((d: DescriptionsItemProps, isHorizontal?: boolean) =>
    d.span && d.span > 1 ? (isHorizontal ? { colSpan: d.span * 2 - 1 } : { colSpan: d.span }) : {},
  );

  const renderTd = (
    d: DescriptionsItemProps,
    i: number,
    type: 'label' | 'value',
    isHorizontal: boolean,
    isColSpan?: boolean,
  ) => {
    const style = type === 'label' ? d.itemLabelStyle : d.itemValueStyle;
    const content = type === 'label' ? d.label : d.value;
    const className = type === 'label' ? jssStyle?.label : jssStyle?.value;
    const colSpanProps = !isColSpan ? getColSpan(d, isHorizontal) : {};
    return (
      <td key={`${d.key || i}_${type}`} className={className} style={style} {...colSpanProps}>
        {content}
        {type === 'label' && colon}
      </td>
    );
  };

  const renderHorizontal = (d: DescriptionsItemProps[], i: number) => (
    <tr key={i} className={jssStyle?.row}>
      {d.map((_d, _i) => (
        <Fragment key={_d.key || _i}>
          {renderTd(_d, _i, 'label', false, true)}
          {renderTd(_d, _i, 'value', true)}
        </Fragment>
      ))}
    </tr>
  );

  const renderVertical = (d: DescriptionsItemProps[], i: number) => (
    <Fragment key={i}>
      <tr className={jssStyle?.row}>{d.map((_d, _i) => renderTd(_d, _i, 'label', false))}</tr>
      <tr className={jssStyle?.row}>{d.map((_d, _i) => renderTd(_d, _i, 'value', false))}</tr>
    </Fragment>
  );

  const renderInline = (d: DescriptionsItemProps[], i: number) => (
    <tr key={i} className={jssStyle?.row}>
      {d.map((_d, _i) => {
        return (
          <td key={_d.key || _i} {...getColSpan(_d)} className={jssStyle?.cell}>
            <div className={jssStyle?.item}>
              <div className={jssStyle?.labelInline} style={_d.itemLabelStyle}>
                {_d?.label}
                {colon}
              </div>
              <div className={jssStyle?.valueInline} style={_d.itemValueStyle}>
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

  const rootClassName = classNames(
    className,
    jssStyle?.rootClass,
    jssStyle?.wrapper,
    size === 'small' && jssStyle?.small,
    size === 'large' && jssStyle?.large,
  );
  const bodyClassName = classNames(
    jssStyle?.body,
    border && jssStyle?.border,
    tableLayout === 'fixed' && jssStyle?.tableLayoutFixed,
    layout === 'inlineHorizontal' && jssStyle?.inlineHorizontal,
    layout === 'horizontal' && jssStyle?.horizontal,
    layout === 'vertical' && jssStyle?.vertical,
  );

  return (
    <div className={rootClassName} style={style}>
      <Header />
      <div className={bodyClassName}>
        <table className={jssStyle?.table} cellPadding={0} cellSpacing={0}>
          {layout === 'inlineHorizontal' && typeof column === 'number' && column > 1 && (
            <colgroup>
              {longestItem?.map((_, index, arr) => (
                <col key={index} style={{ width: `${(1 / arr.length) * 100}%` }} />
              ))}
            </colgroup>
          )}
          <tbody>
            {renderItem.map((d: DescriptionsItemProps[], i: number) => renderHandle(d, i))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Descriptions;
