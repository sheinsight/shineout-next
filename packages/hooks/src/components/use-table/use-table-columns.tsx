import { TableColumnItem, TableFormatColumn } from './use-table.type';
import { produce } from '../../utils/immer';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import usePersistFn from '../../common/use-persist-fn';
export interface UseColumnsProps<Data> {
  columns?: TableColumnItem<Data>[];
  data?: Data[];
  showCheckbox?: boolean;
  virtualColumn?: boolean;
  scrollRef: React.RefObject<HTMLElement>;
}

const getHideExpandCol = (cols: UseColumnsProps<any>['columns'] = []) => {
  const expandCol = cols.find(
    (col) => col.hide && (col.type === 'expand' || col.type === 'row-expand'),
  );
  if (expandCol) {
    return expandCol;
  }
  return null;
};

export type RxpandHideColType = {
  hide?: boolean;
  type: 'expand' | 'row-expand';
  render?: (data: any, index: number) => (() => React.ReactNode) | undefined;
  onClick?: (data: any, expand: boolean) => void;
} | null;

// 缓冲区列数：左右各2列
const BUFFER_COUNT = 2;

const useColumns = <Data,>(props: UseColumnsProps<Data>) => {
  const [startIndex, setStartIndex] = useState(0);
  const [renderedCount, setRenderedCount] = useState(20);
  const { columns: propsColumns = [] } = props;

  const { current: context } = useRef<{
    cachedColumns: TableFormatColumn<Data>[] | null;
    oldColumns: TableColumnItem<Data>[] | null;
    groupLevel: number;
    expandHideCol: RxpandHideColType;
  }>({
    cachedColumns: null,
    oldColumns: null,
    groupLevel: 0,
    expandHideCol: null as RxpandHideColType,
  });

  // 隐藏的展开列

  const getColumns = usePersistFn((columnsA: TableColumnItem<Data>[]) => {
    if (columnsA === context.oldColumns) {
      return context.cachedColumns;
    }
    context.expandHideCol = getHideExpandCol(columnsA) as RxpandHideColType;
    let columns = columnsA
      .filter((c) => typeof c === 'object')
      .filter((c) => c !== context.expandHideCol);

    const haveCheckbox = columns.find((v) => v.type === 'checkbox');
    if (props.showCheckbox && !haveCheckbox) {
      columns.unshift({
        type: 'checkbox',
      });
    }
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
        produce(c as TableFormatColumn<Data>, (draft: TableFormatColumn<Data>) => {
          draft.index = i;
          if (draft.key === undefined) draft.key = i;
          if (i <= left) draft.fixed = 'left';
          if (i === left) draft.lastFixed = true;
          if (i >= right && right > 0) draft.fixed = 'right';
          if (i === right) draft.firstFixed = true;
        }) as TableFormatColumn<Data>,
    );

    context.oldColumns = columnsA;
    return context.cachedColumns;
  });

  const columns = getColumns(propsColumns) || [];

  const { leftFixedColumns, middleColumns } = useMemo(() => {
    if (!props.virtualColumn) return { leftFixedColumns: [], middleColumns: [] };
    const leftFixedColumns = columns.filter((col) => col.fixed === 'left');
    const middleColumns = columns.filter((col) => !col.fixed);
    return { leftFixedColumns, middleColumns };
  }, [columns, props.virtualColumn]);

  const handleScroll = (scrollInfo: { scrollLeft: number }) => {
    const { scrollLeft } = scrollInfo;

    let sum = 0;
    let currentIndex = 0;
    for (let i = 0, len = middleColumns.length - 1; i < len; i++) {
      const curCol = middleColumns[i];
      sum += (curCol.width as number) || 100;
      if (scrollLeft < sum) {
        // 计算可视区域内需要渲染的列数
        for (let j = i + 1; j < len; j++) {
          const nextCol = middleColumns[j];
          sum += (nextCol.width as number) || 100;
          if (props.scrollRef.current && sum - scrollLeft >= props.scrollRef.current?.clientWidth) {
            // 在原有基础上，右侧增加缓冲列
            const visibleCount = j - i;
            setRenderedCount(Math.min(visibleCount + BUFFER_COUNT * 2, len));
            break;
          }
        }

        // 左侧也增加缓冲列，但不能小于0
        const bufferedStartIndex = Math.max(0, i - BUFFER_COUNT);
        currentIndex = bufferedStartIndex;
        break;
      }
    }

    setStartIndex(currentIndex);
  };

  useEffect(() => {
    if (!props.virtualColumn) return;
    handleScroll({ scrollLeft: 0 });
  }, []);

  useEffect(() => {
    if (!props.virtualColumn) return;

    if(props.scrollRef.current?.scrollLeft === 0){
      handleScroll({ scrollLeft: 0 });
    }
  }, [props.data?.length]);

  const processedColumns = useMemo(() => {
    if (!props.virtualColumn) return columns;

    return columns.map((col, index) => {
      if (col.fixed) {
        return col;
      }
      if (index < startIndex || index > startIndex + renderedCount) {
        let colSpan;
        if (index > startIndex + renderedCount && index === startIndex + renderedCount + 1) {
          colSpan = () => middleColumns.length - (startIndex + renderedCount) + 1;
        } else if (index < startIndex && index === leftFixedColumns.length && startIndex > 0) {
          colSpan = () => startIndex;
        }

        const hiddenTitle = context.groupLevel > 0 ? col.title : null;
        return {
          ...col,
          colSpan,
          render: () => null,
          title: hiddenTitle,
        };
      }
      return col;
    });
  }, [columns, startIndex, renderedCount, props.virtualColumn, leftFixedColumns.length, middleColumns.length, context.groupLevel]);

  return {
    columns: processedColumns,
    columnInfo: {
      handleScroll,
    },
    currentColIndex: startIndex,
    expandHideCol: context.expandHideCol,
  };
};

export default useColumns;
