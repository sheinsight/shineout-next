import React from 'react';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Table, Button, TYPE } from 'shineout';

import {
  attributesTest,
  baseTest,
  childrenTest,
  classTest,
  createClassName,
  displayTest,
  snapshotTest,
  styleTest,
  textContentTest,
} from '../../tests/utils';
import mountTest from '../../tests/mountTest';
import { classLengthTest } from '../../tests/structureTest';
import TableBase from '../__example__/01-base';
import TableBorder from '../__example__/02-border';
import TableSize from '../__example__/03-size';
import TableGroup from '../__example__/04-group';
// import TableVirtualList from '../__example__/07-01-virtual-list'
// import TableVirtualScroll from '../__example__/07-02-virtual-scroll'
// import TableLoading from '../__example__/08-loading'
// import TableSorter from '../__example__/09-01-sorter'
// import TableSorterRender from '../__example__/09-02-sorter-render'
// import TableSorterWeight from '../__example__/09-03-sorter-weight'
// import TablePaginationCopy from '../__example__/10-01-pagination copy'
// import TablePagination from '../__example__/10-02-pagination'
// import TableScroll from '../__example__/11-scroll'
// import TableColRowSpan from '../__example__/12-col-row-span';

interface TableRowData {
  id: number;
  name: string;
}
type TableColumnItem = TYPE.Table.ColumnItem<TableRowData>;

const SO_PREFIX = 'table';
const originClasses = ['wrapper', 'bodyWrapper', 'emptyWrapper', 'headWrapper', 'footWrapper'];
const originItemClasses = [
  'default',
  'verticalAlignTop',
  'cellIgnoreBorder',
  'bordered',
  'rowStriped',
  'small',
  'cellHover',
];
const {
  wrapper,
  verticalAlignTop,
  default: tableDefault,
  bodyWrapper,
  cellIgnoreBorder,
  emptyWrapper,
  headWrapper,
  footWrapper,
  bordered,
  rowStriped,
  small: tableSmall,
  cellHover,
} = createClassName(SO_PREFIX, originClasses, originItemClasses);

const columns: TableColumnItem[] = [
  {
    title: 'id',
    render: 'id',
    width: 50,
  },
  {
    title: 'Name',
    render: 'name',
    width: 100,
  },
];

const newColumn: TableColumnItem[] = [
  {
    title: 'id',
    render: 'id',
    width: 50,
  },
];

const renderData: TableRowData[] = [
  {
    id: 1,
    name: 'test1',
  },
  {
    id: 2,
    name: 'test2',
  },
];

afterEach(cleanup);
mountTest(<Table keygen={'id'} />);

