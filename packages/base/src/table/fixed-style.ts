import React from 'react';
import { util } from '@sheinx/hooks';
import type { TableFormatColumn } from '@sheinx/hooks';

const { toNum } = util;

// 表体固定列的 sticky 偏移以 CSS 变量的形式写在 tbody 所在的 table 上，单元格只引用变量。
// 列宽测量、横向滚动状态变化时只需更新 table 的 style，单元格的 style 不变，行无需重渲染。
// 每个 Table 都会在自己的 table 上重新声明变量，嵌套表格不会继承到外层的值。
// position: sticky 必须内联：样式中 `table td { position: relative }` 的优先级高于 cellFixedRight 类名。
// 未出现横向滚动时偏移为 auto，sticky 不会吸附，效果与原先不输出固定样式一致。
const getLeftVar = (index: number) => `--soui-table-fixed-left-${index}`;
// right 偏移取决于单元格的结束列（index + colSpan），按结束列声明
const getRightVar = (end: number) => `--soui-table-fixed-right-${end}`;

const cellStyleCache = new Map<string, React.CSSProperties>();

export const getCellFixedStyle = (
  fixed: TableFormatColumn<any>['fixed'],
  index: number,
  colSpan: number,
  columnCount: number,
  isRtl: boolean,
): React.CSSProperties | undefined => {
  if (fixed !== 'left' && fixed !== 'right') return undefined;
  const end = Math.min(index + (colSpan || 1), columnCount);
  const varName = fixed === 'left' ? getLeftVar(index) : getRightVar(end);
  const key = `${varName}-${isRtl ? 'rtl' : 'ltr'}`;
  let style = cellStyleCache.get(key);
  if (!style) {
    const side = (fixed === 'left') !== isRtl ? 'left' : 'right';
    style = { position: 'sticky', [side]: `var(${varName})` } as unknown as React.CSSProperties;
    cellStyleCache.set(key, style);
  }
  return style;
};

export const getFixedVarsStyle = (
  columns: TableFormatColumn<any>[],
  colgroup: (number | string | undefined)[],
  isScrollX: boolean,
): Record<string, string> | undefined => {
  let rightStart = -1;
  const leftIndexes: number[] = [];
  columns.forEach((col) => {
    if (col.fixed === 'left') leftIndexes.push(col.index);
    if (col.fixed === 'right' && (rightStart === -1 || col.index < rightStart)) {
      rightStart = col.index;
    }
  });
  if (!leftIndexes.length && rightStart === -1) return undefined;

  const style: Record<string, string> = {};
  const sum = (start: number, end: number) =>
    colgroup.slice(start, end).reduce<number>((a, b) => a + toNum(b), 0);

  leftIndexes.forEach((index) => {
    style[getLeftVar(index)] = isScrollX ? `${sum(0, index)}px` : 'auto';
  });
  if (rightStart > -1) {
    for (let end = rightStart + 1; end <= columns.length; end++) {
      style[getRightVar(end)] = isScrollX ? `${sum(end, colgroup.length)}px` : 'auto';
    }
  }
  return style;
};
