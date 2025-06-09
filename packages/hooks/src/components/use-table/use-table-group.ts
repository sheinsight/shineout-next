import { useMemo, useRef } from 'react';
import { TableFormatColumn, TableGroupColumn, TableHeadColumn } from './use-table.type';
import { getUidStr } from '../../utils/uid';

const cacheGroup = new Map();

export interface UseTableGroupProps {
  columns: TableFormatColumn<any>[];
  bordered?: boolean;
}
const useTableGroup = (props: UseTableGroupProps) => {
  const { current: context } = useRef({
    columns: [] as Array<TableHeadColumn>,
    rightBorderRecord: {} as Record<string, number>,
    columnLevel: 0,
  });

  const setColumns = (
    columns: Array<TableHeadColumn>,
    col: TableHeadColumn,
    level: number,
    index: number,
  ) => {
    if (!(col as TableFormatColumn<any>).group) {
      columns.push(col);
      return 1;
    }
    const col2 = col as TableFormatColumn<any>;
    const g = Array.isArray(col2.group) ? col2.group : [col2.group];
    const last = columns[columns.length - 1] as TableGroupColumn;
    if (level > context.columnLevel) context.columnLevel = level;
    if (!g[level]) {
      columns.push(col);
      return 1;
    }

    let colSpan = 0;
    if (last && last.name === g[level]) {
      colSpan = setColumns(last.columns, col, level + 1, index);
      last.colSpan += colSpan;
      if (col.fixed) last.fixed = col.fixed;
      if (col.lastFixed) last.lastFixed = true;
      if (col.groupProps) last.groupProps = col.groupProps;
    } else {
      const sub = [] as TableHeadColumn[];
      colSpan = setColumns(sub, col, level + 1, index);
      const group = g[level];
      const groupCol: TableHeadColumn = {
        name: g[level],
        key:
          typeof g[level] === 'string'
            ? `${index}-${g[level]}`
            : cacheGroup.get(group) || cacheGroup.set(group, getUidStr()).get(group),
        colSpan,
        level,
        fixed: col.fixed,
        firstFixed: col.firstFixed,
        index: index,
        columns: sub,
        groupProps: col.groupProps,
      };
      columns.push(groupCol);
    }

    return colSpan;
  };

  const formatColumns = () => {
    context.columnLevel = 0;
    const columns: Array<TableHeadColumn> = [];
    props.columns.forEach((col, index) => {
      setColumns(columns, col, 0, index);
    });
    return columns;
  };

  const groupColumns = useMemo(formatColumns, [props.columns]);

  return {
    groupColumns,
    columnLevel: context.columnLevel,
  };
};

export default useTableGroup;