describe('Table[Base]', () => {
  displayTest(Table as React.FC, 'ShineoutTable');
  baseTest(Table as React.FC, wrapper);
  childrenTest(Table as React.FC, wrapper);
  snapshotTest(<TableBase />);
  snapshotTest(<TableBorder />, 'about border');
  snapshotTest(<TableSize />, 'about size');
  snapshotTest(<TableGroup />, 'about group');
  // snapshotTest(<TableVirtualList />, 'about virtual list');
  // snapshotTest(<TableVirtualScroll />, 'about virtual scroll');
  // snapshotTest(<TableLoading />, 'about loading');
  // snapshotTest(<TableSorter />, 'about sorter');
  // snapshotTest(<TableSorterRender />, 'about sorter render');
  // snapshotTest(<TableSorterWeight />, 'about sorter weight');
  // snapshotTest(<TablePaginationCopy />, 'about pagination copy');
  // snapshotTest(<TablePagination />, 'about pagination');
  // snapshotTest(<TableScroll />, 'about scroll');
  // snapshotTest(<TableColRowSpan />, 'about col row span');
  test('should render when set children is div', () => {
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    const testContent = 'Test Children';
    const children = <div className='test'>{testContent}</div>;
    const { container } = render(<Table keygen={'id'}>{children}</Table>);
    const component = container.querySelector(wrapper);
    expect(component).toBeTruthy();
    expect(component?.querySelectorAll('.test').length).toBe(1);
    expect(component?.querySelector('.test')?.textContent).toBe(testContent);
    expect(
      JSON.stringify(errorSpy.mock.calls).indexOf('Warning: validateDOMNesting(...):'),
    ).toBeTruthy();
  });
  test('should render when set children is td', () => {
    const errorSpyTr = jest.spyOn(console, 'error').mockImplementation(() => {});
    const testTrContent = (
      <tbody>
        <tr>
          <td>test</td>
        </tr>
      </tbody>
    );
    render(<Table keygen={'id'}>{testTrContent}</Table>);
    expect(errorSpyTr).not.toHaveBeenCalledWith();
  });
  test('should render default', () => {
    const { container } = render(<Table keygen={'id'} columns={columns} data={renderData} />);
    const tableWrapper = container.querySelector(wrapper)!;
    classTest(tableWrapper, verticalAlignTop);
    classTest(tableWrapper, tableDefault);
    const tableBody = tableWrapper.querySelector(bodyWrapper)!;
    classLengthTest(tableBody, 'table', 1);
    const colGroup = tableBody.querySelector('colgroup')!;
    classLengthTest(colGroup, 'col', 2);
    // TODO
    colGroup.querySelectorAll('col').forEach((item) => {
      styleTest(item, 'width: 0px;');
    });
    const thead = tableBody.querySelector('thead')!;
    const theadTr = thead.querySelector('tr')!;
    const theadTh = theadTr.querySelectorAll('th');
    expect(theadTh.length).toBe(columns.length);
    expect(theadTh[0].textContent).toBe(columns[0].title);
    expect(theadTh[1].textContent).toBe(columns[1].title);
    attributesTest(theadTh[0], 'rowspan', '1');
    attributesTest(theadTh[1], 'rowspan', '1');
    const tbody = tableBody.querySelector('tbody')!;
    const tbodyTr = tbody.querySelectorAll('tr');
    expect(tbodyTr.length).toBe(renderData.length);
    tbodyTr.forEach((item, index) => {
      const itemTd = item.querySelectorAll('td');
      expect(itemTd.length).toBe(columns.length);
      expect(itemTd[0].textContent).toBe(renderData[index].id.toString());
      expect(itemTd[1].textContent).toBe(renderData[index].name);
      classTest(itemTd[1], cellIgnoreBorder);
      attributesTest(itemTd[0], 'colspan', '1');
      attributesTest(itemTd[1], 'colspan', '1');
    });
    expect(tableWrapper.querySelector('tfoot')).toBeInTheDocument();
  });
  test('should render when set data is empty', () => {
    const { container } = render(<Table keygen={'id'} columns={columns} />);
    const tableWrapper = container.querySelector(wrapper)!;
    const tableBody = tableWrapper.querySelector(bodyWrapper)!;
    styleTest(tableBody, 'height: 100%;');
    expect(tableBody.querySelector(emptyWrapper)).toBeInTheDocument();
  });
  test('should render when set data is empty and set height', () => {
    const { container } = render(<Table keygen={'id'} columns={columns} height={300} />);
    const tableWrapper = container.querySelector(wrapper)!;
    styleTest(tableWrapper, 'height: 300px;');
    const tableHead = tableWrapper.querySelector(headWrapper)!;
    const tableBody = tableWrapper.querySelector(bodyWrapper)!;
    const tableFoot = tableWrapper.querySelector(footWrapper)!;
    styleTest(tableBody, 'height: 100%;');
    classLengthTest(tableHead.querySelector('colgroup')!, 'col', 2);
    classLengthTest(tableBody.querySelector('colgroup')!, 'col', 2);
    classLengthTest(tableFoot.querySelector('colgroup')!, 'col', 2);
  });
  test('should render when set column of data is more than column of columns', () => {
    const { container } = render(<Table keygen={'id'} columns={newColumn} data={renderData} />);
    const tableWrapper = container.querySelector(wrapper)!;
    const thead = tableWrapper.querySelector('thead')!;
    const tbody = tableWrapper.querySelector('tbody')!;
    classLengthTest(thead, 'th', 1);
    tbody.querySelectorAll('tr').forEach((item, index) => {
      classLengthTest(item, 'td', 1);
      textContentTest(
        item.querySelector('td')!,
        renderData[index][newColumn[0].render as keyof TableRowData].toString(),
      );
    });
  });
  test('should render when set column of columns is more than column of data', () => {
    const tempData: { [key: string]: number }[] = [
      {
        id: 1,
      },
      {
        id: 2,
      },
    ];
    // will occur ts error when set column of columns is more than column of data
    // @ts-ignore
    const { container } = render(<Table keygen={'id'} columns={columns} data={tempData} />);
    const tableWrapper = container.querySelector(wrapper)!;
    const thead = tableWrapper.querySelector('thead')!;
    const tbody = tableWrapper.querySelector('tbody')!;
    classLengthTest(thead, 'th', 2);
    tbody.querySelectorAll('tr').forEach((item, index) => {
      classLengthTest(item, 'td', 2);
      textContentTest(
        item.querySelectorAll('td')[0],
        tempData[index][newColumn[0].render as string].toString(),
      );
      textContentTest(item.querySelectorAll('td')[1], '');
    });
  });
  test('should render when set colums is different from data', () => {
    const tempData: { [key: string]: number }[] = [
      {
        id: 1,
        uid: 1,
      },
      {
        id: 2,
        uid: 2,
      },
    ];
    // will occur ts error when set colums is different from data
    // @ts-ignore
    const { container } = render(<Table keygen={'id'} columns={columns} data={tempData} />);
    const tableWrapper = container.querySelector(wrapper)!;
    const thead = tableWrapper.querySelector('thead')!;
    const tbody = tableWrapper.querySelector('tbody')!;
    classLengthTest(thead, 'th', 2);
    tbody.querySelectorAll('tr').forEach((item, index) => {
      classLengthTest(item, 'td', 2);
      textContentTest(
        item.querySelectorAll('td')[0],
        tempData[index][newColumn[0].render as string].toString(),
      );
      textContentTest(item.querySelectorAll('td')[1], '');
    });
  });
  test('should render when set columns is variable', () => {
    const TableByColumns = () => {
      const [column, setColumn] = React.useState<TableColumnItem[]>(columns);
      return (
        <div>
          <Button
            onClick={() => {
              setColumn(newColumn);
            }}
          >
            setColumn
          </Button>
          <Table keygen={'id'} columns={column} />
        </div>
      );
    };
    const { container } = render(<TableByColumns />);
    const thead = container.querySelector('thead')!;
    const theadTr = thead.querySelector('tr')!;
    const theadTh = theadTr.querySelectorAll('th');
    expect(theadTh.length).toBe(columns.length);
    expect(theadTh[0].textContent).toBe(columns[0].title);
    expect(theadTh[1].textContent).toBe(columns[1].title);
    fireEvent.click(container.querySelector('button')!);
    expect(theadTr.querySelectorAll('th').length).toBe(newColumn.length);
    expect(theadTr.querySelectorAll('th')[0].textContent).toBe(newColumn[0].title);
  });
  test('should render when set empty', () => {
    const emptyText = 'empty';
    const { container } = render(
      <Table keygen={'id'} columns={columns} data={[]} empty={emptyText} />,
    );
    const tableWrapper = container.querySelector(wrapper)!;
    const tableBody = tableWrapper.querySelector(bodyWrapper)!;
    textContentTest(tableBody.querySelector(emptyWrapper)!, emptyText);
  });
  test('should render when set hideHeader', () => {
    const { container } = render(
      <Table keygen={'id'} columns={columns} data={renderData} hideHeader />,
    );
    expect(container.querySelector('thead')).not.toBeInTheDocument();
  });
  test('should render when set hover', () => {
    const { container, rerender } = render(
      <Table keygen={'id'} columns={columns} data={renderData} />,
    );
    const tableWrapper = container.querySelector(wrapper)!;
    const tbody = tableWrapper.querySelector('tbody')!;
    const trs = tbody.querySelectorAll('tr');
    fireEvent.mouseEnter(trs[0].querySelectorAll('td')[0]);
    trs[0].querySelectorAll('td').forEach((item) => {
      classTest(item, cellHover);
    });
    fireEvent.mouseLeave(trs[0].querySelectorAll('td')[0]);
    rerender(<Table keygen={'id'} columns={columns} data={renderData} hover={false} />);
    fireEvent.mouseEnter(trs[0].querySelectorAll('td')[0]);
    trs[0].querySelectorAll('td').forEach((item) => {
      classTest(item, cellHover, false);
    });
  });
});

