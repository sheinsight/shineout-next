import React, { useEffect } from 'react';
import { shouldCellUpdate, useMemo, util } from '@sheinx/hooks';
import type { TableFormatColumn } from '@sheinx/hooks';

interface TdProps<T> {
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
  shouldCellUpdate?: shouldCellUpdate<T>;
  renderContent: (col: TableFormatColumn<any>, data: any[]) => React.ReactNode;
}

export default function Td<T>(props: TdProps<T>): JSX.Element {
  const [style, setStyle] = React.useState<React.CSSProperties>();

  useEffect(() => {
    if(!props.style) return
    if(util.shallowEqual(props.style, style)) {
      return;
    }
    setStyle(props.style);
  }, [props.style]);

  const {
    col,
    colSpan,
    rowSpan,
    className,
    direction,
    role,
    onClick,
    onMouseEnter,
    onMouseLeave,
    renderContent,
  } = props;

  const externalDependencies =
    typeof props.shouldCellUpdate === 'object' && props.shouldCellUpdate.dependencies
      ? props.shouldCellUpdate.dependencies
      : [];

  const updateFn =
    typeof props.shouldCellUpdate === 'object' && 'update' in props.shouldCellUpdate
      ? props.shouldCellUpdate.update
      : props.shouldCellUpdate;

  const $td = useMemo(
    () => {
      const content = renderContent(props.col, props.data);
      return (
        <td
          key={col.key}
          colSpan={colSpan}
          rowSpan={rowSpan}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          className={className}
          style={style}
          dir={direction}
          data-role={role}
          onClick={onClick}
        >
          {content}
        </td>
      );
    },
    [
      ...externalDependencies,
      className,
      style,
      col.type,
      col.treeColumnsName,
      // onClick,
      // onMouseEnter,
      // onMouseLeave,
    ],
    updateFn
      ? (prev, next) => {
          if (col.type || col.treeColumnsName) {
            return true;
          }

          return prev.some((_, index) => !util.shallowEqual(prev[index], next[index]));
        }
      : undefined,
  ) as JSX.Element;

  return $td;
}
