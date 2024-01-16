import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CardGroup from '..';
import {
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
import CardGroupBase from '../__example__/01-base';
import CardGroupWidth from '../__example__/02-width';
import CardGroupLazyout from '../__example__/03-lazyout';
import CardGroupCheckbox from '../__example__/04-checkbox';
import CardGroupDisabled from '../__example__/05-disabled';

const SO_PREFIX = 'cardGroup';
const originClasses = ['wrapper', 'scroller', 'grid', 'item', 'checkbox'];
const originItemClasses = [''];
const { wrapper, scroller, grid, item, checkbox } = createClassName(
  SO_PREFIX,
  originClasses,
  originItemClasses,
);

const { wrapperChecked, wrapperDisabled } = createClassName(
  'checkbox',
  [''],
  ['wrapperChecked', 'wrapperDisabled'],
);

const defaultGridStyle = (num?: number) => `grid-template-columns: repeat(${num || 3}, 1fr);`;
const defaultGridStyleAutoFill = (num: number) =>
  `grid-template-columns: repeat(auto-fill, minmax(${num}px, 1fr));`;

afterEach(cleanup);
mountTest(<CardGroup />);

const CardGroupTest = (props: any) => (
  <CardGroup {...props}>
    <CardGroup.Item key={'1'}>{'test1'}</CardGroup.Item>
    <CardGroup.Item key={'2'}>{'test2'}</CardGroup.Item>
  </CardGroup>
);

const CardGroupData = [
  { id: 1, name: 'test1' },
  { id: 2, name: 'test2' },
];

describe('CardGroup[Base]', () => {
  displayTest(CardGroup, 'ShineoutCardGroup');
  baseTest(CardGroup, wrapper);
  childrenTest(CardGroup, wrapper);
  baseTest(CardGroup.Item, item);
  childrenTest(CardGroup.Item, item);
  snapshotTest(<CardGroupBase />);
  snapshotTest(<CardGroupWidth />, 'about width');
  snapshotTest(<CardGroupLazyout />, 'about lazyout');
  snapshotTest(<CardGroupCheckbox />, 'about checkbox');
  snapshotTest(<CardGroupDisabled />, 'about disabled');
  test('should render default', () => {
    const { container } = render(<CardGroupTest />);
    const cardGroupWrapper = container.querySelector(wrapper)!;
    const cardGroupScroller = cardGroupWrapper.querySelector(scroller)!;
    const cardGroupGrid = cardGroupScroller.querySelector(grid)!;
    styleTest(cardGroupGrid, defaultGridStyle());
    classLengthTest(cardGroupGrid, item, 2);
  });
  test('should render when set columns', () => {
    const columns = 4;
    const { container } = render(<CardGroupTest columns={columns} />);
    const cardGroupWrapper = container.querySelector(wrapper)!;
    styleTest(cardGroupWrapper.querySelector(grid)!, defaultGridStyle(columns));
  });
  test('should render when set gutter', async () => {
    const gutter = 20;
    render(<CardGroupTest gutter={gutter} />);
  });
  test('should render when set cardWidth', async () => {
    const cardWidth = 200;
    const { container } = render(<CardGroupTest cardWidth={cardWidth} />);
    const cardGroupWrapper = container.querySelector(wrapper)!;
    styleTest(cardGroupWrapper.querySelector(grid)!, defaultGridStyleAutoFill(cardWidth));
  });
  test('should render when set height', () => {
    const height = 200;
    const { container } = render(<CardGroupTest height={height} />);
    const cardGroupWrapper = container.querySelector(wrapper)!;
    styleTest(cardGroupWrapper, `height: ${height}px;`);
  });
  test('should render when set gridStyle', () => {
    const gridStyle = { color: 'red' };
    const gridStyleStr = 'color: red;';
    const { container } = render(<CardGroupTest gridStyle={gridStyle} />);
    const cardGroupWrapper = container.querySelector(wrapper)!;
    styleContentTest(cardGroupWrapper.querySelector(grid)!, gridStyleStr);
  });
});
describe('CardGroup[Item]', () => {
  const App = (props: any) => {
    const [checked, setChecked] = React.useState<number[]>([]);
    return (
      <div>
        <div className='test'>{checked.join('/')}</div>
        <CardGroup height={500}>
          {CardGroupData.map((item) => (
            <CardGroup.Item
              key={item.id}
              value={item.id}
              checked={checked.includes(item.id)}
              onChange={(check: boolean, v: number) =>
                setChecked(check ? checked.concat(v) : checked.filter((i: number) => i !== v))
              }
              {...props}
            >
              {item.name}
            </CardGroup.Item>
          ))}
        </CardGroup>
      </div>
    );
  };
  test('should render when can check', () => {
    const { container } = render(<App />);
    const cardGroupWrapper = container.querySelector(wrapper)!;
    const items = cardGroupWrapper.querySelectorAll(item);
    items.forEach((item) => {
      classLengthTest(item, checkbox, 1);
    });
    fireEvent.click(items[0].querySelector('input')!);
    fireEvent.click(items[1].querySelector('input')!);
    const test = container.querySelector('.test')!;
    textContentTest(test, CardGroupData.map((item) => item.id).join('/'));
    items.forEach((item) => {
      classTest(item.querySelector(checkbox)!, wrapperChecked);
    });
  });
  test('should render when set disabled', () => {
    const { container } = render(<App disabled />);
    const cardGroupWrapper = container.querySelector(wrapper)!;
    const items = cardGroupWrapper.querySelectorAll(item);
    items.forEach((item) => {
      classTest(item.querySelector(checkbox)!, wrapperDisabled);
    });
  });
  test('should render when set placeholder', () => {
    render(
      <CardGroup>
        {CardGroupData.map((item) => (
          <CardGroup.Item key={item.id} placeholder={<div className='test'>placeholder</div>}>
            {item.name}
          </CardGroup.Item>
        ))}
      </CardGroup>,
    );
  });
});
