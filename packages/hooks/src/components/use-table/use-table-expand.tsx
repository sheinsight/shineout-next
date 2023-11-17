import React, { useEffect } from 'react';
import { TableFormatColumn, BaseTableProps } from './use-table.type';
import usePersistFn from '../../common/use-persist-fn';
import { getKey } from '../..//utils/render';

export interface UseTableExpandProps
  extends Pick<BaseTableProps<any>, 'data' | 'expandKeys' | 'keygen'> {
  columns: TableFormatColumn<any>[];
}

export const useTableExpand = (props: UseTableExpandProps) => {
  const { columns, expandKeys } = props;
  const [expandState, setExpandState] = React.useState<(string | number)[]>([]);

  const isRowExpand = usePersistFn((data: any, index: number) => {
    const key = getKey(props.keygen, data, index);
    if (expandKeys) {
      return expandKeys.includes(key);
    }
    return expandState.includes(key);
  });

  const handleExpandClick = usePersistFn(
    (col: TableFormatColumn<any>, data: any, index: number) => {
      if (col && typeof col.render === 'function') {
        const expandRender = col.render(data, index);
        if (typeof expandRender === 'function') {
          // render 返回函数代表需要展开 否则不展开
          const expand = isRowExpand(data, index);
          if (expandKeys) {
            col.onClick?.(data, !expand);
          } else {
            const key = getKey(props.keygen, data, index);
            if (expand) {
              setExpandState(expandState.filter((item) => item !== key));
            } else {
              setExpandState([...expandState, key]);
            }
          }
        }
      }
    },
  );

  useEffect(() => {
    const expandNum = columns.filter(
      (col) => col.type === 'expand' || col.type === 'row-expand',
    ).length;
    if (expandNum > 1) {
      console.error('columns should not have more than one expand column');
    }
  });

  return {
    handleExpandClick,
    isRowExpand,
  };
};

export default useTableExpand;
