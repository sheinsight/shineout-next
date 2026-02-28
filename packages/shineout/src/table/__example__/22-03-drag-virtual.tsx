/**
 * cn - 虚拟列表拖拽
 *    -- 演示了在虚拟列表中进行拖拽的例子，拖拽过程中会自动滚动以便于拖动到不可见区域
 *    -- rowEvents 中的事件回调签名为 (event, rowData, rowIndex)，可直接获取行数据和真实索引
 * en - virtual list drag
 *    -- demonstrate drag and drop in a virtual list, with auto-scrolling to facilitate dragging to invisible areas
 *    -- event callbacks in rowEvents have the signature (event, rowData, rowIndex) for direct access to row data and index
 */
import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Table, TYPE } from 'shineout';
import { createUseStyles } from 'react-jss';
import { user } from '@sheinx/mock';

const useStyles = createUseStyles(
  {
    exampleDragIn: {
      '& td': {
        borderBottom: '2px dashed #197AFA !important',
      },
    },
  },
  { name: 'table-example-drag' },
);

let canDrag = false;

interface TableRowData {
  id: number;
  time: string;
  start: string;
  height: number;
  salary: number;
  office: string;
  country: string;
  office5: string;
  position: string;
  lastName: string;
  firstName: string;
}

type TableColumnItem = TYPE.Table.ColumnItem<TableRowData>;
type TableRef = TYPE.Table.TableRef;

const initData: TableRowData[] = user.fetchSync(100);

const columns: TableColumnItem[] = [
  {
    title: '',
    render: () => {
      return (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            minHeight: '14px',
          }}
        >
          <span
            style={{ cursor: 'move', height: '14px', lineHeight: 1 }}
            onMouseEnter={() => {
              canDrag = true;
            }}
            onMouseLeave={() => {
              canDrag = false;
            }}
          >
            <svg viewBox="0 0 24 24" width="14px" height="14px">
              <path fill='#B3B7C1' d="M16.002 18C17.1065 18 18.002 18.8954 18.002 20C18.002 21.1046 17.1065 22 16.002 22C14.8974 22 14.002 21.1046 14.002 20C14.002 18.8954 14.8974 18 16.002 18ZM8.00195 18C9.10652 18 10.002 18.8954 10.002 20C10.002 21.1046 9.10652 22 8.00195 22C6.89738 22 6.00195 21.1046 6.00195 20C6.00195 18.8954 6.89738 18 8.00195 18ZM16.002 10C17.1065 10 18.002 10.8954 18.002 12C18.002 13.1046 17.1065 14 16.002 14C14.8974 14 14.002 13.1046 14.002 12C14.002 10.8954 14.8974 10 16.002 10ZM8.00195 10C9.10652 10 10.002 10.8954 10.002 12C10.002 13.1046 9.10652 14 8.00195 14C6.89738 14 6.00195 13.1046 6.00195 12C6.00195 10.8954 6.89738 10 8.00195 10ZM16.002 2C17.1065 2 18.002 2.89543 18.002 4C18.002 5.10457 17.1065 6 16.002 6C14.8974 6 14.002 5.10457 14.002 4C14.002 2.89543 14.8974 2 16.002 2ZM8.00195 2C9.10652 2 10.002 2.89543 10.002 4C10.002 5.10457 9.10652 6 8.00195 6C6.89738 6 6.00195 5.10457 6.00195 4C6.00195 2.89543 6.89738 2 8.00195 2Z"></path>
            </svg>
          </span>
        </div>
      );
    },
    width: 40,
  },
  { title: 'id', render: 'id', width: 50 },
  { title: 'Name', render: (d) => `${d.firstName} ${d.lastName}` },
  { title: 'Country', render: 'country' },
  { title: 'Position', render: 'position' },
  { title: 'Office', render: 'office' },
  { title: 'Start Date', render: 'start' },
  {
    title: 'Salary($)',
    align: 'right',
    render: (d) => `${d.salary.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')}`,
  },
];

// 拖拽靠近表格边缘时触发自动滚动的阈值(px)和速度(px/frame)
const EDGE_THRESHOLD = 50;
const SCROLL_SPEED = 8;

