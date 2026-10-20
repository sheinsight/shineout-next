import React, { useEffect, useRef, useState } from 'react';
import { usePersistFn, util, TableContext } from '@sheinx/hooks';
import type { TableFormatColumn } from '@sheinx/hooks';
import { addResizeObserver } from '@sheinx/hooks';
import classNames from 'classnames';
import Spin from '../spin';
import Icons from '../icons';
import Checkbox from '../checkbox';
import Radio from '../radio';
import Td from './td';
import { TbodyProps, UseTableRowResult } from './tbody.type';
import type { TableClasses } from './table.type';
import { useConfig } from '../config';

const { toNum } = util;
interface TrProps
  extends Pick<
    TbodyProps,
    | 'jssStyle'
    | 'rowClassName'
    | 'datum'
    | 'treeFunc'
    | 'treeExpandLevel'
    | 'treeEmptyExpand'
    | 'expandIcon'
    | 'treeExpandIcon'
    | 'loader'
    | 'isEmptyTree'
    | 'setRowHeight'
    | 'striped'
    | 'strictRowHeight'
    | 'rowMemo'
    | 'radio'
    | 'onRowClick'
    | 'rowClickAttr'
    | 'rowEvents'
    | 'bodyScrollWidth'
    | 'resizeFlag'
    | 'treeCheckAll'
    | 'onCellClick'
    | 'virtual'
    | 'scrollRef'
  > {
  row: {
    data: any[];
    colSpan: number;
    rowSpan: number;
  }[];
  rowIndex: number;
  columns: TableFormatColumn<any>[];
  isScrollX: boolean;
  colgroup: (number | string | undefined)[];
  rawData: any;
  expanded: boolean;
  expandCol: TbodyProps['expandHideCol'] | undefined;
  rowClickExpand: boolean;
  handleExpandClick: (col: TableFormatColumn<any>, data: any, index: number) => void;
  treeColumnsName?: string;
  originKey: string | number;
  hover?: boolean;
  handleCellHover: UseTableRowResult['handleCellHover'];
  hoverIndex: UseTableRowResult['hoverIndex'];
  isSelect: boolean;
  disabled?: boolean;
  scrolling?: boolean;
  rowSelectMergeStartData?: any;
  bodyRowSemClass?: string;
  bodyRowSemStyle?: React.CSSProperties;
  bodyCellSemClass?: string;
  bodyCellSemStyle?: React.CSSProperties;
  // 由 Tbody 统一计算后下发，避免每行重复调用样式 hook
  tableClasses?: TableClasses;
  preventClasses: (string | undefined)[];
}

