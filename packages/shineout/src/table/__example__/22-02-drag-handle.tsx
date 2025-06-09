/**
 * cn - 句柄拖拽
 *    -- 通过 rowEvents 属性来自定义拖拽事件
 * en - handle drag
 *    -- customize drag events through the rowEvents property
 */
import React, { useState, useRef, useCallback } from 'react';
import { Table, TYPE } from 'shineout';
import { createUseStyles } from 'react-jss';

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

const data: TableRowData[] = [
  {
    id: 1,
    firstName: 'Ephraim',
    lastName: 'Wisozk',
    position: 'Marketing Designer',
    start: '2012-01-29',
    time: '01:42',
    salary: 115777,
    country: 'Reunion',
    office: 'Miami',
    office5: 'Istanbul',
    height: 113.74,
  },
  {
    id: 2,
    firstName: 'Osvaldo',
    lastName: 'Beer',
    position: 'Financial Controller',
    start: '2007-09-04',
    time: '03:26',
    salary: 396093,
    country: 'Syrian Arab Republic',
    office: 'San Paulo',
    office5: 'Shenzhen',
    height: 82.13,
  },
  {
    id: 3,
    firstName: 'Dylan',
    lastName: 'Ratke',
    position: 'Development Lead',
    start: '2009-10-16',
    time: '01:45',
    salary: 236064,
    country: 'Peru',
    office: 'Boston',
    office5: 'Delhi',
    height: 179.53,
  },
  {
    id: 4,
    firstName: 'Shaniya',
    lastName: 'Jacobs',
    position: 'Developer',
    start: '2014-06-30',
    time: '02:17',
    salary: 338985,
    country: 'Peru',
    office: 'Chengdu',
    office5: 'Dallas-Fort Worth',
    height: 190.11,
  },
];

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

const findNearestDOM = (el: HTMLElement, tagName: string) => {
  let node: any = el;
  while (node.tagName !== tagName && node.tagName !== 'BODY') {
    node = node.parentNode;
  }
  return node;
};
const findIndex = (el: HTMLElement) => {
  const tbody = findNearestDOM(el, 'TBODY');
  const nodes = Array.prototype.slice.call(tbody.children);

  return nodes.indexOf(el);
};

const App: React.FC = () => {
  const [d, setD] = useState(data);
  const classes = useStyles();
  const [target, setTarget] = useState<number | null>();
  const ref = useRef<{
    startIndex?: number;
    dragging?: boolean;
    current: { dragging?: boolean; startIndex?: number };
  }>({ current: {} });

  const dragStartHandler = useCallback((e: React.DragEvent) => {
    if (!canDrag) {
      e.preventDefault();
      return;
    }
    if (ref.current.dragging) return;
    ref.current.dragging = true;
    ref.current.startIndex = findIndex(e.target as HTMLElement);
  }, []);

  const dragEnterHandler = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    if (!ref.current.dragging) return;
    const tr = findNearestDOM(e.target as HTMLElement, 'TR');
    const index = findIndex(tr);
    setTarget(index);
  }, []);

  const dragOverHandler = useCallback((e: React.DragEvent) => {
    e.preventDefault();
  }, []);

  const dragEndHandler = useCallback(() => {
    if (!ref.current.dragging) return;
    ref.current.dragging = false;
    setTarget(null);
  }, []);

  const dropHandler = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      if (!ref.current.dragging) return;
      const tr = findNearestDOM(e.target as HTMLTableRowElement, 'TR');
      const start = ref.current.startIndex;
      const end = findIndex(tr);
      if (start === end) return;
      const source = d[start!];
      const r = [...d];
      console.log(start, end);
      r.splice(start!, 1);
      r.splice(end, 0, source);
      setD(r);
    },
    [d],
  );

  return (
    <Table
      data={d}
      keygen='id'
      cellSelectable
      columns={columns}
      rowClassName={(_row, index) => `${index === target ? classes.exampleDragIn : ''}`}
      rowEvents={{
        draggable: true,
        onDrop: dropHandler,
        onDragEnd: dragEndHandler,
        onDragOver: dragOverHandler,
        onDragStart: dragStartHandler,
        onDragEnter: dragEnterHandler,
      }}
    />
  );
};

export default App;
