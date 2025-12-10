import React from 'react';
import { cleanup, fireEvent, render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Table, Button, TYPE, Form, Input } from 'shineout';

import {
  attributesTest,
  // baseTest,
  childrenTest,
  classTest,
  createClassName,
  delay,
  displayTest,
  snapshotTest,
  styleContentTest,
  styleTest,
  textContentTest,
} from '../../tests/utils';
import mountTest from '../../tests/mountTest';
import { classLengthTest } from '../../tests/structureTest';
import TableBase from '../__example__/01-base';
import TableBorder from '../__example__/02-border';
import TableSize from '../__example__/03-size';
import TableGroup from '../__example__/04-group';
// import TableBottomScrollbar from '../__example__/06-bottom-scrollbar';

// import TableVirtualList from '../__example__/07-01-virtual-list'
// import TableVirtualScroll from '../__example__/07-02-virtual-scroll'
// import TableLoading from '../__example__/08-loading'
// import TableSorter from '../__example__/09-01-sorter'
// import TableSorterRender from '../__example__/09-02-sorter-render'
import TableSorterWeight from '../__example__/09-03-sorter-weight';
import TableColumnFilter from '../__example__/09-001-filter-column';
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
const originClasses = [
  'wrapper',
  'bodyWrapper',
  'emptyWrapper',
  'headWrapper',
  'footWrapper',
  'iconWrapper',
  'expandWrapper',
  'hasSorter',
  'sorterContainer',
  'sorterAsc',
  'sorterDesc',
  'resizeSpanner',
  'expandIcon',
  'filterIconContainer',
  'filterIcon',
  'mirrorScroller',
];
const originItemClasses = [
  'default',
  'verticalAlignTop',
  'cellIgnoreBorder',
  'bordered',
  'rowStriped',
  'small',
  'cellHover',
  'verticalAlignMiddle',
  'rowExpand',
  'rowChecked',
  'sorterActive',
  'cellFixedLeft',
  'cellFixedLast',
  'cellFixedRight',
];
const {
  wrapper,
  verticalAlignTop,
  default: tableDefault,
  bodyWrapper,
  cellIgnoreBorder,
  emptyWrapper,
  headWrapper,
  // footWrapper,
  bordered,
  rowStriped,
  small: tableSmall,
  cellHover,
  // rowHover,
  verticalAlignMiddle,
  iconWrapper,
  rowExpand,
  expandWrapper,
  rowChecked,
  hasSorter,
  sorterContainer,
  sorterAsc,
  sorterDesc,
  sorterActive,
  resizeSpanner,
  cellFixedLeft,
  cellFixedLast,
  cellFixedRight,
  expandIcon,
  filterIconContainer,
  mirrorScroller,
} = createClassName(SO_PREFIX, originClasses, originItemClasses);

const {
  wrapper: checkbox,
  wrapperChecked,
  wrapperDisabled,
} = createClassName('checkbox', ['wrapper'], ['wrapperChecked', 'wrapperDisabled']);

const { wrapper: radio, wrapperChecked: radioWrapperChecked } = createClassName(
  'radio',
  ['wrapper'],
  ['wrapperChecked'],
);

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

interface ExpandTreeData {
  id: number;
  name: string;
  children?: ExpandTreeData[];
}

const expandColumns: TYPE.Table.ColumnItem<ExpandTreeData>[] = [
  {
    type: 'row-expand',
    treeColumnsName: 'children',
    render: (d: any) => {
      if (d.salary < 300000) return undefined;
      return () => (
        <div style={{ padding: '10px 30px', wordBreak: 'break-all' }}>{JSON.stringify(d)}</div>
      );
    },
  },
  ...columns,
];

const treeColumns: any[] = [
  {
    title: 'id',
    render: 'id',
    width: 50,
    treeColumnsName: 'children',
  },
  ...columns,
];

const expandTreeData: ExpandTreeData[] = [
  {
    id: 1,
    name: 'test1',
    children: [
      {
        id: 2,
        name: 'test2',
        children: [
          {
            id: 3,
            name: 'test3',
          },
        ],
      },
    ],
  },
];

const fixedColumns: any[] = [
  {
    title: 'id',
    render: 'id',
  },
  {
    title: 'name',
    render: 'name',
    fixed: 'left',
  },
  {
    title: 'age',
    render: 'age',
  },
];
const fixedColumnsByRight: any[] = [
  {
    title: 'id',
    render: 'id',
  },
  {
    title: 'name',
    render: 'name',
  },
  {
    title: 'age',
    render: 'age',
    fixed: 'right',
  },
];
const fixedData = [
  {
    id: 1,
    name: 'test1',
    age: 1,
  },
  {
    id: 2,
    name: 'test2',
    age: 2,
  },
  {
    id: 3,
    name: 'test3',
    age: 3,
  },
];

const dataGenerate = (sum: number = 20) => {
  const data: TableRowData[] = [];
  for (let i = 1; i <= sum; i++) {
    data.push({
      id: i,
      name: `test${i}`,
    });
  }
  return data;
};

const renderData: TableRowData[] = dataGenerate(2);
const renderDataMore: TableRowData[] = dataGenerate(3);

afterEach(cleanup);
mountTest(<Table keygen={'id'} />);

