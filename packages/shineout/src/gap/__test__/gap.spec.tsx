import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import Gap from '..';
import { Button } from 'shineout';
import mountTest from '../../tests/mountTest';
import { displayTest, snapshotTest, styleTest } from '../../tests/utils';
import GapBase from '../__example__/01-base';
import GapCustom from '../__example__/02-custom';
import GapVertical from '../__example__/03-vertical';
import GapAlign from '../__example__/04-align';

const GapDemo = (props: any) => (
  <Gap style={{ width: 400 }} {...props}>
    {Array.from({ length: 4 }).map((_, i) => (
      <Button key={i} type='primary'>
        Item
        {i}
      </Button>
    ))}
  </Gap>
);

const getStyle = (v: number) => `margin-bottom: ${v}px; margin-right: ${v}px;`;
const baseStyle = getStyle(-8);
const baseItemStyle = getStyle(8);

afterEach(cleanup);
mountTest(<Gap />);

describe('Gap[Base]', () => {
  displayTest(Gap, 'ShineoutGap');
  snapshotTest(<GapBase />);
  snapshotTest(<GapCustom />, 'about custom');
  snapshotTest(<GapVertical />, 'about vertical');
  snapshotTest(<GapAlign />, 'about align');
  // TODO: should test flex
  test('should render when set className and style', () => {
    const { container } = render(<Gap className='demo' style={{ width: 400 }} />);
    styleTest(container.querySelector('.demo')!, `${baseStyle} width: 400px;`);
  });
  test('should render default', () => {
    const { container } = render(<GapDemo className='demo' />);
    container
      .querySelector('.demo')
      ?.querySelectorAll('div')
      .forEach((item) => {
        styleTest(item, baseItemStyle);
      });
  });
  test('should render when set itemStyle', () => {
    const { container } = render(<GapDemo className='demo' itemStyle={{ width: 10 }} />);
    container
      .querySelector('.demo')
      ?.querySelectorAll('div')
      .forEach((item) => {
        styleTest(item, `width: 10px; ${baseItemStyle}`);
      });
  });
  test('should render when set column and row', () => {
    const { container } = render(<GapDemo className='demo' column={10} row={10} />);
    const wrapper = container.querySelector('.demo')!;
    styleTest(wrapper, `${getStyle(-10)} width: 400px;`);
    wrapper.querySelectorAll('div').forEach((item) => {
      styleTest(item, getStyle(10));
    });
  });
  test('should render when set vertical', () => {
    const { container } = render(
      <GapDemo className='demo' column={10} row={10} style={{ flexDirection: 'column' }} />,
    );
    styleTest(container.querySelector('.demo')!, `${getStyle(-10)} flex-direction: column;`);
  });
});
