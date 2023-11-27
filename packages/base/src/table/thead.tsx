import React, { useRef } from 'react';
import { TheadProps } from './thead.type';
import { useTableGroup, useDragMock, usePersistFn } from '@sheinx/hooks';
import type { TableFormatColumn, TableHeadColumn, TableGroupColumn } from '@sheinx/hooks';
import classNames from 'classnames';
import Checkbox from '../checkbox';

// 表头分组
// table 渲染
// 排序
// 拖拽列
// 固定列样式

export default (props: TheadProps) => {
  const { colgroup = [], sortInfo, onSorterChange, showSelectAll = true } = props;
  const tableClasses = props.jssStyle?.table?.();
  const { groupColumns, columnLevel } = useTableGroup({
    columns: props.columns,
    bordered: props.bordered,
  });

  const { current: context } = useRef({ dragIndex: -1 });

  const handleDragMove = usePersistFn((deltaX: number) => {
    props?.dragCol(context.dragIndex, deltaX);
  });

  const handleDragEnd = usePersistFn(() => {
    props?.resizeCol(context.dragIndex);
    context.dragIndex = -1;
  });

  const { handleMouseDown: startDrag, isDragging } = useDragMock({
    onDragmove: handleDragMove,
    onDragEnd: handleDragEnd,
  });

  const renderTitle = (title: TableFormatColumn<any>['title']) => {
    if (typeof title === 'function') {
      return title(props.data);
    }
    return <span>{title}</span>;
  };

  const renderSort = (column: TableFormatColumn<any>) => {
    if (!column.sorter) {
      return null;
    }
    const currentOrder = sortInfo.get(column.key)?.order;
    const handleChange = (order: 'asc' | 'desc' | null) => {
      if (onSorterChange) {
        onSorterChange(column.key, order, true, column.sorter);
      }
    };

    const arrow = (
      <svg viewBox='0 0 8 5' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M0.906815 3.87248L3.8896 0.192827C4.09802 -0.064284 4.43544 -0.0642746 4.64384 0.192848L7.5932 3.83158C7.80194 4.08911 7.80231 4.50711 7.59403 4.76521C7.49459 4.88842 7.35983 4.9581 7.21905 4.95907L1.28691 4.99999C0.992031 5.00202 0.751653 4.70811 0.750008 4.34351C0.749211 4.16689 0.805689 3.99723 0.906815 3.87248Z'
        />
      </svg>
    );

    const arrow1 = (
      <svg viewBox='0 0 8 5' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M7.59319 1.12752L4.6104 4.80717C4.40198 5.06428 4.06456 5.06427 3.85616 4.80715L0.906798 1.16842C0.698058 0.910888 0.697688 0.49289 0.90597 0.234795C1.00541 0.111578 1.14017 0.0419039 1.28095 0.0409328L7.21309 1.07639e-05C7.50797 -0.00202336 7.74835 0.291892 7.74999 0.656489C7.75079 0.833113 7.69431 1.00277 7.59319 1.12752Z'
        />
      </svg>
    );

    return (
      <div className={tableClasses?.sorterContainer}>
        <div
          className={classNames(
            tableClasses?.sorterAsc,
            currentOrder === 'asc' && tableClasses?.sorterActive,
          )}
          onClick={() => {
            handleChange(currentOrder === 'asc' ? null : 'asc');
          }}
        >
          {arrow}
        </div>
        <div
          className={classNames(
            tableClasses?.sorterDesc,
            currentOrder === 'desc' && tableClasses?.sorterActive,
          )}
          onClick={() => {
            handleChange(currentOrder === 'desc' ? null : 'desc');
          }}
        >
          {arrow1}
        </div>
      </div>
    );
  };

  const renderDrag = (index: number) => {
    if (!props.columnResizable) return null;
    return (
      <div
        className={classNames(
          tableClasses?.resizeSpanner,
          isDragging && context.dragIndex === index && tableClasses?.resizeSpannerActive,
          isDragging && context.dragIndex !== index && tableClasses?.resizeSpannerInactive,
        )}
        onMouseDown={(e) => {
          context.dragIndex = index;
          startDrag(e);
        }}
      />
    );
  };

  const getFixedStyle = (
    fixed: 'left' | 'right' | undefined,
    index: number,
    colSpan: number,
  ): React.CSSProperties | undefined => {
    if (fixed === 'left') {
      if (props.fixLeftNum !== undefined) {
        return {
          transform: `translate3d(${props.fixLeftNum}px, 0, 0)`,
        } as React.CSSProperties;
      }
      const left = colgroup.slice(0, index).reduce((a, b) => (a || 0) + (b || 0), 0);
      return {
        left: left,
        position: 'sticky',
      } as React.CSSProperties;
    }
    if (fixed === 'right') {
      if (props.fixRightNum !== undefined) {
        return {
          transform: `translate3d(-${props.fixRightNum}px, 0, 0)`,
        } as React.CSSProperties;
      }
      const right = colgroup.slice(index + colSpan).reduce((a, b) => (a || 0) + (b || 0), 0);
      return {
        right: right,
        position: 'sticky',
      } as React.CSSProperties;
    }
  };

  const createTh = (
    trs: React.ReactElement[][],
    col: TableHeadColumn,
    level: number,
    isLast: boolean,
  ) => {
    const colTemp = col as TableFormatColumn<any>;
    const colTemp2 = col as TableGroupColumn;

    const fixedStyle = getFixedStyle(col.fixed, col.index, colTemp2.colSpan || 1);

    const cellClassName = classNames(
      col.fixed === 'left' && tableClasses?.cellFixedLeft,
      col.fixed === 'right' && tableClasses?.cellFixedRight,
      (col.lastFixed || col.firstFixed) && tableClasses?.cellFixedLast,
      isLast && tableClasses?.cellIgnoreBorder,
    );
    const isExpand = colTemp.type === 'expand' || colTemp.type === 'row-expand';

    if (colTemp.title || isExpand) {
      const sorter = renderSort(colTemp);
      trs[level].push(
        <th
          className={cellClassName}
          rowSpan={columnLevel - level + 1}
          key={col.key}
          style={fixedStyle}
        >
          <div className={classNames(sorter && tableClasses?.hasSorter)}>
            {renderTitle(colTemp.title)}
            {renderSort(colTemp)}
            {renderDrag(colTemp.index)}
          </div>
        </th>,
      );
      return;
    }

    if (colTemp.type === 'checkbox') {
      trs[level].push(
        <th className={cellClassName} key='checkbox' rowSpan={trs.length} style={fixedStyle}>
          {showSelectAll && (
            <div style={{ lineHeight: 1, verticalAlign: 'middle' }}>
              <Checkbox
                checked={props.datum.getCheckedStatus}
                onChange={(_value, checked) => {
                  if (checked) {
                    props.datum.add(props.data);
                  } else {
                    props.datum.remove(props.data);
                  }
                }}
                jssStyle={props.jssStyle}
                style={{ margin: 0 }}
              />
            </div>
          )}
          {renderDrag(colTemp.index)}
        </th>,
      );
      return;
    }
    const style = typeof colTemp2.name === 'string' ? fixedStyle : { padding: 0, ...fixedStyle };
    trs[level].push(
      <th className={cellClassName} style={style} key={colTemp2.key} colSpan={colTemp2.colSpan}>
        <div>{colTemp2.name}</div>
      </th>,
    );
    if (colTemp2.columns) {
      colTemp2.columns.forEach((c, index) =>
        createTh(trs, c, level + 1, isLast && colTemp2.columns.length - 1 === index),
      );
    }
  };

  const renderTrs = () => {
    const trs: React.ReactElement[][] = Array.from({ length: columnLevel + 1 }).map(() => []);
    groupColumns.forEach((col, index) => {
      const isLast = index === groupColumns.length - 1;
      createTh(trs, col, 0, isLast);
    });
    return trs.map((tr, i) => <tr key={i}>{tr}</tr>);
  };
  return <thead>{renderTrs()}</thead>;
};
