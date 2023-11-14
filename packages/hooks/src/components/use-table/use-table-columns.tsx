import { TableColumnItem, TableFormatColumn } from './use-table.type';
import deepEqual from 'fast-deep-equal';
import { produce } from 'immer';
import { useRef } from 'react';
import usePersistFn from '../../common/use-persist-fn';
export interface UseColumnsProps<Data> {
  columns: TableColumnItem<Data>[];
  showCheckbox?: boolean;
}

const useColumns = <Data,>(props: UseColumnsProps<Data>) => {
  const { columns: propsColumns = [] } = props;
  const { current: context } = useRef<{
    cachedColumns: TableFormatColumn<Data>[] | null;
    oldColumns: TableColumnItem<Data>[] | null;
    groupLevel: number;
  }>({
    cachedColumns: null,
    oldColumns: null,
    groupLevel: 0,
  });

  const getColumns = usePersistFn((columnsA: TableColumnItem<Data>[]) => {
    if (deepEqual(columnsA, context.oldColumns)) {
      return context.cachedColumns;
    }
    let columns = columnsA.filter((c) => typeof c === 'object');
    let left = -1;
    let right = -1;
    columns.forEach((c, i) => {
      if (c.fixed === 'left') left = i;
      if (c.fixed === 'right' && right < 0) right = i;
      if (c.group) {
        const group = Array.isArray(c.group) ? c.group : [c.group];
        context.groupLevel = Math.max(context.groupLevel, group.length);
      }
    });
    context.cachedColumns = columns.map(
      (c, i) =>
        produce(c, (draft: TableFormatColumn<Data>) => {
          draft.index = i;
          if (draft.key === undefined) draft.key = i;
          if (i <= left) draft.fixed = 'left';
          if (i === left) draft.lastFixed = true;
          if (i >= right && right > 0) draft.fixed = 'right';
          if (i === right) draft.firstFixed = true;
        }) as TableFormatColumn<Data>,
    );
    const haveCheckbox = columns.find((v) => v.type === 'checkbox');
    if (props.showCheckbox && !haveCheckbox) {
      context.cachedColumns.unshift({
        index: -1,
        key: 'checkbox',
        type: 'checkbox',
        fixed: left >= 0 ? 'left' : undefined,
      });
    }
    context.oldColumns = columnsA;
    return context.cachedColumns;
  });

  if (context.cachedColumns === null) getColumns(propsColumns);
  return {
    columns: getColumns(propsColumns) || [],
  };
};

export default useColumns;
