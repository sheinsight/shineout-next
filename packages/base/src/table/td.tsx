import React from 'react';
import { useComponentMemo, util } from '@sheinx/hooks';
import type { TableFormatColumn } from '@sheinx/hooks';
import { TbodyProps } from './tbody.type';

interface TdProps extends Pick<TbodyProps, 'virtual'> {
  col: TableFormatColumn<any>;
  data: any[];
  colSpan: number;
  rowSpan: number;
  className: string;
  style?: React.CSSProperties;
  direction: 'ltr' | 'rtl';
  role?: string;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onClick?: () => void;
  renderContent: (col: TableFormatColumn<any>, data: any[]) => React.ReactNode;
  scrolling?: boolean;
}

export default function Td(props: TdProps): JSX.Element {
  const {
    col,
    colSpan,
    rowSpan,
    className,
    direction,
    role,
    data,
    onClick,
    onMouseEnter,
    onMouseLeave,
    renderContent,
  } = props;

  const $td = (
    <td
      key={col.key}
      colSpan={colSpan}
      rowSpan={rowSpan}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={className}
      style={props.style}
      dir={direction}
      data-role={role}
      onClick={onClick}
    >
      {renderContent(props.col, props.data)}
    </td>
  );

  if (props.virtual === 'lazy') {
    return useComponentMemo(
      () => $td,
      [data, className, props.style?.left, props.style?.right, col.type, col.treeColumnsName],
      (prev: any, next: any) => {
        if (col.type || col.treeColumnsName) {
          return true;
        }
        return (
          prev.some((_: any, index: any) => {
            return !util.shallowEqual(prev?.[index], next?.[index]);
          }) || !props.scrolling
        );
      },
    ) as JSX.Element;
  }
  return $td;
}
