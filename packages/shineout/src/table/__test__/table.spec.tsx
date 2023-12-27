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
const originClasses = [
  'wrapper',
  'bodyWrapper',
  'emptyWrapper',
  'headWrapper',
  'footWrapper',
  'iconWrapper',
  'expandWrapper',
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
  verticalAlignMiddle,
  iconWrapper,
  rowExpand,
  expandWrapper,
  rowChecked,
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
const renderDataA: TableRowData[] = [
  {
    id: 1,
    name: 'test1',
  },
  {
    id: 2,
    name: 'test2',
  },
  {
    id: 3,
    name: 'test3',
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
  test('should render when set width', () => {
    const tableWidth = 1000;
    const { container } = render(
      <Table keygen={'id'} columns={columns} data={renderData} width={tableWidth} />,
    );
    const tableWrapper = container.querySelector(wrapper)!;
    styleTest(tableWrapper.querySelector('table')!, `width: ${tableWidth}px;`);
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
      <Table keygen='id' cellSelectable columns={columns} data={renderDataA} />,
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
    screen.debug();
    const tableWrapper = container.querySelector(wrapper)!;
    const tbody = tableWrapper.querySelector('tbody')!;
    const trs = tbody.querySelectorAll('tr');
    fireEvent.click(trs[0]);
    expect(rowClickFn.mock.calls.length).toBe(1);
  });
  test('should render when set onScroll', () => {
    const scrollFn = jest.fn();
    const { container } = render(
      <Table keygen={'id'} columns={columns} data={renderData} onScroll={scrollFn} />,
    );
    screen.debug();
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

  interface ExpandTreeData {
    id: number;
    name: string;
    children?: ExpandTreeData[];
  }

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
    screen.debug();
    const result = getExpandKeys(expandTreeData, defaultTreeExpandKeys);
    const tableWrapper = container.querySelector(wrapper)!;
    const tbody = tableWrapper.querySelector('tbody')!;
    const trs = tbody.querySelectorAll('tr');
    expect(trs.length).toBe(result.length);
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
    screen.debug();
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
          columns={expandColumns}
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
    fireEvent.click(trs[0].querySelector(iconWrapper)!);
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
});
