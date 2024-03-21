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
            <svg
              width='14'
              height='14'
              viewBox='0 0 24 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M16 17C17.1046 17 18 17.8954 18 19C18 20.1046 17.1046 21 16 21C14.8954 21 14 20.1046 14 19C14 17.8954 14.8954 17 16 17ZM8 17C9.10457 17 10 17.8954 10 19C10 20.1046 9.10457 21 8 21C6.89543 21 6 20.1046 6 19C6 17.8954 6.89543 17 8 17ZM16 10C17.1046 10 18 10.8954 18 12C18 13.1046 17.1046 14 16 14C14.8954 14 14 13.1046 14 12C14 10.8954 14.8954 10 16 10ZM8 10C9.10457 10 10 10.8954 10 12C10 13.1046 9.10457 14 8 14C6.89543 14 6 13.1046 6 12C6 10.8954 6.89543 10 8 10ZM16 3C17.1046 3 18 3.89543 18 5C18 6.10457 17.1046 7 16 7C14.8954 7 14 6.10457 14 5C14 3.89543 14.8954 3 16 3ZM8 3C9.10457 3 10 3.89543 10 5C10 6.10457 9.10457 7 8 7C6.89543 7 6 6.10457 6 5C6 3.89543 6.89543 3 8 3Z'
                fill='#B3B7C1'
              />
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
    const tr = findNearestDOM(e.target as HTMLElement, 'TR');
    const index = findIndex(tr);
    setTarget(index);
  }, []);

  const dragOverHandler = useCallback((e: React.DragEvent) => {
    e.preventDefault();
  }, []);

  const dragEndHandler = useCallback((e: React.DragEvent) => {
    console.log('dragEnd', e.target);
    ref.current.dragging = false;
    setTarget(null);
  }, []);

  const dropHandler = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
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
