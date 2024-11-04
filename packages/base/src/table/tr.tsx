import React, { useEffect, useRef } from 'react';
import { usePersistFn, util } from '@sheinx/hooks';
import type { TableFormatColumn } from '@sheinx/hooks';
import { addResizeObserver } from '@sheinx/hooks';
import classNames from 'classnames';
import Icons from '../icons';
import Checkbox from '../checkbox';
import Radio from '../radio';
import { TbodyProps, UseTableRowResult } from './tbody.type';
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
    | 'isEmptyTree'
    | 'setRowHeight'
    | 'fixLeftNum'
    | 'fixRightNum'
    | 'striped'
    | 'radio'
    | 'onRowClick'
    | 'rowClickAttr'
    | 'rowEvents'
    | 'bodyScrollWidth'
    | 'resizeFlag'
    | 'treeCheckAll'
    | 'onCellClick'
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
  isCellHover: UseTableRowResult['isCellHover'];
  hover?: boolean;
  handleCellHover: UseTableRowResult['handleCellHover'];
  hoverIndex: UseTableRowResult['hoverIndex'];
  isSelect: boolean;
  disabled?: boolean;
}

const Tr = (props: TrProps) => {
  const { treeFunc, jssStyle } = props;
  const tableClasses = props.jssStyle?.table?.();
  const trRef = useRef<HTMLTableRowElement>(null);
  const expandRef = useRef<HTMLTableRowElement>(null);
  const config = useConfig();
  const isRtl = config.direction === 'rtl';

  const getFixedStyle = (fixed: 'left' | 'right' | undefined, index: number, colSpan: number) => {
    if (!props.isScrollX) return;
    if (fixed === 'left') {
      if (props.fixLeftNum !== undefined) {
        return {
          transform: `translate3d(${props.fixLeftNum}px, 0, 0)`,
        } as React.CSSProperties;
      }
      const left = props.colgroup.slice(0, index).reduce((a, b) => toNum(a) + toNum(b), 0);
      return {
        position: 'sticky',
        left,
      } as React.CSSProperties;
    }
    if (fixed === 'right') {
      if (props.fixRightNum !== undefined) {
        return {
          transform: `translate3d(${0 - props.fixRightNum}px, 0, 0)`,
        } as React.CSSProperties;
      }
      const right = props.colgroup.slice(index + colSpan).reduce((a, b) => toNum(a) + toNum(b), 0);

      return {
        position: 'sticky',
        right,
      } as React.CSSProperties;
    }
    return {} as React.CSSProperties;
  };
  const getTdStyle = (column: TableFormatColumn<any>, colSpan: number) => {
    const index = column.index;
    const fixedStyle = getFixedStyle(column.fixed, index, colSpan);
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

  useEffect(() => {
    if (!trRef.current) return;
    const cancelObserver = addResizeObserver(trRef.current, setVirtualRowHeight, {
      direction: 'y',
    });

    return () => {
      cancelObserver();
    };
  }, []);

  const renderTreeExpand = (content: React.ReactNode, treeIndent: number = 22) => {
    const level = props.treeExpandLevel.get(props.originKey) || 0;
    const className = tableClasses?.expandWrapper;
    const children = props.rawData[props.treeColumnsName!];
    const isExpanded = props.treeFunc.isTreeExpanded(props.rawData, props.rowIndex);
    const dirName = isRtl ? 'Right' : 'Left';
    if (!children || (children.length === 0 && !props.treeEmptyExpand)) {
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
    return (
      <span className={className} style={{ marginLeft: level * treeIndent }}>
        <div className={classNames(tableClasses?.iconWrapper)}>
          <span
            data-role='tree-expand-icon'
            className={tableClasses?.expandIcon}
            onClick={() => {
              treeFunc.handleTreeExpand(props.rawData, props.rowIndex);
            }}
          >
            {isExpanded ? Icons.table.Expand : Icons.table.Collapse}
          </span>
        </div>
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
      return (
        <div
          className={classNames(tableClasses?.iconWrapper, tableClasses?.expandIconWrapper)}
          onClick={clickEvent}
        >
          <span data-role='expand-icon' className={tableClasses?.expandIcon}>
            {props.expanded ? Icons.table.Expand : Icons.table.Collapse}
          </span>
        </div>
      );
    }
    if (col.type === 'checkbox') {
      if (props.radio) {
        return (
          <div className={tableClasses?.iconWrapper}>
            <Radio
              jssStyle={props.jssStyle}
              style={{ margin: 0 }}
              checked={props.isSelect}
              disabled={props.disabled}
              onChange={(value: boolean) => {
                if (value) {
                  props.datum.add(data);
                } else {
                  props.datum.remove(data);
                }
              }}
            />
          </div>
        );
      }
      return (
        <div className={tableClasses?.iconWrapper}>
          <Checkbox
            jssStyle={props.jssStyle}
            disabled={props.disabled}
            style={{ margin: 0 }}
            checked={props.isSelect}
            onChange={(_value, check) => {
              if (check) {
                props.datum.add(
                  data,
                  props.treeCheckAll ? { childrenKey: props.treeColumnsName } : undefined,
                );
              } else {
                props.datum.remove(
                  data,
                  props.treeCheckAll ? { childrenKey: props.treeColumnsName } : undefined,
                );
              }
            }}
          />
        </div>
      );
    }

    const content = util.render(col.render as any, data, props.rowIndex);

    if (col.treeColumnsName) {
      return renderTreeExpand(content, col.treeIndent);
    }

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

        const td = (
          <td
            key={col.key}
            colSpan={data[i].colSpan}
            rowSpan={data[i].rowSpan}
            onMouseEnter={
              (props.hover && hasSiblingRowSpan) || data[i].rowSpan > 1
                ? () => {
                    props.handleCellHover(props.rowIndex, data[i].rowSpan);
                  }
                : undefined
            }
            onMouseLeave={
              (props.hover && hasSiblingRowSpan) || data[i].rowSpan > 1
                ? () => {
                    props.handleCellHover(-1, 0);
                  }
                : undefined
            }
            className={classNames(
              col.className,
              col.type === 'checkbox' && tableClasses?.cellCheckbox,
              col.fixed === 'left' && tableClasses?.cellFixedLeft,
              col.fixed === 'right' && tableClasses?.cellFixedRight,
              col.align === 'center' && tableClasses?.cellAlignCenter,
              col.align === 'right' && tableClasses?.cellAlignRight,
              (col.lastFixed || col.firstFixed || last.lastFixed) && tableClasses?.cellFixedLast,
              lastRowIndex === i && tableClasses?.cellIgnoreBorder,
              props.hoverIndex.has(props.rowIndex) && tableClasses?.cellHover,
              data[i].rowSpan > 1 &&
                props.isCellHover(props.rowIndex, data[i].rowSpan) &&
                tableClasses?.cellHover,
            )}
            style={getTdStyle(col, data[i].colSpan)}
            dir={config.direction}
            data-role={col.type === 'checkbox' ? 'checkbox' : undefined}
            onClick={props.onCellClick ? () => handleCellClick(data[i].data, i) : undefined}
          >
            {renderContent(col, data[i].data)}
          </td>
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
              {renderFunc()}
            </td>
          </tr>
        );
      }
    }
  };

  const preventClasses = [
    jssStyle?.input?.().wrapper,
    jssStyle?.select?.().wrapper,
    jssStyle?.datePicker?.().wrapper,
    jssStyle?.treeSelect?.().wrapper,
    jssStyle?.switch?.().wrapper,
    jssStyle?.checkbox?.().wrapper,
    jssStyle?.radio?.().wrapper,
    jssStyle?.cascader?.().wrapper,
  ];

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
    if (onRowClick && rowClickAttr) {
      if (rowClickAttr === true || rowClickAttr === '*') {
        onRowClick(props.rawData, props.rowIndex, rowClickAttr);
      } else {
        const arrts = (
          Array.isArray(rowClickAttr)
            ? rowClickAttr
            : [rowClickAttr].filter((item) => typeof item === 'string')
        ) as string[];
        const attIndex = arrts.findIndex((attr) => attr === '*' || target.hasAttribute(attr));
        if (attIndex > -1) {
          onRowClick(props.rawData, props.rowIndex, arrts[attIndex]);
        }
      }
    }

    if (props.rowClickExpand) {
      if (isNotExpandableElement(target)) return;
      props.handleExpandClick(
        props.expandCol as TableFormatColumn<any>,
        props.rawData,
        props.rowIndex,
      );
    }
  });

  return (
    <>
      <tr
        ref={trRef}
        className={classNames(
          props?.rowClassName?.(props.rawData, props.rowIndex),
          props.striped && props.rowIndex % 2 === 1 && tableClasses?.rowStriped,
          props.isSelect && tableClasses?.rowChecked,
          props.hover && tableClasses?.rowHover,
        )}
        {...props.rowEvents}
        onClick={handleRowClick}
      >
        {renderTds(props.columns, props.row)}
      </tr>
      {renderExpand()}
    </>
  );
};

export default Tr;