const Tr = (props: TrProps) => {
  const { treeFunc, tableClasses, preventClasses } = props;
  const trRef = useRef<HTMLTableRowElement>(null);
  const expandRef = useRef<HTMLTableRowElement>(null);
  const config = useConfig();
  const isRtl = config.direction === 'rtl';

  const getFixedStyle = (fixed: 'left' | 'right' | undefined, index: number, colSpan: number) => {
    if (!props.isScrollX) return;
    if (fixed === 'left') {
      const left = props.colgroup.slice(0, index).reduce((a, b) => toNum(a) + toNum(b), 0);
      return {
        position: 'sticky',
        [isRtl ? 'right' : 'left']: left,
      } as React.CSSProperties;
    }
    if (fixed === 'right') {
      const right = props.colgroup.slice(index + colSpan).reduce((a, b) => toNum(a) + toNum(b), 0);

      return {
        position: 'sticky',
        [isRtl ? 'left' : 'right']: right,
      } as React.CSSProperties;
    }
    return undefined;
  };
  const getTdStyle = (column: TableFormatColumn<any>, colSpan: number) => {
    const index = column.index;
    const fixedStyle = getFixedStyle(column.fixed, index, colSpan);
    if (!fixedStyle && !column.style) return;
    return {
      ...column.style,
      ...fixedStyle,
    } as React.CSSProperties;
  };

  const handleCellClick = usePersistFn((data: any, colIndex: number) => {
    if (!props.onCellClick) return;
    props.onCellClick(data, {
      rowIndex: props.rowIndex,
      columnIndex: colIndex,
      columnKey: props.columns[colIndex].key,
    });
  });

  const setVirtualRowHeight = usePersistFn(() => {
    if (props.strictRowHeight) return;
    if (props.setRowHeight && trRef.current) {
      const expandHeight = expandRef.current ? expandRef.current.getBoundingClientRect().height : 0;
      props.setRowHeight(
        props.rowIndex,
        trRef.current.getBoundingClientRect().height + expandHeight,
      );
    }
  });

  useEffect(setVirtualRowHeight, [
    props.expanded,
    props.rowIndex,
    props.bodyScrollWidth,
    props.resizeFlag,
  ]);

  // 行高只在虚拟列表下需要上报（setRowHeight 仅由虚拟列表传入），
  // 非虚拟场景（sticky-only / 普通表格）不再为每一行创建 ResizeObserver，
  // 避免数据切换时批量 observe/disconnect 以及 RO 首次回调带来的布局读取（计入 INP presentation delay）
  const shouldObserveRowHeight = !!props.setRowHeight && !props.strictRowHeight;

  useEffect(() => {
    // 祖先元素不可见时（display: none）
    if (!shouldObserveRowHeight || !trRef.current || !trRef.current.offsetParent) return;
    const cancelObserver = addResizeObserver(trRef.current, setVirtualRowHeight, {
      direction: 'y',
      lazy: true,
    });

    return () => {
      cancelObserver();
    };
  }, [shouldObserveRowHeight]);

  const [isExpandLoading, setIsExpandLoading] = useState(false);

  // 不使用 async 函数：编译产物会在每次渲染时为每一行创建 regenerator 状态机，大数据量下开销可观
  const innerExpandClick = usePersistFn((showLoader?: boolean) => {
    const { loader } = props;
    if (showLoader && loader && typeof loader === 'function') {
      setIsExpandLoading(true);
      // new Promise 包裹：loader 同步抛错或返回非 Promise 时，与原 await 写法行为一致
      return new Promise((resolve) => {
        resolve(loader(props.rawData, props.rowIndex));
      })
        .then(() => {
          treeFunc.handleTreeExpand(props.rawData, props.rowIndex);
        })
        .finally(() => {
          setIsExpandLoading(false);
        });
    }
    treeFunc.handleTreeExpand(props.rawData, props.rowIndex);
  });

  const renderTreeExpand = (content: React.ReactNode, treeIndent: number = 22) => {
    const level = props.treeExpandLevel.get(props.originKey) || 0;
    const className = tableClasses?.expandWrapper;
    const children = props.rawData[props.treeColumnsName!];
    const showLoader = children === undefined && typeof props.loader === 'function';
    const isExpanded = props.treeFunc.isTreeExpanded(props.rawData, props.rowIndex);
    const dirName = isRtl ? 'Right' : 'Left';

    const shouldRenderPlain =
      (!children && !props.loader) ||
      (children?.length === 0 && !props.treeEmptyExpand && !props.loader);

    if (shouldRenderPlain) {
      return (
        <span
          className={className}
          style={{
            [`margin${dirName}`]: level * treeIndent,
            [`padding${dirName}`]: props.isEmptyTree ? 0 : 22,
          }}
        >
          {content}
        </span>
      );
    }

    let $expandIcon;
    if (typeof props.treeExpandIcon === 'function') {
      $expandIcon = props.treeExpandIcon(props.rawData, props.rowIndex, isExpanded);
    } else if (showLoader) {
      $expandIcon = Icons.table.Collapse;
    } else if (children?.length > 0 || props.treeEmptyExpand) {
      $expandIcon = isExpanded ? Icons.table.Expand : Icons.table.Collapse;
    }

    if (isExpandLoading) {
      $expandIcon = <Spin size={12} jssStyle={props.jssStyle} name='ring' ignoreConfig></Spin>;
    }

    let $expandIconWrapper;
    if ($expandIcon !== null) {
      $expandIconWrapper = (
        <div className={classNames(tableClasses?.iconWrapper)}>
          <span
            data-role='tree-expand-icon'
            className={tableClasses?.expandIcon}
            onClick={() => innerExpandClick(showLoader)}
          >
            {$expandIcon}
          </span>
        </div>
      );
    }

    return (
      <span className={className} style={{ marginLeft: level * treeIndent }}>
        {$expandIconWrapper}
        {content}
      </span>
    );
  };

  const renderContent = (col: TrProps['columns'][number], data: any) => {
    if (col.type === 'expand' || col.type === 'row-expand') {
      const renderResult =
        typeof col.render === 'function' ? col.render(props.rawData, props.rowIndex) : undefined;

      if (typeof renderResult !== 'function') return null;

      const clickEvent =
        col.type === 'expand'
          ? () => {
              props.handleExpandClick(col, props.rawData, props.rowIndex);
            }
          : undefined;

      const expandInstance = (
        <div
          className={classNames(tableClasses?.iconWrapper, tableClasses?.expandIconWrapper)}
          onClick={clickEvent}
        >
          <span data-role='expand-icon' className={tableClasses?.expandIcon}>
            {props.expanded ? Icons.table.Expand : Icons.table.Collapse}
          </span>
        </div>
      );

      if (props.expandIcon && typeof props.expandIcon === 'function') {
        const result = props.expandIcon(
          props.rawData,
          props.rowIndex,
          props.expanded,
          expandInstance,
          clickEvent,
        );

        return result;
      }

      return expandInstance;
    }

    if (col.type === 'checkbox') {
      // 对于合并行，使用合并起始数据进行选择操作
      const selectData = props.rowSelectMergeStartData || data;
      const instance = (
        <div className={tableClasses?.iconWrapper}>
          {props.radio ? (
            <Radio
              jssStyle={props.jssStyle}
              style={{ margin: 0 }}
              checked={props.isSelect}
              disabled={props.disabled}
              onChange={(value: boolean) => {
                if (value) {
                  props.datum.add(selectData);
                } else {
                  props.datum.remove(selectData);
                }
              }}
            />
          ) : (
            <Checkbox
              jssStyle={props.jssStyle}
              disabled={props.disabled}
              style={{ margin: 0 }}
              checked={props.isSelect}
              onChange={(_value, check) => {
                if (check) {
                  props.datum.add(
                    selectData,
                    props.treeCheckAll ? { childrenKey: props.treeColumnsName } : undefined,
                  );
                } else {
                  props.datum.remove(
                    selectData,
                    props.treeCheckAll ? { childrenKey: props.treeColumnsName } : undefined,
                  );
                }
              }}
            />
          )}
        </div>
      );
      return typeof col.render === 'function'
        ? col.render(props.rawData, props.rowIndex, instance)
        : instance;
    }

    const content = util.render(col.render as any, data, props.rowIndex);

    if (col.treeColumnsName) {
      return renderTreeExpand(content, col.treeIndent);
    }

    if (col.render === undefined) return null;

    return content;
  };

  const renderTds = (cols: TrProps['columns'], data: TrProps['row']) => {
    const tds: React.ReactNode[] = [];
    let skip = 0;
    const lastRowIndex = data.length - 1;
    const hasSiblingRowSpan = data?.some((item) => item === null);
    for (let i = 0; i < cols.length; i++) {
      if (skip > 0) {
        skip--;
        continue;
      }
      const col = cols[i];
      if (data[i]) {
        const last = cols[i + (data[i].colSpan || 1) - 1] || {};

        const isRowSpanTd = data[i].rowSpan > 1;

        const shouldBindMouseEvent = (props.hover && hasSiblingRowSpan) || isRowSpanTd;
        let showCellHover = props.hover && props.hoverIndex.has(props.rowIndex);
        if (!showCellHover && data[i].rowSpan > 1) {
          for (let j = 0; j < data[i].rowSpan; j++) {
            if (props.hoverIndex.has(props.rowIndex + j)) {
              showCellHover = true;
              break;
            }
          }
        }
        const td = (
          <Td
            key={`${col.key}-${props.rowIndex}-${i}`}
            col={col}
            data={data[i].data}
            colSpan={data[i].colSpan}
            rowSpan={data[i].rowSpan}
            onMouseEnter={
              shouldBindMouseEvent
                ? () => props.handleCellHover(props.rowIndex, data[i].rowSpan)
                : undefined
            }
            onMouseLeave={shouldBindMouseEvent ? () => props.handleCellHover(-1, 0) : undefined}
            className={classNames(
              col.className,
              col.type === 'checkbox' && tableClasses?.cellCheckbox,
              col.fixed === 'left' && tableClasses?.cellFixedLeft,
              col.fixed === 'right' && tableClasses?.cellFixedRight,
              col.align === 'center' && tableClasses?.cellAlignCenter,
              col.align === 'right' && tableClasses?.cellAlignRight,
              (col.lastFixed || col.firstFixed || last.lastFixed) && tableClasses?.cellFixedLast,
              lastRowIndex === i && tableClasses?.cellIgnoreBorder,
              showCellHover && tableClasses?.cellHover,
              props.bodyCellSemClass,
            )}
            style={{ ...getTdStyle(col, data[i].colSpan), ...props.bodyCellSemStyle }}
            direction={config.direction}
            data-role={col.type === 'checkbox' ? 'checkbox' : undefined}
            onClick={props.onCellClick ? () => handleCellClick(data[i].data, i) : undefined}
            renderContent={renderContent}
            virtual={props.virtual}
            scrolling={props.scrolling}
          />
        );
        tds.push(td);
        if (data[i].colSpan) skip = data[i].colSpan - 1;
      }
    }
    return tds;
  };

  const renderExpand = () => {
    if (!props.expanded) return null;
    const expandCol = props.expandCol;
    if (expandCol && typeof expandCol.render === 'function') {
      const renderFunc = expandCol.render(props.rawData, props.rowIndex);
      if (typeof renderFunc === 'function') {
        return (
          <tr className={tableClasses?.rowExpand} ref={expandRef}>
            <td
              dir={config.direction}
              className={tableClasses?.cellIgnoreBorder}
              colSpan={props.columns.length}
              style={{ padding: 0 }}
            >
              <TableContext.Provider value={{ parentTableWidth: props.scrollRef?.current?.clientWidth }}>
                {renderFunc()}
              </TableContext.Provider>
            </td>
          </tr>
        );
      }
    }
  };

  const isNotExpandableElement = (el: HTMLElement): boolean => {
    const { tagName } = el;
    if (tagName === 'TD' || tagName === 'TR') return false;
    if (tagName === 'A' || tagName === 'BUTTON' || tagName === 'INPUT') return true;
    const isPreventElement = preventClasses.find((cl) => {
      const classes = cl?.split(' ') as string[];
      return classes.some((c) => el.classList.contains(c));
    });
    if (isPreventElement) return true;
    if (!el.parentElement) return true;
    return isNotExpandableElement(el.parentElement);
  };

  const handleRowClick = usePersistFn((e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    const { rowClickAttr = '*', onRowClick } = props;

    const attributes = Array.isArray(rowClickAttr) ? rowClickAttr : [];

    if (typeof rowClickAttr === 'string') {
      attributes.push(rowClickAttr);
    }

    const isFireElement = attributes
      .map((v) => (v === '*' ? '' : v))
      .find((v) => target.hasAttribute(v));
    const isExpandable = !isNotExpandableElement(target) || isFireElement;

    if (onRowClick && rowClickAttr) {
      if ((rowClickAttr === true || rowClickAttr === '*') && isExpandable) {
        onRowClick(props.rawData, props.rowIndex, rowClickAttr);
      } else {
        const arrts = (
          Array.isArray(rowClickAttr)
            ? rowClickAttr
            : [rowClickAttr].filter((item) => typeof item === 'string')
        ) as string[];
        const attIndex = arrts.findIndex((attr) => attr === '*' || target.hasAttribute(attr));
        if (attIndex > -1 && isExpandable) {
          onRowClick(props.rawData, props.rowIndex, arrts[attIndex]);
        }
      }
    }

    if (props.rowClickExpand && isExpandable) {
      props.handleExpandClick(
        props.expandCol as TableFormatColumn<any>,
        props.rawData,
        props.rowIndex,
      );
    }
  });

  // 虚拟列表下 tbody 仅渲染可见行，无法通过 DOM 索引获取真实行位置
  // 因此在 virtual 模式下增强 rowEvents，将回调签名从 (event) 扩展为 (event, rowData, rowIndex)
  let enhancedRowEvents: Record<string, any> | undefined = props.rowEvents;
  if (props.virtual && enhancedRowEvents) {
    const keys = Object.keys(enhancedRowEvents);
    if (keys.some((key) => typeof enhancedRowEvents![key] === 'function')) {
      const enhanced: Record<string, any> = {};
      for (const key of keys) {
        const val = enhancedRowEvents[key];
        enhanced[key] =
          typeof val === 'function'
            ? (e: React.SyntheticEvent) => val(e, props.rawData, props.rowIndex)
            : val;
      }
      enhancedRowEvents = enhanced;
    }
  }

  return (
    <>
      <tr
        ref={trRef}
        className={classNames(
          props?.rowClassName?.(props.rawData, props.rowIndex),
          props.striped && props.rowIndex % 2 === 1 && tableClasses?.rowStriped,
          props.isSelect && tableClasses?.rowChecked,
          props.hover && tableClasses?.rowHover,
          props.bodyRowSemClass,
        )}
        style={{ height: props.strictRowHeight ? props.strictRowHeight : undefined, ...props.bodyRowSemStyle }}
        {...enhancedRowEvents}
        onClick={handleRowClick}
      >
        {renderTds(props.columns, props.row)}
      </tr>
      {renderExpand()}
    </>
  );
};

