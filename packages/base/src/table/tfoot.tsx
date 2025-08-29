import React from 'react';
import classNames from 'classnames';
import { TfootProps, SummaryItem } from './tfoot.type';
import { util } from '@sheinx/hooks';
import { useConfig } from '../config';
import type { ObjectType } from '@sheinx/hooks';
const { isArray, toNum } = util;

export default (props: TfootProps) => {
  const tableClasses = props.jssStyle?.table?.();
  const config = useConfig();

  const getFixedStyle = (
    fixed: 'left' | 'right' | undefined,
    index: number,
    colSpan: number,
  ): React.CSSProperties | undefined => {
    const colgroup = props.colgroup;
    if (fixed === 'left') {
      const left = colgroup.slice(0, index).reduce((a, b) => toNum(a) + toNum(b), 0);
      return {
        left: left,
        position: 'sticky',
      } as React.CSSProperties;
    }
    if (fixed === 'right') {
      const right = colgroup.slice(index + colSpan).reduce((a, b) => toNum(a) + toNum(b), 0);
      return {
        right: right,
        position: 'sticky',
      } as React.CSSProperties;
    }
  };

  const renderTd = (item: SummaryItem, index: number) => {
    const columns = props.columns || [];
    const { render, colSpan = 1 } = item;
    const content = render();
    const fixed: ObjectType = {};
    const isLast = index + colSpan - 1 >= columns.length - 1;
    for (let i = 0; i < colSpan; i++) {
      const col = columns[index + i] || {};
      if (col.fixed) {
        fixed[`fixed`] = col.fixed;
      }
      if (col.firstFixed) {
        fixed['firstFixed'] = true;
      }
      if (col.lastFixed) {
        fixed['lastFixed'] = true;
      }
    }

    return (
      <td
        dir={config.direction}
        key={index}
        colSpan={colSpan}
        style={getFixedStyle(fixed.fixed, index, colSpan)}
        className={classNames(
          fixed['fixed'] === 'left' && tableClasses?.cellFixedLeft,
          fixed['fixed'] === 'right' && tableClasses?.cellFixedRight,
          fixed.firstFixed && tableClasses?.cellFixedLeft,
          fixed.lastFixed && tableClasses?.cellFixedRight,
          (fixed.lastFixed || fixed.firstFixed) && tableClasses?.cellFixedLast,
          isLast && tableClasses?.cellIgnoreBorder,
        )}
      >
        {content}
      </td>
    );
  };
  const getTrs = () => {
    if (props?.summary?.length && props?.data?.length === 0) {
      return [];
    }
    let { summary = [] } = props;
    if (!isArray(summary[0])) {
      summary = [summary as SummaryItem[]];
    }
    const summarys = summary as SummaryItem[][];
    const trs = [];
    for (let i = 0; i < summarys.length; i++) {
      const row = summarys[i];
      trs[i] = [] as React.ReactNode[];
      let index = 0;
      for (let j = 0; j < row.length; j++) {
        const item = row[j];
        const nextIndex = index + (item.colSpan || 1);
        trs[i].push(renderTd(item, index));
        index = nextIndex;
      }
    }
    return trs;
  };
  const trs = getTrs();
  return (
    <tfoot>
      {trs.map((tr, index) => (
        <tr key={index}>{tr}</tr>
      ))}
    </tfoot>
  );
};
