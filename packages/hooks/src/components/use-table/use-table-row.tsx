import { TableFormatColumn, BaseTableProps } from './use-table.type';
import { KeygenResult } from '../../common/type';
import { isObject, isFunc } from '../../utils/is';
import { useMemo, useState, useRef } from 'react';
import { usePersistFn } from '../../common/use-persist-fn';

export interface TableRowProps extends Pick<BaseTableProps<any>, 'data'> {
  columns: TableFormatColumn<any>[];
  currentIndex: number;
  hover: boolean;
  originData?: any[];
  rowSpanIndexArray?: number[];
}

export interface Row {
  index: number;
  data: any;
  expandKeys?: KeygenResult[];
  colSpan: number;
  rowSpan: number;
  content?: React.ReactNode;
  isLastFixed?: boolean;
  isFirstFixed?: boolean;
}

// handle rowSpan colSpan
function format<DataItem>(
  columns: TableFormatColumn<any>[],
  data: DataItem,
  nextRow: (Row | null)[],
  index: number,
) {
  const row = columns.map((col, i) => {
    const cell = { index, data } as Row;
    cell.colSpan = typeof col.colSpan === 'function' ? col.colSpan(data, index) : 1;
    if (cell.colSpan < 1) cell.colSpan = 1;

    const { rowSpan } = col;
    if (rowSpan && nextRow && nextRow[i]) {
      if (col.type !== 'checkbox') {
        if (typeof col.render === 'string' && isObject(data)) {
          cell.content = data[col.render] as unknown as React.ReactNode;
        } else if (isFunc(col.render)) {
          cell.content = col.render(data, index) as unknown as React.ReactNode;
        }
      }

      const isEqual =
        nextRow[i] && typeof rowSpan === 'function' && rowSpan(data, nextRow[i]!.data);

      const nextTd = nextRow[i];
      if (isEqual && nextTd && nextTd.colSpan === cell.colSpan) {
        cell.rowSpan = (nextTd.rowSpan || 1) + 1;
        let j = cell.colSpan || 1;
        while (j) {
          j -= 1;
          nextRow[i + j] = null;
        }
      }
    }

    return cell;
  });

  return row;
}

/**
 * - 处理合并行 合并列
 * - 处理合并行和列的 hover 状态
 * - 记录选择行的数据 rowSelectMergeStartData
 */
const useTableRow = (props: TableRowProps) => {
  const { currentIndex } = props;

  const { current: context } = useRef({
    rowSelectMergeStartData: [] as Array<any>,
  });

  const [hoverIndex, setHoverIndex] = useState<Set<number>>(new Set());

  const handleCellHover = usePersistFn((rowIndex: number, colSpan = 1) => {
    if (!props.hover) return;
    const hoverIndex = new Set<number>();
    for (let i = 0; i < colSpan; i++) {
      hoverIndex.add(rowIndex + i);
    }
    setHoverIndex(hoverIndex);
  });


  const rowData = useMemo(() => {
    let rows: Row[][] = [];
    context.rowSelectMergeStartData = [];
    const data = props.data || [];
    const columns = props.columns || [];
    const checkCol = columns.find((col) => col.type === 'checkbox');

    // 计算 rowSelectMergeStartData
    if (checkCol?.rowSpan) {
      // checkbox 列有 rowSpan，需要计算合并起始数据
      if (props.rowSpanIndexArray && props.originData) {
        // 虚拟滚动：使用 rowSpanIndexArray（由 useTableVirtual 预计算）
        const originData = props.originData;
        for (let i = 0; i < data.length; i++) {
          const globalIndex = currentIndex + i;
          const startIndex = props.rowSpanIndexArray[globalIndex];
          context.rowSelectMergeStartData[i] = originData[startIndex] || data[i];
        }
      } else {
        // 非虚拟滚动：基于当前数据计算
        for (let i = 0; i < data.length; i++) {
          const currentData = data[i];
          // 如果当前行还没有被设置起始数据，说明它是一个新的合并组的起始
          if (context.rowSelectMergeStartData[i] === undefined) {
            context.rowSelectMergeStartData[i] = currentData;
          }
          // 检查当前行是否应该和下一行合并
          if (i < data.length - 1 && checkCol.rowSpan(currentData, data[i + 1])) {
            // 下一行应该指向当前行的起始数据
            context.rowSelectMergeStartData[i + 1] = context.rowSelectMergeStartData[i];
          }
        }
      }
    } else {
      // checkbox 列无 rowSpan，每行都是自己的起始数据
      for (let i = 0; i < data.length; i++) {
        context.rowSelectMergeStartData[i] = data[i];
      }
    }

    for (let i = data.length - 1; i >= 0; i--) {
      const d = data[i];
      rows.unshift(
        format(columns, d, rows[0], currentIndex + i).map((col) => {
          delete col.content;
          return col;
        }),
      );
    }
    return rows;
  }, [props.columns, props.data, props.originData, props.rowSpanIndexArray, currentIndex]);

  return {
    rowData,
    handleCellHover,
    hoverIndex,
    rowSelectMergeStartData: context.rowSelectMergeStartData,
  };
};

export default useTableRow;
