import React from 'react';
import { ShouldUpdate, useMemo, util } from '@sheinx/hooks';
import type { TableFormatColumn } from '@sheinx/hooks';

interface TdProps {
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
  shouldUpdate?: ShouldUpdate<any>;
  renderContent: (col: TableFormatColumn<any>, data: any[]) => React.ReactNode;
}

export default function Td(props: TdProps): JSX.Element {
  const {
    col,
    colSpan,
    rowSpan,
    className,
    style,
    direction,
    role,
    onClick,
    onMouseEnter,
    onMouseLeave,
    renderContent,
  } = props;

  const externalDependencies =
    typeof props.shouldUpdate === 'object' && props.shouldUpdate.dependencies
      ? props.shouldUpdate.dependencies
      : [];

  const updateFn =
    typeof props.shouldUpdate === 'object' && 'update' in props.shouldUpdate
      ? props.shouldUpdate.update
      : props.shouldUpdate;

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
