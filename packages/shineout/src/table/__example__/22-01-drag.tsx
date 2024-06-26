/**
 * cn - 拖动行
 *    -- 通过 rowEvents 属性来自定义拖拽事件
 * en - drag row
 *    -- customize drag events through the rowEvents property
 */
import React, { useState, useRef, useCallback } from 'react';
import { Table, TYPE } from 'shineout';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles(
  {
    exampleDragable: {
      cursor: 'move',
    },
    exampleDragIn: {
      '& td': {
        borderBottom: '2px dashed #197AFA !important',
      },
    },
  },
  { name: 'table-example-drag' },
);

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
    if (!ref.current.dragging) return;
    e.preventDefault();
  }, []);

  const dragEndHandler = useCallback((e: React.DragEvent) => {
    if (!ref.current.dragging) return;
    ref.current.dragging = false;
    setTarget(null);
  }, []);

  const dropHandler = useCallback(
    (e: React.DragEvent) => {
      if (!ref.current.dragging) return;
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
      rowClassName={(_row, index) =>
        `${index === target ? classes.exampleDragIn : ''} ${classes.exampleDragable}`
      }
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