describe('Table[Base]', () => {
  displayTest(Table as React.FC, 'ShineoutTable');
  // baseTest(Table as React.FC, wrapper);
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
  test('should render when set style and className', () => {
    const { container } = render(
      <Table keygen={'id'} style={{ color: 'red' }} className='test' columns={columns} />,
    );
    const tableWrapper = container.querySelector(wrapper)!;
    styleContentTest(tableWrapper, 'color: red;');
    classTest(tableWrapper, 'test');
  })
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
  test('should render default', async () => {
    const { container } = render(<Table keygen={'id'} columns={columns} data={renderData} />);

    const tableWrapper = container.querySelector(wrapper)!;
    classTest(tableWrapper, verticalAlignTop);
    classTest(tableWrapper, tableDefault);
    const tableBody = tableWrapper.querySelector(bodyWrapper)!;
    classLengthTest(tableBody, 'table', 1);
    const colGroup = tableBody.querySelector('colgroup')!;
    classLengthTest(colGroup, 'col', 2);

    await waitFor(async () => {
      await delay(200)
    })

    colGroup.querySelectorAll('col').forEach((item, index) => {
      styleTest(item, `width: ${columns[index].width}px;`);
      // styleTest(item, 'width: 0px;');
    });
    const thead = tableBody.querySelector('thead')!;
    const theadTr = thead.querySelector('tr')!;
    const theadTh = theadTr.querySelectorAll('th');
    expect(theadTh.length).toBe(columns.length);
    expect(theadTh[0].textContent).toBe(columns[0].title);
    expect(theadTh[1].textContent).toBe(columns[1].title);
    attributesTest(theadTh[0], 'rowspan', '1');
    attributesTest(theadTh[1], 'rowspan', '1');
    // const tableBody = tableHeader.nextElementSibling!
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
  });
  test('should render when set data is empty', () => {
    const { container } = render(<Table keygen={'id'} columns={columns} />);
    const tableWrapper = container.querySelector(wrapper)!;
    expect(tableWrapper.querySelector(emptyWrapper)).toBeInTheDocument();
  });
  test('should render when set data is empty and set height', () => {
    const { container } = render(<Table keygen={'id'} columns={columns} height={300} />);
    const tableWrapper = container.querySelector(wrapper)!;
    expect(tableWrapper.querySelector(emptyWrapper)).toBeInTheDocument();
    styleTest(tableWrapper, 'height: 300px;');
    const tableHead = tableWrapper.querySelector(headWrapper)!;
    classLengthTest(tableHead.querySelector('colgroup')!, 'col', 2);
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
    textContentTest(tableWrapper.querySelector(emptyWrapper)!, emptyText);
  });
  test('should render when set hideHeader', () => {
    const { container } = render(
      <Table keygen={'id'} columns={columns} data={renderData} hideHeader />,
    );
    expect(container.querySelector('thead')).not.toBeInTheDocument();
  });

  test('should render when set hover in col span', () => {
    const data = [
      {
        id: 1,
        name: 'name1',
      },
      {
        id: 2,
        name: 'name1',
      },
      {
        id: 3,
        name: 'name2',
      },
    ]
    const columns: TableColumnItem[] = [
      {
        title: 'ID',
        render: 'id',
      },
      {
        title: 'Name',
        render: 'name',
        rowSpan: (a, b) => a.name === b.name,
      },
    ]
    const { container, rerender } = render(
      <Table keygen={'id'} columns={columns} data={data} />,
    );
    const tableWrapper = container.querySelector(wrapper)!;
    const tbody = tableWrapper.querySelector('tbody')!;
    const trs = tbody.querySelectorAll('tr');
    fireEvent.mouseEnter(trs[1].querySelectorAll('td')[0]);
    trs[1].querySelectorAll('td').forEach((item, index) => {
      if(index === 1){
        classTest(item, cellHover, false);
      }
    });
    fireEvent.mouseLeave(trs[1].querySelectorAll('td')[0]);
    rerender(<Table keygen={'id'} columns={columns} data={renderData} hover={false} />);
    fireEvent.mouseEnter(trs[1].querySelectorAll('td')[0]);
    trs[1].querySelectorAll('td').forEach((item) => {
      classTest(item, cellHover, false);
    });
  });

  test('should render when set width', () => {
    const tableWidth = 1000;
    const { container } = render(
      <Table keygen={'id'} columns={columns} data={renderData} width={tableWidth} />,
    );
    const tableWrapper = container.querySelector(wrapper)!;
    styleContentTest(tableWrapper.querySelector('table')!, `width: ${tableWidth}px;`);
  });
  test('should render when set cellSelectable', () => {
    const { container } = render(
      <Table keygen={'id'} columns={columns} data={renderData} cellSelectable />,
    );
    const tableWrapper = container.querySelector(wrapper)!;
    const tbody = tableWrapper.querySelector('tbody')!;
    const trs = tbody.querySelectorAll('tr');
    const firstTd = trs[1].querySelectorAll('td')[1];
    const secondTd = trs[0].querySelectorAll('td')[1];
    fireEvent.keyDown(document, { key: 'c', ctrlKey: true });
    fireEvent.mouseDown(firstTd, { ctrlKey: true });
    fireEvent.mouseUp(firstTd, { ctrlKey: true });
    attributesTest(firstTd, 'data-soui-table-selection', 'true');
    attributesTest(document.querySelector('body')!, 'data-soui-table-selection', 'true');
    fireEvent.mouseDown(secondTd, { ctrlKey: true });
    fireEvent.mouseUp(secondTd, { ctrlKey: true });
    attributesTest(secondTd, 'data-soui-table-selection', 'true');
    fireEvent.click(secondTd);
    expect(secondTd.hasAttribute('data-soui-table-selection')).toBeFalsy();
    expect(firstTd.hasAttribute('data-soui-table-selection')).toBeFalsy();
  });
  test('should render when set cellSelectable and move', () => {
    const { container } = render(
      <Table keygen='id' cellSelectable columns={columns} data={renderDataMore} />,
    );
    const tableWrapper = container.querySelector(wrapper)!;
    const tbody = tableWrapper.querySelector('tbody')!;
    const trs = tbody.querySelectorAll('tr');
    const firstCell = trs[0].querySelectorAll('td')[0]!;
    const lastCell = trs[0].querySelector('td:last-child')!;

    fireEvent.keyDown(document, { key: 'c', ctrlKey: true });
    fireEvent.mouseDown(firstCell, { ctrlKey: true });
    fireEvent.mouseMove(lastCell, { ctrlKey: true });
    fireEvent.mouseUp(lastCell, { ctrlKey: true });

    trs[0].querySelectorAll('td').forEach((item) => {
      attributesTest(item, 'data-soui-table-selection', 'true');
    });
  });
  test('should render when set cellSelectable and copy', () => {
    Object.defineProperty(document, 'execCommand', {
      value: jest.fn(),
    });
    const { container } = render(
      <Table keygen={'id'} cellSelectable columns={columns} data={renderData} />,
    );
    const tableWrapper = container.querySelector(wrapper)!;
    const tbody = tableWrapper.querySelector('tbody')!;
    const trs = tbody.querySelectorAll('tr');
    const firstTd = trs[1].querySelectorAll('td')[1];
    // fireEvent.keyDown(document, { key: 'c', ctrlKey: true });
    fireEvent.mouseDown(firstTd, { ctrlKey: true });
    fireEvent.mouseUp(firstTd, { ctrlKey: true });
    // Create a new event
    const event = new KeyboardEvent('keydown', {
      ctrlKey: true,
      keyCode: 67,
    });
    document.dispatchEvent(event);
    expect(document.execCommand).toHaveBeenCalledWith('copy');
  });
  test('should render when set verticalAlign', () => {
    const { container } = render(
      <Table keygen={'id'} columns={columns} data={renderData} verticalAlign={'middle'} />,
    );
    const tableWrapper = container.querySelector(wrapper)!;
    classTest(tableWrapper, verticalAlignMiddle);
  });
  test('should render when set rowClassName', () => {
    const rowClassName = () => 'test';
    const { container } = render(
      <Table keygen={'id'} columns={columns} data={renderData} rowClassName={rowClassName} />,
    );
    const tableWrapper = container.querySelector(wrapper)!;
    const tbody = tableWrapper.querySelector('tbody')!;
    const trs = tbody.querySelectorAll('tr');
    trs.forEach((item: any) => {
      classTest(item, rowClassName());
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
    const tableWrapper = container.querySelector(wrapper)!;
    const tbody = tableWrapper.querySelector('tbody')!;
    const trs = tbody.querySelectorAll('tr');
    fireEvent.click(trs[0]);
    expect(rowClickFn.mock.calls.length).toBe(1);
  });
  test('should render when set rowClickAttr', () => {
    const rowClickFn = jest.fn();
    const columnsByOperation = [
      ...columns,
      {
        title: 'Operation',
        render: () => (
          <span>
            <Button data-info size='small'>
              <span data-info>info</span>
            </Button>
          </span>
        ),
      },
    ];
    const { container } = render(
      <Table
        keygen={'id'}
        columns={columnsByOperation}
        data={renderData}
        rowClickAttr={['data-info']}
        onRowClick={rowClickFn}
      />,
    );
    const tableWrapper = container.querySelector(wrapper)!;
    const tbody = tableWrapper.querySelector('tbody')!;
    const trs = tbody.querySelectorAll('tr');
    fireEvent.click(trs[0]);
    expect(rowClickFn.mock.calls.length).toBe(0);
    fireEvent.click(trs[0].querySelector('button')!);
    expect(rowClickFn.mock.calls.length).toBe(1);
  });
  test('should render when set onScroll', () => {
    const scrollFn = jest.fn();
    const { container } = render(
      <Table keygen={'id'} columns={columns} data={renderData} onScroll={scrollFn} />,
    );

    const tableWrapper = container.querySelector(bodyWrapper)!;
    fireEvent.scroll(tableWrapper, { target: { scrollY: 100 } });
    expect(scrollFn.mock.calls.length).toBe(1);
  });
});
describe('Table[DataChangeResize]', () => {
  // testing-library can`t get component instance, so can`t test variety of state
  test('should render when set dataChangeResize', () => {
    const changeValue = 'Hello';
    const tempData = [...renderData];
    const ResizeRender = () => {
      const [data, setData] = React.useState<TableRowData[]>(tempData);
      const handleClick = () => {
        tempData[0].name = changeValue;
        setData([...tempData]);
      };
      return (
        <div>
          <Button onClick={handleClick}>change</Button>
          <Table keygen={'id'} columns={columns} data={data} dataChangeResize />
        </div>
      );
    };
    const { container } = render(<ResizeRender />);
    const tableWrapper = container.querySelector(wrapper)!;
    const tbody = tableWrapper.querySelector('tbody')!;
    textContentTest(tbody.querySelectorAll('tr')[0].querySelectorAll('td')[1], tempData[0].name);
    fireEvent.click(container.querySelector('button')!);
    textContentTest(tbody.querySelectorAll('tr')[0].querySelectorAll('td')[1], changeValue);
  });
});
describe('Table[Expand]', () => {
  const getExpandKeys = (tree: any, defaultExpand: number[], result: number[] = []) => {
    if (tree) {
      tree.forEach((i: any) => {
        result.push(i.id);
        if (defaultExpand.includes(i.id) && i.children) {
          getExpandKeys(i.children, defaultExpand, result);
        }
      });
    }
    return result;
  };

  test('should render when set expand', () => {
    const { container } = render(<Table keygen={'id'} columns={expandColumns} data={renderData} />);
    const tableWrapper = container.querySelector(wrapper)!;
    const tbody = tableWrapper.querySelector('tbody')!;
    const trs = tbody.querySelectorAll('tr');
    expect(trs.length).toBe(2);
    trs.forEach((item) => {
      classLengthTest(item, 'td', 3);
      classLengthTest(item, iconWrapper, 1);
    });
    fireEvent.click(trs[0].querySelector(iconWrapper)!);
    const newTrs = tbody.querySelectorAll('tr');
    expect(newTrs.length).toBe(3);
    classTest(newTrs[1], rowExpand);
    attributesTest(newTrs[1].querySelector('td')!, 'colSpan', '3');
    textContentTest(newTrs[1].querySelector('td')!, JSON.stringify(renderData[0]));
    fireEvent.click(trs[0].querySelector(iconWrapper)!);
    expect(tbody.querySelectorAll('tr').length).toBe(2);
  });
  test('should render when set expandKeys', () => {
    const expandKeys = [1];
    const { container } = render(
      <Table keygen={'id'} columns={expandColumns} data={renderData} expandKeys={expandKeys} />,
    );
    const tableWrapper = container.querySelector(wrapper)!;
    const tbody = tableWrapper.querySelector('tbody')!;
    const trs = tbody.querySelectorAll('tr');
    expect(trs.length).toBe(renderData.length + expandKeys.length);
    fireEvent.click(trs[0].querySelector(iconWrapper)!);
    expect(tbody.querySelectorAll('tr').length).toBe(renderData.length + expandKeys.length);
  });
  test('should render when set expandKeys is controlled', () => {
    const beforeExpandKeys = [1];
    const afterExpandKeys = [1, 2];
    const ExpandKeysCont = () => {
      const [expandKeys, setExpandKeys] = React.useState<number[]>(beforeExpandKeys);
      return (
        <div>
          <Button
            onClick={() => {
              setExpandKeys(afterExpandKeys);
            }}
          >
            setExpandKeys
          </Button>
          <Table keygen={'id'} columns={expandColumns} data={renderData} expandKeys={expandKeys} />
        </div>
      );
    };
    const { container } = render(<ExpandKeysCont />);
    const tableWrapper = container.querySelector(wrapper)!;
    const tbody = tableWrapper.querySelector('tbody')!;
    const trs = tbody.querySelectorAll('tr');
    expect(trs.length).toBe(renderData.length + beforeExpandKeys.length);
    fireEvent.click(container.querySelector('button')!);
    expect(tbody.querySelectorAll('tr').length).toBe(renderData.length + afterExpandKeys.length);
  });
  test('should render when set defaultTreeExpandKeys is not nested arrays', () => {
    const defaultTreeExpandKeys = [1];
    const { container } = render(
      <Table
        keygen={'id'}
        columns={expandColumns}
        data={renderData}
        defaultTreeExpandKeys={defaultTreeExpandKeys}
      />,
    );
    const result = getExpandKeys(renderData, defaultTreeExpandKeys);
    const tableWrapper = container.querySelector(wrapper)!;
    const tbody = tableWrapper.querySelector('tbody')!;
    const trs = tbody.querySelectorAll('tr');
    expect(trs.length).toBe(result.length);
  });
  test('should render when set defaultTreeExpandKeys is nested arrays', () => {
    const defaultTreeExpandKeys = [1, 2];
    const { container } = render(
      <Table
        keygen={'id'}
        columns={expandColumns}
        data={expandTreeData}
        defaultTreeExpandKeys={defaultTreeExpandKeys}
      />,
    );
    const result = getExpandKeys(expandTreeData, defaultTreeExpandKeys);
    const tableWrapper = container.querySelector(wrapper)!;
    const tbody = tableWrapper.querySelector('tbody')!;
    const trs = tbody.querySelectorAll('tr');
    expect(trs.length).toBe(result.length);
  });
  test('should render when click expandIcon', () => {
    const { container } = render(
      <Table keygen={'id'} columns={treeColumns} data={expandTreeData} />,
    );
    const tbody = container.querySelector('tbody')!;
    classLengthTest(tbody, 'tr', 1);
    fireEvent.click(tbody.querySelector(expandIcon)!);
    classLengthTest(tbody, 'tr', 2);
  });
  test('should render when set treeIndent', () => {
    const defaultTreeExpandKeys = [1, 2];
    const treeIndent = 50;
    const expandColumnsWithIndent: TYPE.Table.ColumnItem<ExpandTreeData>[] = [
      {
        title: 'id',
        treeColumnsName: 'children',
        treeIndent: treeIndent,
        render: 'id',
        width: 50,
      },
      {
        title: 'Name',
        render: 'name',
        width: 100,
      },
    ];
    const { container } = render(
      <Table
        keygen={'id'}
        columns={expandColumnsWithIndent}
        data={expandTreeData}
        defaultTreeExpandKeys={defaultTreeExpandKeys}
      />,
    );
    const tableWrapper = container.querySelector(wrapper)!;
    const tbody = tableWrapper.querySelector('tbody')!;
    const trs = tbody.querySelectorAll('tr');
    styleContentTest(trs[1].querySelector(expandWrapper)!, `margin-left: ${treeIndent}px;`);
    styleContentTest(trs[2].querySelector(expandWrapper)!, `margin-left: ${treeIndent * 2}px;`);
  });
  test('should render when set treeExpandKeys and onTreeExpand', () => {
    const App = () => {
      const [treeExpandKeys, setTreeExpandKeys] = React.useState<(number | string)[]>([]);
      const handleTreeExpand: any = (keys: number[]) => {
        setTreeExpandKeys(keys);
      };
      return (
        <Table
          keygen={'id'}
          columns={treeColumns}
          data={expandTreeData}
          treeExpandKeys={treeExpandKeys}
          onTreeExpand={handleTreeExpand}
        />
      );
    };
    const { container } = render(<App />);
    const tableWrapper = container.querySelector(wrapper)!;
    const tbody = tableWrapper.querySelector('tbody')!;
    const trs = tbody.querySelectorAll('tr');
    expect(trs.length).toBe(1);
    fireEvent.click(trs[0].querySelector(expandIcon)!);
    expect(tbody.querySelectorAll('tr').length).toBe(2);
  });
  test('should render when set treeEmptyExpand', () => {
    const { container } = render(
      <Table keygen={'id'} columns={expandColumns} data={renderData} treeEmptyExpand />,
    );
    const tableWrapper = container.querySelector(wrapper)!;
    const tbody = tableWrapper.querySelector('tbody')!;
    const trs = tbody.querySelectorAll('tr');
    trs.forEach((item) => {
      const tds = item.querySelectorAll('td');
      expect(tds.length).toBe(3);
      expect(tds[0].querySelector(iconWrapper)).toBeInTheDocument();
    });
  });
  // TODO: treeCheckAll
});
describe('Table[Checked]', () => {
  test('should render when set onRowSelect', () => {
    const onRowSelectFn = jest.fn();
    const { container } = render(
      <Table keygen={'id'} columns={columns} data={renderData} onRowSelect={onRowSelectFn} />,
    );
    const thead = container.querySelector('thead')!;
    const tbody = container.querySelector('tbody')!;
    const ths = thead
      .querySelector('tr')
      ?.querySelectorAll('th') as NodeListOf<HTMLTableCellElement>;
    const trs = tbody.querySelectorAll('tr');
    expect(ths?.length).toBe(renderData.length + 1);
    trs.forEach((item) => {
      const tds = item.querySelectorAll('td');
      expect(tds.length).toBe(renderData.length + 1);
    });
    fireEvent.click(ths[0].querySelector('input')!);
    classTest(ths[0].querySelector(checkbox)!, wrapperChecked);
    trs.forEach((item) => {
      classTest(item, rowChecked);
      const tds = item.querySelectorAll('td');
      classTest(tds[0].querySelector(checkbox)!, wrapperChecked);
    });
  });
  test('should render when set disabled is boolean', () => {
    const onRowSelectFn = jest.fn();
    const { container } = render(
      <Table
        keygen={'id'}
        columns={columns}
        data={renderData}
        onRowSelect={onRowSelectFn}
        disabled
      />,
    );
    const tbody = container.querySelector('tbody')!;
    const trs = tbody.querySelectorAll('tr');
    trs.forEach((item) => {
      const tds = item.querySelectorAll('td');
      classTest(tds[0].querySelector(checkbox)!, wrapperDisabled);
    });
    fireEvent.click(trs[0].querySelector('input')!);
    expect(onRowSelectFn.mock.calls.length).toBe(0);
  });
  test('should render when set disabled is function', () => {
    const onRowSelectFn = jest.fn();
    const { container } = render(
      <Table
        keygen={'id'}
        columns={columns}
        data={renderData}
        onRowSelect={onRowSelectFn}
        disabled={(d) => d.id === 1}
      />,
    );
    const tbody = container.querySelector('tbody')!;
    const trs = tbody.querySelectorAll('tr');
    trs.forEach((item) => {
      const tds = item.querySelectorAll('td');
      if (tds[1].textContent === '1') {
        classTest(tds[0].querySelector(checkbox)!, wrapperDisabled);
      }
    });
  });

  const TableByValue = (props: any) => {
    const [value, setValue] = React.useState<number[]>([]);
    const handleRowSelect = (keys: number[]) => {
      setValue(keys);
    };
    return (
      <Table
        keygen={'id'}
        columns={columns}
        data={renderData}
        value={value}
        onRowSelect={handleRowSelect}
        {...props}
      />
    );
  };

  test('should render controlled when set value and onRowSelect', () => {
    const { container } = render(<TableByValue />);
    const thead = container.querySelector('thead')!;
    const ths = thead
      .querySelector('tr')
      ?.querySelectorAll('th') as NodeListOf<HTMLTableCellElement>;
    fireEvent.click(ths[0].querySelector('input')!);
    classTest(ths[0].querySelector(checkbox)!, wrapperChecked);
  });

  const FormatTest = ({ format }: any) => {
    const [value, setValue] = React.useState<number[]>([]);
    const handleRowSelect = (keys: number[]) => {
      setValue(keys);
    };
    return (
      <div>
        <Table
          keygen={'id'}
          columns={columns}
          data={renderData}
          value={value}
          onRowSelect={handleRowSelect}
          format={format}
        />
        <div className='demo'>{JSON.stringify(value)}</div>
      </div>
    );
  };

  test('should render when set format is string', () => {
    const { container } = render(<FormatTest format='name' />);
    const thead = container.querySelector('thead')!;
    const ths = thead
      .querySelector('tr')
      ?.querySelectorAll('th') as NodeListOf<HTMLTableCellElement>;
    fireEvent.click(ths[0].querySelector('input')!);
    textContentTest(
      container.querySelector('.demo')!,
      JSON.stringify(renderData.map((item) => item.name)),
    );
  });
  test('should render when set format is function', () => {
    const { container } = render(<FormatTest format={(d: any) => `${d.name}s`} />);
    const thead = container.querySelector('thead')!;
    const ths = thead
      .querySelector('tr')
      ?.querySelectorAll('th') as NodeListOf<HTMLTableCellElement>;
    fireEvent.click(ths[0].querySelector('input')!);
    textContentTest(
      container.querySelector('.demo')!,
      JSON.stringify(renderData.map((item) => `${item.name}s`)),
    );
  });
  test('should render when set radio', () => {
    const { container } = render(<TableByValue radio />);
    const thead = container.querySelector('thead')!;
    const ths = thead
      .querySelector('tr')
      ?.querySelectorAll('th') as NodeListOf<HTMLTableCellElement>;
    classLengthTest(ths[0], 'input', 0);
    const tbody = container.querySelector('tbody')!;
    const trs = tbody.querySelectorAll('tr');
    fireEvent.click(trs[0].querySelector('input')!);
    classTest(trs[0].querySelector(radio)!, radioWrapperChecked);
    fireEvent.click(trs[1].querySelector('input')!);
    classTest(trs[1].querySelector(radio)!, radioWrapperChecked);
    classTest(trs[0].querySelector(radio)!, radioWrapperChecked, false);
  });
  test('should render when set showSelectAll is false', () => {
    const { container } = render(<TableByValue showSelectAll={false} />);
    const thead = container.querySelector('thead')!;
    const ths = thead
      .querySelector('tr')
      ?.querySelectorAll('th') as NodeListOf<HTMLTableCellElement>;
    classLengthTest(ths[0], 'input', 0);
  });
  test('should render when set treeCheckAll', () => {
    const handleRowSelect = jest.fn();
    const { container } = render(
      <Table
        keygen={'id'}
        data={expandTreeData}
        columns={expandColumns}
        onRowSelect={handleRowSelect}
        treeCheckAll
        defaultTreeExpandKeys={[1, 2]}
      />,
    );
    const tbody = container.querySelector('tbody')!;
    const trs = tbody.querySelectorAll('tr');
    fireEvent.click(trs[0].querySelector('input')!);
    trs.forEach((item) => {
      classTest(item, rowChecked);
    });
  });
  test('should render when set checkbox and rowSpan', () => {
    const checkboxRowspan: TableColumnItem[] = [
      {
        type: 'checkbox',
        rowSpan: (d: any) => d.id === 1,
      },
      ...columns,
    ];
    const { container } = render(
      <Table keygen={'id'} data={renderData} columns={checkboxRowspan} />,
    );
    const tbody = container.querySelector('tbody')!;
    const trs = tbody.querySelectorAll('tr');
    classLengthTest(trs[0], 'td', 3);
    classLengthTest(trs[1], 'td', 2);
    classLengthTest(trs[0], iconWrapper, 1);
    classLengthTest(trs[1], iconWrapper, 0);
    fireEvent.click(trs[0].querySelector('input')!);
    trs.forEach((item) => {
      classTest(item, rowChecked);
    });
  });
});
describe('Table[Filter]', () => {
  test('should render filter icons', () => {
    const { container } = render(<TableColumnFilter />);
    const thead = container.querySelector('thead')!;
    const iconContainer = thead.querySelectorAll(filterIconContainer);

    // 断言iconContainer的数量为5
    expect(iconContainer.length).toBe(5);
  });
});
describe('Table[Sort]', () => {
  const sorterColumns: TableColumnItem[] = [
    {
      title: 'id',
      render: 'id',
      sorter: 'id',
    },
    {
      title: 'name',
      render: 'name',
    },
  ];
  const TableSorter = (props: any) => {
    type TableColumnOrder = TYPE.Table.ColumnOrder;
    type TableProps = TYPE.Table.Props<TableRowData, TableRowData>;
    type TableSorter = TableProps['sorter'];
    const sorter: {
      [x: string]: any;
    } = {
      id: (order: TableColumnOrder) => (a: TableRowData, b: TableRowData) =>
        order === 'asc' ? a.id - b.id : b.id - a.id,
    };
    const handleSorter: TableSorter = (name, order) => sorter[name](order);
    return (
      <Table
        keygen={'id'}
        columns={sorterColumns}
        data={renderData}
        sorter={handleSorter}
        {...props}
      />
    );
  };
  test('should render when set sorter', () => {
    const onSortCancelFn = jest.fn();
    const { container } = render(<TableSorter onSortCancel={onSortCancelFn} />);
    const thead = container.querySelector('thead')!;
    const tbody = container.querySelector('tbody')!;
    const trs = tbody.querySelectorAll('tr');
    const th = thead.querySelectorAll('th')[0];
    const tableSorter = th.querySelector(hasSorter)!;
    const sorterContainerWrapper = tableSorter.querySelector(sorterContainer)!;
    const sorterAscWrapper = sorterContainerWrapper.querySelector(sorterAsc)!;
    expect(sorterAscWrapper).toBeInTheDocument();
    const sorterDescWrapper = sorterContainerWrapper.querySelector(sorterDesc)!;
    expect(sorterDescWrapper).toBeInTheDocument();
    textContentTest(trs[0].querySelectorAll('td')[0], renderData[0].id.toString());
    textContentTest(trs[1].querySelectorAll('td')[0], renderData[1].id.toString());
    fireEvent.click(sorterDescWrapper);
    classTest(sorterDescWrapper, sorterActive);
    const newTrs = tbody.querySelectorAll('tr');
    textContentTest(newTrs[0].querySelectorAll('td')[0], renderData[1].id.toString());
    textContentTest(newTrs[1].querySelectorAll('td')[0], renderData[0].id.toString());
    fireEvent.click(sorterDescWrapper);
    const oldTrs = tbody.querySelectorAll('tr');
    textContentTest(oldTrs[0].querySelectorAll('td')[0], renderData[0].id.toString());
    textContentTest(oldTrs[1].querySelectorAll('td')[0], renderData[1].id.toString());
    expect(onSortCancelFn.mock.calls.length).toBe(1);
    classTest(sorterDescWrapper, sorterActive, false);
  });
  test('should render when set defaultSorter', () => {
    const sorterColumns: TableColumnItem[] = [
      {
        title: 'id',
        render: 'id',
        sorter: 'id',
        defaultOrder: 'desc',
      },
      {
        title: 'name',
        render: 'name',
      },
    ];
    const { container } = render(<TableSorter columns={sorterColumns} />);
    const thead = container.querySelector('thead')!;
    classTest(thead.querySelector(sorterDesc)!, sorterActive);
    const tbody = container.querySelector('tbody')!;
    const trs = tbody.querySelectorAll('tr');
    textContentTest(trs[0].querySelectorAll('td')[0], renderData[1].id.toString());
    textContentTest(trs[1].querySelectorAll('td')[0], renderData[0].id.toString());
    fireEvent.click(thead.querySelector(sorterAsc)!);
    const newTrs = tbody.querySelectorAll('tr');
    textContentTest(newTrs[0].querySelectorAll('td')[0], renderData[0].id.toString());
    textContentTest(newTrs[1].querySelectorAll('td')[0], renderData[1].id.toString());
  });
  test('should render when set renderSorter', () => {
    const { container } = render(
      <TableSorter renderSorter={() => <div className='test'>test</div>} />,
    );
    const thead = container.querySelector('thead')!;
    const tableSorter = thead.querySelector(sorterContainer)!;
    expect(tableSorter.querySelector('.test')).toBeInTheDocument();
  });
  test('should render when set sort is function in columns', () => {
    const sorterColumnsByFunction: TableColumnItem[] = [
      {
        title: 'id',
        render: 'id',
        sorter: (order) => (a: TableRowData, b: TableRowData) =>
          order === 'asc' ? a.id - b.id : b.id - a.id,
      },
      {
        title: 'name',
        render: 'name',
      },
    ];
    const { container } = render(
      <Table keygen={'id'} columns={sorterColumnsByFunction} data={renderData} />,
    );
    const tbody = container.querySelector('tbody')!;
    const trs = tbody.querySelectorAll('tr');
    textContentTest(trs[0].querySelectorAll('td')[0], renderData[0].id.toString());
    textContentTest(trs[1].querySelectorAll('td')[0], renderData[1].id.toString());
    fireEvent.click(container.querySelector(sorterDesc)!);
    const newTrs = tbody.querySelectorAll('tr');
    textContentTest(newTrs[0].querySelectorAll('td')[0], renderData[1].id.toString());
    textContentTest(newTrs[1].querySelectorAll('td')[0], renderData[0].id.toString());
  });
  test('should render when set sort is object in columns', () => {
    const sortFn = jest.fn();
    const sorterColumnsByObject: TableColumnItem[] = [
      {
        title: 'id',
        render: 'id',
        sorter: {
          rule: sortFn,
          weight: 100,
        },
      },
      {
        title: 'name',
        render: 'name',
      },
    ];
    const { container } = render(
      <Table keygen={'id'} columns={sorterColumnsByObject} data={renderData} />,
    );
    fireEvent.click(container.querySelector(sorterDesc)!);
    expect(sortFn.mock.calls.length).toBe(1);
  });
  // TODO: don`t have changedByExpand
  test('should render when set sort and weight', () => {
    const { container } = render(<TableSorterWeight />);
    const tbody = container.querySelector('tbody')!;
    const trs = tbody.querySelectorAll('tr');
    textContentTest(trs[0].querySelectorAll('td')[3], '396,093');
    textContentTest(trs[1].querySelectorAll('td')[3], '115,777');
  });
});
describe('Table[RowsInView]', () => {
  test('should render when set rowsInView without virtual', () => {
    const tempData = dataGenerate(30);
    const { container } = render(<Table keygen={'id'} columns={columns} data={tempData} />);
    const tableWrapper = container.querySelector(wrapper)!;
    const tbody = tableWrapper.querySelector('tbody')!;
    const trs = tbody.querySelectorAll('tr');
    expect(trs.length).toBe(30);
  });
  test('should render when set rowsInView with virtual', () => {
    const tempData = dataGenerate(30);
    const { container, rerender } = render(
      <Table keygen={'id'} columns={columns} data={tempData} virtual height={50} />,
    );
    const tableWrapper = container.querySelector(wrapper)!;
    const tbody = tableWrapper.querySelector('tbody')!;
    const trs = tbody.querySelectorAll('tr');
    expect(trs.length).toBe(20);
    rerender(<Table keygen={'id'} columns={columns} data={tempData} virtual height={50} rowsInView={10} />);
    expect(tbody.querySelectorAll('tr').length).toBe(10);
  });
  test('should render when set rowsInView is 0', () => {
    const tempData = dataGenerate(30);
    const { container } = render(
      <Table keygen={'id'} columns={columns} data={tempData} virtual height={50} rowsInView={0} />
    );
    const tableWrapper = container.querySelector(wrapper)!;
    const tbody = tableWrapper.querySelector('tbody')!;
    expect(tbody.querySelectorAll('tr').length).toBe(30);
  })
});
describe('Table[Virtual]', () => {
  test('should render when set virtual', async () => {
    const onScrollfn = jest.fn();
    const tempData = dataGenerate(30);
    const { container } = render(
      <Table keygen={'id'} columns={columns} data={tempData} virtual height={50} onScroll={onScrollfn} />,
    );
    const tableHead = container.querySelector(headWrapper)!;
    // const tableFoot = container.querySelector(footWrapper)!;
    styleTest(tableHead.querySelector('table')!, 'border-spacing: 0; table-layout: fixed;');
    // const tableBody = tableHead.nextElementSibling;
    const tableSroll = container.querySelector('[data-soui-role="scroll"]') as Element;
    // attributesTest(tableSroll, 'data-soui-type', 'scroll');
    // const tableBodyWrapper = tableBody?.querySelector('table') as Element;
    // styleTest(tableBodyWrapper, 'transform: translate3d(0px, 0px, 0);');
    fireEvent.mouseDown(tableSroll);
    fireEvent.scroll(tableSroll, { target: { scrollY: 100 } });
    fireEvent.mouseUp(tableSroll);
    await waitFor(async () => {
      await delay(200);
    });
    // styleTest(tableBodyWrapper, 'transform: translate3d(0px, 0px, 0);');
    fireEvent.scroll(tableSroll, { target: { scrollLeft: 10 } });
    // styleTest(tableBodyWrapper, 'transform: translate3d(-10px, -10px, 0);');
    // styleTest(tableHead.querySelector('table')!, 'transform: translate3d(-10px, 0, 0);');
    // styleTest(tableFoot.querySelector('table')!, 'transform: translate3d(-10px, 0, 0);');
    expect(onScrollfn.mock.calls.length).toBe(2);
  });
  test('should render when mouseDown', async () => {
    const onScrollfn = jest.fn();
    const tempData = dataGenerate(30);
    const newData = dataGenerate(40);
    const App = () => {
      const [value, setValue] = React.useState(tempData);
      return (
        <div>
          <Button onClick={() => setValue(newData)}></Button>
          <Table keygen={'id'} columns={columns} data={value} virtual height={50} onScroll={onScrollfn} />
        </div>
      );
    };
    const { container } = render(<App />);
    const tableHead = container.querySelector(headWrapper)!;
    const tableBody = tableHead.nextElementSibling;
    const tableSroll = tableBody?.firstElementChild as Element;
    fireEvent.mouseDown(tableSroll);
    fireEvent.scroll(tableSroll, { target: { scrollTop: 100 } });
    fireEvent.mouseUp(tableSroll);
    await waitFor(async () => {
      await delay(200);
    });
    fireEvent.click(container.querySelector('button')!);
    fireEvent.mouseDown(tableSroll);
    fireEvent.scroll(tableSroll, { target: { scrollTop: 100 } });
    fireEvent.mouseUp(tableSroll);
    await waitFor(async () => {
      await delay(200);
    });
    // should expect
  });
  // test('should render when set scrollLeft is fixed value', async () => {
  //   const scrollLeft = 10;
  //   const tempData = dataGenerate(30);
  //   const { container } = render(
  //     <Table keygen={'id'} columns={columns} data={tempData} virtual height={50} width={100} scrollLeft={scrollLeft} />,
  //   );
  //   // const scrollContainer = container.querySelector('[data-soui-role="scroll"]')
  //   // expect(scrollContainer?.scrollLeft).toBe(scrollLeft);
  // });
  // test('should render when set scrollLeft is controlled', () => {
  //   const App = () => {
  //     const [scrollLeft, setScrollLeft] = React.useState(0);
  //     return (
  //       <div>
  //         <Button onClick={() => setScrollLeft(10)}>setScrollLeft</Button>
  //         <Table
  //           keygen={'id'}
  //           columns={columns}
  //           data={renderData}
  //           virtual
  //           height={50}
  //           scrollLeft={scrollLeft}
  //         />
  //       </div>
  //     );
  //   };
  //   const { container } = render(<App />);
  //   const tableHead = container.querySelector(headWrapper)!;
  //   const tableBody = tableHead.nextElementSibling;
  //   const tableBodyWrapper = tableBody?.querySelector('table') as Element;
  //   styleTest(tableHead.querySelector('table')!, 'transform: translate3d(0px, 0, 0);');
  //   styleTest(tableBodyWrapper, 'transform: translate3d(0px, 0px, 0);');
  //   fireEvent.click(container.querySelector('button')!);
  //   styleTest(tableHead.querySelector('table')!, 'transform: translate3d(-10px, 0, 0);');
  //   styleTest(tableBodyWrapper, 'transform: translate3d(-10px, 0px, 0);');
  // });
  // TODO: rowHeight
  test('should render when set rowHeight', () => {
    const { container } = render(
      <Table
        keygen={'id'}
        columns={columns}
        data={renderData}
        virtual
        rowHeight={50}
        height={50}
      />,
    );
    const tableHead = container.querySelector(headWrapper)!;
    const tableBody = tableHead.nextElementSibling;
    const tableSroll = tableBody?.firstElementChild as Element;
    fireEvent.scroll(tableSroll, { target: { scrollTop: 100 } });
  });
  test('should render when set scrollToIndex', async () => {
    const App = () => {
      const columns: any[] = [
        { title: 'id', render: 'id', width: 80 },
        {
          title: 'Name',
          fixed: 'left',
          render: (d: any) => (
            <div id={`name_${d.id}`} style={{ height: d.height }}>
              {`${d.name}`}
            </div>
          ),
          width: 160,
        },
      ];
      const tempData = dataGenerate(40);
      const [table, setTable] = React.useState<any>();

      const [state, setState] = React.useState({
        index: 25,
      });

      const handleScroll = () => {
        if (table)
          table.scrollToIndex(state.index - 1, () => {
            const el: HTMLElement = document.querySelector(`#name_${state.index}`)!;
            if (el) {
              el.style.color = 'red';
            }
          });
      };

      const handleIndexChange = ({ index }: { index: number }) => {
        setState({ index });
      };

      React.useEffect(() => {
        setTimeout(handleScroll);
      }, [state]);

      return (
        <div>
          <Form defaultValue={state} inline onSubmit={handleIndexChange}>
            <Input.Number min={1} max={10000} width={100} name='index' />
            <Button htmlType='submit'>Scroll</Button>
          </Form>

          <Table
            keygen='id'
            bordered
            data={tempData}
            virtual
            height={50}
            width={1400}
            rowsInView={5}
            columns={columns}
            style={{ height: 500 }}
            tableRef={(t) => setTable(t)}
          />
        </div>
      );
    };
    const { container } = render(<App />);
    fireEvent.click(container.querySelector('button')!);
    await waitFor(async () => {
      await delay(200);
    });
  });
  // TODO: scrollToIndex
});
describe('Table[Fixed]', () => {
  test('should render when set fixed in table for virtual', () => {
    const tempData = dataGenerate(30);
    const fixedArray: ('x' | 'y' | 'both' | 'auto')[] = ['y', 'auto', 'both'];
    fixedArray.forEach((i: 'x' | 'y' | 'both' | 'auto') => {
      const { container } = render(
        <Table keygen={'id'} columns={columns} data={tempData} fixed={i} height={100} />,
      );
      const tableHead = container.querySelector(headWrapper)!;
      const tableBody = tableHead.nextElementSibling;
      const tableSroll = tableBody?.firstElementChild as Element;
      // attributesTest(tableSroll, 'data-soui-type', 'scroll');
      fireEvent.scroll(tableSroll, { target: { scrollTop: 50 } });
      // const tableBodyWrapper = tableBody?.querySelector('table') as Element;
      // styleTest(tableBodyWrapper, 'transform: translate3d(-0px, -10px, 0);');
    });
  });
  test('should render when set fixed is x in table', () => {
    const tempData = dataGenerate(30);
    const { container } = render(
      <Table keygen={'id'} columns={columns} data={tempData} fixed={'x'} />,
    );
    classLengthTest(container, 'table', 1);
  });
  test('should render when set fixed in columns', () => {
    const { container } = render(<Table keygen={'id'} columns={fixedColumns} data={fixedData} />);
    const thead = container.querySelector('thead')!;
    const tbody = container.querySelector('tbody')!;
    const ths = thead.querySelectorAll('th');
    ths.forEach((item, index) => {
      if (index <= 1) {
        classTest(item, cellFixedLeft);
      }
      if (index === 1) {
        classTest(item, cellFixedLast);
      }
    });
    const trs = tbody.querySelectorAll('tr');

    trs.forEach((item) => {
      const tds = item.querySelectorAll('td');
      tds.forEach((td, index) => {
        if (index <= 1) {
          classTest(td, cellFixedLeft);
        }
        if (index === 1) {
          classTest(td, cellFixedLast);
        }
      });
    });
  });
  test('should render when isScrollX is true', () => {
    const trsDefaultStyleByLeft = 'left: 0px; top: 0px; position: sticky;';
    const trsDefaultStyleByRight = 'top: 0px; position: sticky;';
    const trsVirtualStyleByLeft = 'transform: translate3d(-20px, 0, 0);';
    const trsVirtualStyleByLeftHead = 'transform: translate3d(20px, 0, 0);';
    const trsVirtualStyleByRight = 'transform: translate3d(-80px, 0, 0);';
    Object.defineProperty(HTMLElement.prototype, 'scrollWidth', { configurable: true, value: 300 });
    Object.defineProperty(HTMLElement.prototype, 'clientWidth', { configurable: true, value: 200 });
    const { container, rerender } = render(
      <Table keygen={'id'} columns={fixedColumns} data={fixedData} />,
    );

    const tableBodyWrapper = container.querySelector(bodyWrapper)!;
    const headerThs = tableBodyWrapper.querySelector('thead')?.querySelectorAll('th')!


    styleContentTest(headerThs[0], trsDefaultStyleByLeft)
    styleContentTest(headerThs[1], trsDefaultStyleByLeft)

    rerender(<Table keygen={'id'} columns={fixedColumnsByRight} data={fixedData} />);
    const headerThsRight = tableBodyWrapper.querySelector('thead')?.querySelectorAll('th')!

    styleContentTest(headerThsRight[2], trsDefaultStyleByRight)
    rerender(
      <Table keygen={'id'} columns={fixedColumns} data={fixedData} virtual scrollLeft={20} height={50}/>,
    );

    const headerThsV = container.querySelector('thead')?.querySelectorAll('th')!

    styleContentTest(headerThsV[0], 'top: 0px; position: sticky;')
    styleContentTest(headerThsV[1], 'top: 0px; position: sticky;')
    rerender(
      <Table
        keygen={'id'}
        columns={fixedColumnsByRight}
        data={fixedData}
        virtual
        scrollLeft={20}
        height={50}
      />,
    );
    const headerThsVRight = container.querySelector('thead')?.querySelectorAll('th')!
    styleContentTest(headerThsVRight[2], 'top: 0px; position: sticky; right: 0px;')
  });
});
describe('Table[Resizable]', () => {
  test('should render when set resizable and onColumnResize in table', () => {
    const onColumnResizeFn = jest.fn();
    const { container } = render(
      <Table
        keygen={'id'}
        columns={columns}
        data={renderData}
        columnResizable
        onColumnResize={onColumnResizeFn}
      />,
    );
    const tableWrapper = container.querySelector(wrapper)!;
    const thead = tableWrapper.querySelector('thead')!;
    const ths = thead.querySelectorAll('th');
    ths.forEach((item) => {
      classLengthTest(item, resizeSpanner, 1);
    });
    const resizeSpannerWrapper = ths[0].querySelector(resizeSpanner)!;
    fireEvent.mouseDown(resizeSpannerWrapper);
    fireEvent.mouseMove(resizeSpannerWrapper, { clientX: 100 });
    fireEvent.mouseUp(resizeSpannerWrapper);
    expect(onColumnResizeFn.mock.calls.length).toBe(1);
  });
  test('should render when only set resizable', () => {
    const originWidth = 200;
    const deltaX = 100;
    const { container } = render(
      <Table
        keygen={'id'}
        columns={columns}
        data={renderData}
        columnResizable
        width={originWidth}
      />,
    );
    styleContentTest(container.querySelector('table')!, `width: ${originWidth}px;`);
    const tableWrapper = container.querySelector(wrapper)!;
    const thead = tableWrapper.querySelector('thead')!;
    const ths = thead.querySelectorAll('th');
    ths.forEach((item) => {
      classLengthTest(item, resizeSpanner, 1);
    });
    const resizeSpannerWrapper = ths[0].querySelector(resizeSpanner)!;
    fireEvent.mouseDown(resizeSpannerWrapper);
    fireEvent.mouseMove(resizeSpannerWrapper, { clientX: deltaX });
    fireEvent.mouseUp(resizeSpannerWrapper);
    styleContentTest(container.querySelector('table')!, `width: ${originWidth + deltaX}px;`);
  });
});
describe('Table[Rowspan]', () => {
  test('should render when set rowSpan', () => {
    const rowSpanColumns: TableColumnItem[] = [
      {
        title: 'id',
        render: 'id',
        rowSpan: (a: any, b: any) => a.id + 1 === b.id,
      },
      {
        title: 'name',
        render: 'name',
      },
    ];
    const { container } = render(
      <Table keygen={'id'} columns={rowSpanColumns} data={renderData} />,
    );
    const tbody = container.querySelector('tbody')!;
    const trs = tbody.querySelectorAll('tr');
    classLengthTest(trs[0], 'td', 2);
    classLengthTest(trs[1], 'td', 1);
    attributesTest(trs[0].querySelectorAll('td')[0], 'rowSpan', '2');
  });
  test('should render when set calSpan', () => {
    const calSpanColumns: TableColumnItem[] = [
      {
        title: 'id',
        render: 'id',
        colSpan: (d: any) => (d.id === 1 ? 2 : 1),
      },
      {
        title: 'name',
        render: 'name',
      },
    ];
    const { container } = render(
      <Table keygen={'id'} columns={calSpanColumns} data={renderData} />,
    );
    const tbody = container.querySelector('tbody')!;
    const trs = tbody.querySelectorAll('tr');
    classLengthTest(trs[0], 'td', 1);
    classLengthTest(trs[1], 'td', 2);
    attributesTest(trs[0].querySelectorAll('td')[0], 'colSpan', '2');
  });
});
describe('Table[Foot]', () => {
  const colSpan = 2;
  const summary = [
    [
      {
        render: () => <span>Summary</span>,
        colSpan,
      },
    ],
  ];
  const summaryByRight = [
    [
      {
        render: () => <span>Summary</span>,
        colSpan,
      },
      {
        render: () => <span>SummaryByRight</span>,
      },
    ],
  ];
  test('should render when set summary', () => {
    const { container } = render(
      <Table keygen={'id'} columns={columns} data={renderData} summary={summary} />,
    );
    const tfoot = container.querySelector('tfoot')!;
    const trs = tfoot.querySelectorAll('tr');
    expect(trs?.length).toBe(summary.length);
    const tds = trs[0].querySelectorAll('td');
    expect(tds?.length).toBe(summary[0].length);
    attributesTest(tds[0], 'colSpan', colSpan.toString());
  });
  test('should render when set fixed about foot', () => {
    const { container, rerender } = render(
      <Table keygen={'id'} columns={fixedColumns} data={fixedData} summary={summary} />,
    );
    const tfoot = container.querySelector('tfoot')!;
    const td = tfoot.querySelector('td')!;
    classTest(td, cellFixedLeft);
    classTest(td, cellFixedLast);
    rerender(
      <Table
        keygen={'id'}
        columns={fixedColumnsByRight}
        data={fixedData}
        summary={summaryByRight}
      />,
    );
    const tdByRight = tfoot.querySelectorAll('td')[1];
    classTest(tdByRight, cellFixedRight);
    classTest(tdByRight, cellFixedLast);
  });
  test('should render when set scrollLeft and virtual', () => {
    const { container, rerender } = render(
      <Table
        keygen={'id'}
        columns={fixedColumns}
        data={fixedData}
        summary={summary}
        virtual
        scrollLeft={20}
        height={50}
        width={100}
      />,
    );
    const staticStyle = 'width: 100px; border-spacing: 0; table-layout: fixed;';
    const tables = container.querySelectorAll('table');
    tables.forEach((item, index) => {
      if (index === 1) styleTest(item, `${staticStyle} transform: translate3d(0, 0px, 0);`);
      else styleTest(item, staticStyle);
    });
    rerender(
      <Table
        keygen={'id'}
        columns={fixedColumnsByRight}
        data={fixedData}
        summary={summaryByRight}
        virtual
        scrollLeft={20}
        height={50}
        width={100}
      />,
    );
    tables.forEach((item, index) => {
      if (index === 1) styleTest(item, `${staticStyle} transform: translate3d(0, 0px, 0);`);
      else styleTest(item, staticStyle);
    });
  });
});
describe('Table[Pagination]', () => {});
describe('Table[RowEvents]', () => {
  test('should render when set rowEvents', () => {
    const onMouseEnterFn = jest.fn();
    const rowEvents = {
      onMouseEnter: onMouseEnterFn,
    };
    const { container } = render(
      <Table keygen={'id'} columns={columns} data={renderData} rowEvents={rowEvents} />,
    );
    fireEvent.mouseEnter(container.querySelector('tbody')!.querySelector('tr')!);
    expect(onMouseEnterFn.mock.calls.length).toBe(1);
  });
});

// TODO: 有sticky特性的用例跑不起来？
describe('Table[showBottomScrollbar]', () => {});
// sticky
// loading

// TODO: TableColumn

// innerScrollAttr
// rowHeight
