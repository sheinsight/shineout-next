import React, { useEffect, useRef } from 'react';
import { TheadProps } from './thead.type';
import { useTableGroup, useDragMock, usePersistFn, util } from '@sheinx/hooks';
import type { TableFormatColumn, TableHeadColumn, TableGroupColumn } from '@sheinx/hooks';
import Icons from '../icons';
import classNames from 'classnames';
import Checkbox from '../checkbox';
import { useConfig } from '../config';
import { FilterSearch, FilterSelect } from './thead-filter';

const { toNum } = util;

export default (props: TheadProps) => {
  const { colgroup = [], sortInfo, onSorterChange, showSelectAll = true } = props;
  const tableClasses = props.jssStyle?.table?.();
  const trRefs = useRef<(HTMLTableRowElement | null)[]>([]);
  const { groupColumns, columnLevel } = useTableGroup({
    columns: props.columns,
    bordered: props.bordered,
  });

  const config = useConfig();

  const { current: context } = useRef({
    dragIndex: -1,
    trHeights: [] as number[],
  });

  useEffect(() => {
    const heights = trRefs.current.map((tr) => tr?.offsetHeight || 0);
    context.trHeights = heights;
  }, [groupColumns]);

  const handleDragMove = usePersistFn((deltaX: number) => {
    props?.dragCol(context.dragIndex, deltaX);
  });

  const handleDragEnd = usePersistFn(() => {
    props?.resizeCol(context.dragIndex);
    context.dragIndex = -1;
  });

  const { handleMouseDown: startDrag, isDragging } = useDragMock({
    onDragMove: handleDragMove,
    onDragEnd: handleDragEnd,
  });

  const renderTitle = (title: TableFormatColumn<any>['title']) => {
    if (typeof title === 'function') {
      return title(props.data || []);
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

    const isCustomRender = props.renderSorter && typeof props.renderSorter === 'function';

    const renderedSortDirections = column.sortDirections ?? props.sortDirections ?? ['asc', 'desc'];
    const onlyOneDirection = renderedSortDirections.length === 1;

    return (
      <div className={tableClasses?.sorterContainer} dir={config.direction}>
        {isCustomRender ? (
          props.renderSorter!({
            status: currentOrder,
            triggerAsc: () => handleChange('asc'),
            triggerDesc: () => handleChange('desc'),
          })
        ) : (
          <>
            {renderedSortDirections.includes('asc') && (
              <div
                className={classNames(
                  tableClasses?.sorterAsc,
                  currentOrder === 'asc' && tableClasses?.sorterActive,
                )}
                onClick={() => {
                  handleChange(currentOrder === 'asc' ? null : 'asc');
                }}
                style={onlyOneDirection ? { marginBottom: 0 } : {}}
              >
                {Icons.table.SortUp}
              </div>
            )}
            {renderedSortDirections.includes('desc') && (
              <div
                className={classNames(
                  tableClasses?.sorterDesc,
                  currentOrder === 'desc' && tableClasses?.sorterActive,
                )}
                onClick={() => {
                  handleChange(currentOrder === 'desc' ? null : 'desc');
                }}
                style={onlyOneDirection ? { marginTop: 0 } : {}}
              >
                {Icons.table.SortDown}
              </div>
            )}
          </>
        )}
      </div>
    );
  };

  const renderFilter = (column: TableFormatColumn<any>, columnIndex: number) => {
    if (!column.filter) {
      return null;
    }
    const { mode } = column.filter;

    const columnKey = typeof column.render === 'string' ? column.render : String(columnIndex);

    if (mode === 'search') {
      return (
        <FilterSearch
          tableClasses={tableClasses!}
          jssStyle={props.jssStyle}
          filter={column.filter}
          filterInfo={props.filterInfo}
          onFilterChange={props.onFilterChange}
          columnKey={columnKey}
        />
      );
    }

    if (mode === 'select') {
      return (
        <FilterSelect
          tableClasses={tableClasses!}
          jssStyle={props.jssStyle}
          filter={column.filter}
          filterInfo={props.filterInfo}
          onFilterChange={props.onFilterChange}
          columnKey={columnKey}
        />
      );
    }

    return null;
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
        dir={config.direction}
      />
    );
  };

  const getFixedStyle = (
    fixed: 'left' | 'right' | undefined,
    index: number,
    level: number,
  ): React.CSSProperties | undefined => {
    // 累加level 至 0 的所有高度
    const top = context.trHeights.slice(0, level).reduce((a, b) => toNum(a) + toNum(b), 0);
    if (fixed === 'left') {
      const left = colgroup.slice(0, index).reduce((a, b) => toNum(a) + toNum(b), 0);
      return {
        left: left,
        top: top,
        position: 'sticky',
      };
    }
    if (fixed === 'right') {
      const right = colgroup.slice(index + 1).reduce((a, b) => toNum(a) + toNum(b), 0);
      return {
        right: right,
        top: top,
        position: 'sticky',
      };
    }

    return {
      top: top,
      position: 'sticky',
    };
  };

  const createTh = (
    trs: React.ReactElement[][],
    col: TableHeadColumn,
    level: number,
    isLast: boolean,
    columnIndex: number,
  ) => {
    const colTemp = col as TableFormatColumn<any>;
    const colTemp2 = col as TableGroupColumn;

    const fixedStyle = getFixedStyle(col.fixed, col.index, level);

    const cellClassName = classNames(
      colTemp.className,
      colTemp.type === 'checkbox' && tableClasses?.cellCheckbox,
      col.fixed === 'left' && tableClasses?.cellFixedLeft,
      col.fixed === 'right' && tableClasses?.cellFixedRight,
      colTemp.align === 'center' && tableClasses?.cellAlignCenter,
      colTemp.align === 'right' && tableClasses?.cellAlignRight,
      colTemp.align !== 'right' && colTemp.align !== 'center' && tableClasses?.cellAlignLeft,
      (col.lastFixed || col.firstFixed) && tableClasses?.cellFixedLast,
      isLast && tableClasses?.cellIgnoreBorder,
      colTemp.sorter && props.cellSortable && tableClasses?.cellSortable,
    );
    const isExpand = colTemp.type === 'expand' || colTemp.type === 'row-expand';

    if (colTemp.title !== undefined || isExpand) {
      const sorter = renderSort(colTemp);
      const filter = renderFilter(colTemp, columnIndex);
      trs[level].push(
        <th
          className={cellClassName}
          rowSpan={columnLevel - level + 1}
          key={col.key}
          style={fixedStyle}
          dir={config.direction}
          onClick={(e) => {
            e.stopPropagation();
            if (props.cellSortable && colTemp.sorter) {
              const currentOrder = sortInfo.get(colTemp.key)?.order;
              let order: 'asc' | 'desc' | null = null;
              if (!currentOrder) {
                order = 'asc';
              } else if (currentOrder === 'asc') {
                order = 'desc';
              } else if (currentOrder === 'desc') {
                order = null;
              }
              onSorterChange?.(colTemp.key, order, true, colTemp.sorter);
            }
          }}
        >
          <div
            className={classNames(
              sorter && tableClasses?.hasSorter,
              filter && tableClasses?.hasFilter,
            )}
          >
            {renderTitle(colTemp.title)}
            {sorter}
            {filter}
            {colTemp.columnResizable !== false && renderDrag(colTemp.index)}
          </div>
        </th>,
      );
      return;
    }

    if (colTemp.type === 'checkbox') {
      trs[level].push(
        <th
          className={cellClassName}
          key='checkbox'
          rowSpan={trs.length}
          style={fixedStyle}
          dir={config.direction}
        >
          {showSelectAll && (
            <div className={tableClasses?.iconWrapper}>
              {props.radio ? null : (
                <Checkbox
                  disabled={props.disabled === true}
                  checked={props.datum.getCheckedStatus(
                    props.treeCheckAll ? props.treeColumnsName : undefined,
                  )}
                  onChange={(_value, checked) => {
                    if (checked) {
                      props.datum.add(
                        props.datum.data,
                        props.treeCheckAll ? { childrenKey: props.treeColumnsName } : undefined,
                      );
                    } else {
                      props.datum.remove(
                        props.datum.data,
                        props.treeCheckAll ? { childrenKey: props.treeColumnsName } : undefined,
                      );
                    }
                  }}
                  jssStyle={props.jssStyle}
                  style={{ margin: 0 }}
                />
              )}
            </div>
          )}
          {colTemp.type !== 'checkbox' ? renderDrag(colTemp.index) : null}
        </th>,
      );
      return;
    }
    let style = typeof colTemp2.name === 'string' ? fixedStyle : { padding: 0, ...fixedStyle };
    if (colTemp2?.groupProps?.style) {
      style = {
        ...style,
        ...colTemp2.groupProps.style,
      };
    }
    trs[level].push(
      <th
        className={classNames(
          cellClassName,
          tableClasses?.cellGroup,
          colTemp2?.groupProps?.className,
        )}
        style={style}
        key={colTemp2.key}
        colSpan={colTemp2.colSpan}
        dir={config.direction}
      >
        <div>{colTemp2.name}</div>
      </th>,
    );
    if (colTemp2.columns) {
      colTemp2.columns.forEach((c, index) =>
        createTh(trs, c, level + 1, isLast && colTemp2.columns.length - 1 === index, index),
      );
    }
  };

  const renderTrs = () => {
    const trs: React.ReactElement[][] = Array.from({ length: columnLevel + 1 }).map(() => []);
    groupColumns.forEach((col, index) => {
      const isLast = index === groupColumns.length - 1;
      createTh(trs, col, 0, isLast, index);
    });
    return trs.map((tr, i) => (
      <tr key={i} ref={(el) => (trRefs.current[i] = el)}>
        {tr}
      </tr>
    ));
  };
  return <thead>{renderTrs()}</thead>;
};
