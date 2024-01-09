import React from 'react';
import { render, cleanup, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { List, TYPE } from 'shineout';
import mountTest from '../../tests/mountTest';
import {
  attributesTest,
  classTest,
  createClassName,
  displayTest,
  styleTest,
  textContentTest,
} from '../../tests/utils';
import { classLengthTest } from '../../tests/structureTest';

const SO_PREFIX = 'list';
const originClasses = ['wrapper', 'scrollContainer', 'row', 'item', 'empty'];
const originItemClasses = ['wrapperBordered', 'wrapperLarge', 'wrapperSmall', 'wrapperStriped'];
const {
  wrapper,
  scrollContainer,
  row,
  item: itemClassName,
  wrapperBordered,
  wrapperLarge,
  wrapperSmall,
  empty: emptyClassName,
  wrapperStriped,
} = createClassName(SO_PREFIX, originClasses, originItemClasses);

const defaultStyle = 'width: 100%;';

interface ListItem {
  id: number;
  lastName: string;
  firstName: string;
}

type ListProps = TYPE.List.Props<ListItem, ListItem>;
type ListData = ListProps['data'];
type ListRenderItem = ListProps['renderItem'];

const createMoreData = (num: number) => {
  const result: ListData = [];
  for (let i = 1; i <= num; i++) {
    result.push({
      id: i,
      firstName: 'test',
      lastName: `${i}`,
    });
  }
  return result;
};

const data: ListData = createMoreData(4);

const renderItem: ListRenderItem = (rowData) => (
  <div>{`Name: ${rowData.firstName}-${rowData.lastName}`}</div>
);

const RenderList = (props: any) => (
  <List data={data} keygen='id' renderItem={renderItem} {...props} />
);

afterEach(cleanup);
mountTest(<RenderList />);

describe('List[Base]', () => {
  displayTest(List as React.FC<any>, 'ShineoutList');
  test('should render when set className and style', () => {
    const style = { backgroundColor: 'red' };
    const sytleRender = 'background-color: red;';
    const className = 'test';
    const { container } = render(<RenderList style={style} className={className} />);
    const list = container.querySelector(wrapper)!;
    classTest(list, className);
    styleTest(list, sytleRender);
  });
  test('should render default', () => {
    const { container } = render(<RenderList />);
    const list = container.querySelector(wrapper)!;
    const listScrollContainer = list.querySelector(scrollContainer)!;
    const listRow = listScrollContainer.querySelectorAll(row);
    expect(listRow.length).toBe(data.length);
    listRow.forEach((i, index) => {
      const item = i.querySelector(itemClassName)!;
      styleTest(item, defaultStyle);
      textContentTest(item, `Name: ${data[index].firstName}-${data[index].lastName}`);
    });
  });
  test('should render without renderItem', () => {
    const dataWithoutRenderItem = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet'];
    const { container } = render(<List data={dataWithoutRenderItem} keygen />);
    const list = container.querySelector(wrapper)!;
    const rows = list.querySelectorAll(row);
    rows.forEach((item, index) => {
      textContentTest(item, dataWithoutRenderItem[index]);
    });
  });
  test('should render when set keygen is true with data item is object', () => {
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    render(<RenderList keygen />);
    expect(
      JSON.stringify(errorSpy.mock.calls).indexOf(
        'Error: keygen result expect a string or a number, get',
      ),
    ).toBeTruthy();
  });
  test('should render when set bordered', () => {
    const { container } = render(<RenderList bordered />);
    const list = container.querySelector(wrapper)!;
    classTest(list, wrapperBordered);
  });
  test('should render when set size is large', () => {
    const { container } = render(<RenderList size='large' />);
    const list = container.querySelector(wrapper)!;
    classTest(list, wrapperLarge);
  });
  test('should render when set size is small', () => {
    const { container } = render(<RenderList size='small' />);
    const list = container.querySelector(wrapper)!;
    classTest(list, wrapperSmall);
  });
  test('should render when set height', () => {
    const height = 300;
    const { container } = render(<RenderList height={height} />);
    const list = container.querySelector(wrapper)!;
    styleTest(list, `height: ${height}px;`);
  });
  test('should render when set data is empty', () => {
    const emptyData: ListData = [];
    const { container } = render(<RenderList data={emptyData} />);
    const list = container.querySelector(wrapper)!;
    classLengthTest(list, emptyClassName, 1);
    classLengthTest(list.querySelector(emptyClassName)!, 'svg', 1);
  });
  test('should render when set empty', () => {
    const emptyContainer = 'none';
    const emptyData: ListData = [];
    const { container } = render(<RenderList data={emptyData} empty={emptyContainer} />);
    const listEmpty = container.querySelector(emptyClassName)!;
    textContentTest(listEmpty, emptyContainer);
  });
  test('should render when set striped', () => {
    const { container } = render(<RenderList striped />);
    const list = container.querySelector(wrapper)!;
    classTest(list, wrapperStriped);
  });
});
describe('List[Fixed]', () => {
  const virtualData = createMoreData(30);
  test('should render when set fixed', () => {
    const { container } = render(<RenderList data={virtualData} fixed />);
    const list = container.querySelector(wrapper)!;
    const listScroll = list.firstElementChild?.firstElementChild as Element;
    const listScrollContainer = listScroll.firstElementChild as Element;
    const listScrollMain = listScrollContainer.firstElementChild as Element;
    attributesTest(listScroll, 'data-soui-type', 'scroll');
    attributesTest(listScrollContainer, 'data-soui-type', 'scroll-container');
    styleTest(listScrollMain, 'transform: translate3d(0, -0px, 0);');
    fireEvent.scroll(listScroll, { target: { scrollTop: 50 } });
    screen.debug();
  });
});