// 行级 memo（rowMemo）比较时跳过的 props：
// - datum / treeFunc / handleCellHover / handleExpandClick：内部方法均为 usePersistFn，引用变化不影响渲染结果
//   （选中、禁用、展开状态已经以 isSelect / disabled / expanded / treeExpandLevel 的形式单独下发）
// - row / hoverIndex / 语义化样式：引用每次都可能变化，下面按内容单独比较
// - treeExpandLevel：随 data 每次重建，非树形表格不会读取；树形表格下单独按引用比较
const MEMO_SKIP_KEYS = [
  'datum',
  'treeFunc',
  'handleCellHover',
  'handleExpandClick',
  'row',
  'hoverIndex',
  'bodyRowSemStyle',
  'bodyCellSemStyle',
  'treeExpandLevel',
];

// rowData 在 data 变化时会整体重算（如懒加载追加数据），按单元格内容比较，避免未变化的行被连带重渲染
const isSameRowCells = (prev: TrProps['row'], next: TrProps['row']) => {
  if (prev === next) return true;
  if (prev.length !== next.length) return false;
  return prev.every((cell, i) => {
    const nextCell = next[i];
    if (!cell || !nextCell) return cell === nextCell;
    return (
      cell.data === nextCell.data &&
      cell.colSpan === nextCell.colSpan &&
      cell.rowSpan === nextCell.rowSpan
    );
  });
};

const isSameHover = (prev: TrProps, next: TrProps) => {
  if (prev.hoverIndex === next.hoverIndex || !next.hover) return true;
  // 存在跨行单元格时 hover 态取决于后续行，保守处理为需要更新
  if (next.row.some((cell) => cell && cell.rowSpan > 1)) return false;
  return prev.hoverIndex.has(prev.rowIndex) === next.hoverIndex.has(next.rowIndex);
};

// 未开启 rowMemo 时始终返回 false，行为与不做 memo 完全一致
const isTrPropsEqual = (prev: TrProps, next: TrProps) => {
  if (!prev.rowMemo || !next.rowMemo) return false;
  return (
    util.shallowEqual(prev, next, { skip: MEMO_SKIP_KEYS }) &&
    (!next.treeColumnsName || prev.treeExpandLevel === next.treeExpandLevel) &&
    isSameRowCells(prev.row, next.row) &&
    isSameHover(prev, next) &&
    util.shallowEqual(prev.bodyRowSemStyle, next.bodyRowSemStyle) &&
    util.shallowEqual(prev.bodyCellSemStyle, next.bodyCellSemStyle)
  );
};

export default React.memo(Tr, isTrPropsEqual);