const App: React.FC = () => {
  const [tableData, setTableData] = useState(initData);
  const classes = useStyles();
  const [dropTargetIndex, setDropTargetIndex] = useState<number | null>();
  const dragRef = useRef<{ startIndex?: number; dragging?: boolean }>({});
  const scrollTimerRef = useRef<number | null>(null);
  // 通过 tableRef 获取表格实例，包含 scrollContainer 等属性
  const tableInstanceRef = useRef<TableRef>();

  const stopAutoScroll = useCallback(() => {
    if (scrollTimerRef.current !== null) {
      cancelAnimationFrame(scrollTimerRef.current);
      scrollTimerRef.current = null;
    }
  }, []);

  // 拖拽到表格上下边缘时，自动滚动虚拟列表容器
  const startAutoScroll = useCallback((scrollContainer: HTMLElement, direction: 'up' | 'down') => {
    stopAutoScroll();
    const step = () => {
      scrollContainer.scrollTop += direction === 'up' ? -SCROLL_SPEED : SCROLL_SPEED;
      scrollTimerRef.current = requestAnimationFrame(step);
    };
    scrollTimerRef.current = requestAnimationFrame(step);
  }, [stopAutoScroll]);

  useEffect(() => {
    return () => stopAutoScroll();
  }, [stopAutoScroll]);

  // rowEvents 中的事件回调会自动注入 (event, rowData, rowIndex) 三个参数
  // rowIndex 是数据在完整数组中的真实索引，虚拟列表下也能正确获取
  const handleDragStart = useCallback((e: React.DragEvent, _rowData: TableRowData, rowIndex: number) => {
    if (!canDrag) {
      e.preventDefault();
      return;
    }
    dragRef.current.dragging = true;
    dragRef.current.startIndex = rowIndex;
  }, []);

  const handleDragEnter = useCallback((_e: React.DragEvent, _rowData: TableRowData, rowIndex: number) => {
    if (!dragRef.current.dragging) return;
    setDropTargetIndex(rowIndex);
  }, []);

  // dragOver 中检测鼠标到表格上下边缘的距离，触发自动滚动
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    if (!dragRef.current.dragging) return;

    // 通过 tableRef 暴露的 getScrollContainer 获取滚动容器
    const scrollContainer = tableInstanceRef.current?.getScrollContainer();
    if (!scrollContainer) return;

    const rect = scrollContainer.getBoundingClientRect();
    const y = e.clientY;

    if (y - rect.top < EDGE_THRESHOLD) {
      startAutoScroll(scrollContainer, 'up');
    } else if (rect.bottom - y < EDGE_THRESHOLD) {
      startAutoScroll(scrollContainer, 'down');
    } else {
      stopAutoScroll();
    }
  }, [startAutoScroll, stopAutoScroll]);

  const handleDragEnd = useCallback(() => {
    if (!dragRef.current.dragging) return;
    dragRef.current.dragging = false;
    setDropTargetIndex(null);
    stopAutoScroll();
  }, [stopAutoScroll]);

  const handleDrop = useCallback(
    (_e: React.DragEvent, _rowData: TableRowData, rowIndex: number) => {
      if (!dragRef.current.dragging) return;
      // 虚拟列表中拖拽源行可能被滚出视口后销毁，导致 dragEnd 不触发
      // 因此需要在 drop 中也重置 dragging 状态
      dragRef.current.dragging = false;
      stopAutoScroll();
      const start = dragRef.current.startIndex;
      const end = rowIndex;
      if (start === undefined || start === end) return;
      // 使用函数式更新确保获取最新的数据，避免闭包中引用过期数据
      setTableData((prevData) => {
        const nextData = [...prevData];
        const [source] = nextData.splice(start, 1);
        nextData.splice(end, 0, source);
        return nextData;
      });
      setDropTargetIndex(null);
    },
    [stopAutoScroll],
  );

  return (
    <Table
      data={tableData}
      keygen='id'
      cellSelectable
      columns={columns}
      height={300}
      virtual
      tableRef={(instance) => { tableInstanceRef.current = instance; }}
      rowClassName={(_row, index) => `${index === dropTargetIndex ? classes.exampleDragIn : ''}`}
      rowEvents={{
        draggable: true,
        onDrop: handleDrop,
        onDragEnd: handleDragEnd,
        onDragOver: handleDragOver,
        onDragStart: handleDragStart,
        onDragEnter: handleDragEnter,
      }}
    />
  );
};

export default App;