describe('Table[Bordered/Striped/Size]', () => {
  test('should render when set bordered', () => {
    const { container } = render(
      <Table keygen={'id'} bordered columns={columns} data={renderData} />,
    );
    const tableWrapper = container.querySelector(wrapper)!;
    classTest(tableWrapper, bordered);
  });
  test('should render when set striped', () => {
    const { container } = render(
      <Table keygen={'id'} striped columns={columns} data={renderData} />,
    );
    const tableWrapper = container.querySelector(wrapper)!;
    const tbody = tableWrapper.querySelector('tbody')!;
    const trs = tbody.querySelectorAll('tr');
    trs.forEach((item, index) => {
      if (index % 2 === 1) {
        classTest(item, rowStriped);
      }
    });
  });
  test('should render when set size is small', () => {
    const { container } = render(
      <Table keygen={'id'} size={'small'} columns={columns} data={renderData} />,
    );
    const tableWrapper = container.querySelector(wrapper)!;
    classTest(tableWrapper, tableSmall);
  });
});
describe('Table[Event]', () => {
  test('should render when set onRowClick', () => {
    const rowClickFn = jest.fn();
    const { container } = render(
      <Table keygen={'id'} columns={columns} data={renderData} onRowClick={rowClickFn} />,
    );
    screen.debug();
    const tableWrapper = container.querySelector(wrapper)!;
    const tbody = tableWrapper.querySelector('tbody')!;
    const trs = tbody.querySelectorAll('tr');
    fireEvent.click(trs[0]);
    expect(rowClickFn.mock.calls.length).toBe(1);
  });
});
