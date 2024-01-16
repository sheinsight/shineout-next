import React, { useEffect, useRef } from 'react';
import { usePersistFn, util } from '@sheinx/hooks';
import type { TableFormatColumn } from '@sheinx/hooks';
import classNames from 'classnames';
import Icons from '../icons';
import Checkbox from '../checkbox';
import Radio from '../radio';
import { TbodyProps, UseTableRowResult } from './tbody.type';

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
  > {
  row: {
    data: any[];
    colSpan: number;
    rowSpan: number;
  }[];
  rowIndex: number;
  columns: TableFormatColumn<any>[];
  isScrollX: boolean;
  colgroup: (number | undefined)[];
  rawData: any;
  expanded: boolean;
  expandCol: TbodyProps['expandHideCol'] | undefined;
  rowClickExpand: boolean;
  handleExpandClick: (col: TableFormatColumn<any>, data: any, index: number) => void;
  treeColumnsName?: string;
  originKey: string | number;
  isCellHover: UseTableRowResult['isCellHover'];
  handleCellHover: UseTableRowResult['handleCellHover'];
  hoverIndex: UseTableRowResult['hoverIndex'];
  isSelect: boolean;
  disabled?: boolean;
}

const Tr = (props: TrProps) => {
  const { treeFunc } = props;
  const tableClasses = props.jssStyle?.table?.();
  const trRef = useRef<HTMLTableRowElement>(null);
  const expandRef = useRef<HTMLTableRowElement>(null);

  const getFixedStyle = (fixed: 'left' | 'right' | undefined, index: number, colSpan: number) => {
    if (!props.isScrollX) return;
    if (fixed === 'left') {
      if (props.fixLeftNum !== undefined) {
        return {
          transform: `translate3d(${props.fixLeftNum}px, 0, 0)`,
        } as React.CSSProperties;
      }
      const left = props.colgroup.slice(0, index).reduce((a, b) => (a || 0) + (b || 0), 0);
      return {
        position: 'sticky',
        left,
      } as React.CSSProperties;
    }
    if (fixed === 'right') {
      if (props.fixRightNum !== undefined) {
        return {
          transform: `translate3d(-${props.fixRightNum}px, 0, 0)`,
        } as React.CSSProperties;
      }
      const right = props.colgroup
        .slice(index + 1 + colSpan)
        .reduce((a, b) => (a || 0) + (b || 0), 0);
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

  useEffect(() => {
    if (props.setRowHeight && trRef.current) {
      const expandHeight = expandRef.current ? expandRef.current.offsetHeight : 0;
      props.setRowHeight(props.rowIndex, trRef.current.offsetHeight + expandHeight);
    }
  }, [props.expanded, props.rowIndex]);

  const renderTreeExpand = (content: React.ReactNode, treeIndent: number = 22) => {
    const level = props.treeExpandLevel.get(props.originKey) || 0;
    const className = tableClasses?.expandWrapper;
    const children = props.rawData[props.treeColumnsName!];
    const isExpanded = props.treeFunc.isTreeExpanded(props.rawData, props.rowIndex);
    if (!children || (children.length === 0 && !props.treeEmptyExpand)) {
      return (
        <span
          className={className}
          style={{
            marginLeft: level * treeIndent,
            paddingLeft: props.isEmptyTree ? 0 : 22,
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
            className={tableClasses?.expandIcon}
            onClick={() => {
              treeFunc.handleTreeExpand(props.rawData, props.rowIndex);
            }}
          >
            {isExpanded ? Icons.Expand : Icons.OdecShrink}
          </span>
        </div>
        {content}
      </span>
    );
  };

  const renderContent = (col: TrProps['columns'][number], data: any, index: number) => {
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
        <div className={classNames(tableClasses?.iconWrapper)} onClick={clickEvent}>
          <span className={tableClasses?.expandIcon}>
            {props.expanded ? Icons.Expand : Icons.OdecShrink}
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
                props.datum.add(data, { childrenKey: props.treeColumnsName });
              } else {
                props.datum.remove(data, { childrenKey: props.treeColumnsName });
              }
            }}
          />
        </div>
      );
    }

    const content = util.render(col.render as any, data, index);

    if (col.treeColumnsName) {
      return renderTreeExpand(content, col.treeIndent);
    }

    return content;
  };

  const renderTds = (cols: TrProps['columns'], data: TrProps['row']) => {
    const tds: React.ReactNode[] = [];
    let skip = 0;
    const lastRowIndex = data.length - 1;
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
            onMouseEnter={() => {
              props.handleCellHover(props.rowIndex, data[i].rowSpan);
            }}
            onMouseLeave={() => {
              props.handleCellHover(-1, 0);
            }}
            className={classNames(
              col.className,
              col.type === 'checkbox' && tableClasses?.cellCheckbox,
              col.fixed === 'left' && tableClasses?.cellFixedLeft,
              col.fixed === 'right' && tableClasses?.cellFixedRight,
              col.align === 'center' && tableClasses?.cellAlignCenter,
              col.align === 'right' && tableClasses?.cellAlignRight,
              (col.lastFixed || col.firstFixed || last.lastFixed) && tableClasses?.cellFixedLast,
              lastRowIndex === i && tableClasses?.cellIgnoreBorder,
              props.isCellHover(props.rowIndex, data[i].rowSpan) && tableClasses?.cellHover,
            )}
            style={getTdStyle(col, data[i].colSpan)}
          >
            {renderContent(col, data[i].data, col.index)}
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

  const handleRowClick = usePersistFn((e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    const { rowClickAttr = ['*'], onRowClick } = props;
    if (onRowClick && rowClickAttr) {
      if (rowClickAttr === true || rowClickAttr === '*') {
        onRowClick(props.rawData, props.rowIndex);
      } else {
        const arrts = (
          Array.isArray(rowClickAttr)
            ? rowClickAttr
            : [rowClickAttr].filter((item) => typeof item === 'string')
        ) as string[];
        const isMatch = arrts.some((attr) => attr === '*' || target.hasAttribute(attr));
        if (isMatch) {
          onRowClick(props.rawData, props.rowIndex);
        }
      }
    }
    if (props.rowClickExpand) {
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
