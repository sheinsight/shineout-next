import React, { useEffect } from 'react';
import { useComponentMemo, util } from '@sheinx/hooks';
import type { TableFormatColumn } from '@sheinx/hooks';
import { TbodyProps } from './tbody.type';

interface TdProps extends Pick<TbodyProps, | 'virtual'>  {
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
    data,
    onClick,
    onMouseEnter,
    onMouseLeave,
    renderContent,
  } = props;

  const $td = useComponentMemo(
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
      data,
      className,
      style,
      col.type,
      col.treeColumnsName,
    ],
    props.virtual === 'lazy'
      ? (prev:any, next:any) => {
          if (col.type || col.treeColumnsName) {
            return true;
          }
          return prev.some((_:any, index:any) => {
            return !util.shallowEqual(prev?.[index], next?.[index]);
          }) || !props.scrolling;
        }
      : undefined,
  ) as JSX.Element;

  return $td;
}
