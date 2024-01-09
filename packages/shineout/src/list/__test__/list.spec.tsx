import { render, cleanup, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { List, TYPE } from 'shineout';
import mountTest from '../../tests/mountTest';
import { classTest, createClassName, displayTest, styleTest } from '../../tests/utils';
import React from 'react';

const SO_PREFIX = 'list';
const originClasses = ['wrapper'];
const originItemClasses = [''];
const { wrapper } = createClassName(SO_PREFIX, originClasses, originItemClasses);

interface ListItem {
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

type ListProps = TYPE.List.Props<ListItem, ListItem>;
type ListData = ListProps['data'];
type ListRenderItem = ListProps['renderItem'];

const data: ListData = [
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
    render(<RenderList />);
    screen.debug();
  });
});
