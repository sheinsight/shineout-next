import { render, cleanup, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Grid from '..';
import {
  baseTest,
  childrenTest,
  classTest,
  // createClassName,
  displayTest,
  snapshotTest,
  styleTest,
} from '../../tests/utils';
import mountTest from '../../tests/mountTest';
import GridBase from '../__example__/01-base';
import GridOffset from '../__example__/02-offset';
import GridNested from '../__example__/03-nested';
import GridGutter from '../__example__/04-gutter';

// const SO_PREFIX = 'grid';
// const originClasses = [''];
// const originItemClasses = ['full', 'md'];
// const { full, md } = createClassName(SO_PREFIX, originClasses, originItemClasses);

const wrapper = '.soui-grid';
const offsetPre = 'soui-offset-md';

const full = 'soui-grid-full';
const md = 'soui-grid-md';

const mdClassName = (f: number | string, s: number | string = '000') => `${md}-${f}-${s}`;
const mdDefaultClassName = mdClassName(100);

const offsetClassName = (f: number | string, s: number | string = '000') =>
  `${offsetPre}-${f}-${s}`;

const stretchStyle = 'min-height: 100%; height: 100%;';

afterEach(cleanup);
mountTest(<Grid />);

describe('Grid[Base]', () => {
  displayTest(Grid, 'ShineoutGrid');
  baseTest(Grid, wrapper);
  childrenTest(Grid, wrapper);
  snapshotTest(<GridBase />);
  snapshotTest(<GridOffset />, 'about offset');
  snapshotTest(<GridNested />, 'about nested');
  snapshotTest(<GridGutter />, 'about gutter');
  test('should render default', () => {
    const { container } = render(<Grid>{'Grid'}</Grid>);
    screen.debug()
    const gridWrapper = container.querySelector(wrapper)!;
    classTest(gridWrapper, full);
    classTest(gridWrapper, mdDefaultClassName);
  });
  test('should render when set width < 1', () => {
    const width = 1 / 2;
    const widthSecond = 1 / 4;
    const { container, rerender } = render(<Grid width={width}>{'Grid'}</Grid>);
    const gridWrapper = container.querySelector(wrapper)!;
    classTest(gridWrapper, mdClassName(100 * width));
    rerender(<Grid width={widthSecond}>{'Grid'}</Grid>);
    classTest(gridWrapper, mdClassName(100 * widthSecond));
  });
  test('should render when set width > 1', () => {
    const width = 2;
    const { container } = render(<Grid width={width}>{'Grid'}</Grid>);
    const gridWrapper = container.querySelector(wrapper)!;
    classTest(gridWrapper, mdClassName(100 * 1));
  });
  test('should render when set offset', () => {
    const width = 1 / 2;
    const offset = 1 / 4;
    const { container } = render(
      <Grid width={width} offset={offset}>
        {'Grid'}
      </Grid>,
    );
    const gridWrapper = container.querySelector(wrapper)!;
    classTest(gridWrapper, offsetClassName(100 * offset));
  });
  test('should render when set gutter', () => {
    const gutter = 8;
    const gridText = '1 / 8';
    render(
      <Grid gutter={gutter}>
        {Array.from({ length: 8 })
          .map((_, i) => i + 1)
          .map((i) => (
            <Grid key={i} width={1 / 8}>
              {gridText}
            </Grid>
          ))}
      </Grid>,
    );
    const grids = screen.getAllByText(gridText);
    grids.forEach((item) => {
      classTest(item, mdClassName(12, '500'));
      styleTest(item, `padding-left: ${gutter / 2}px; padding-right: ${gutter / 2}px;`);
    });
    styleTest(
      grids[0].parentElement!,
      `width: auto; display: block; margin-left: -${gutter / 2}px; margin-right: -${gutter / 2}px;`,
    );
  });
  test('should render when set stretch', () => {
    const gridText = 'test';
    render(
      <Grid stretch>
        {Array.from({ length: 8 })
          .map((_, i) => i + 1)
          .map((i) => (
            <Grid key={i} width={1 / 8}>
              {gridText}
            </Grid>
          ))}
      </Grid>,
    );
    const grids = screen.getAllByText(gridText);
    grids.forEach((item) => {
      styleTest(item, stretchStyle);
    });
  });
  test('should render when set responsive', () => {
    const responsive = 'sm';
    render(
      <Grid responsive={responsive}>
        {Array.from({ length: 8 })
          .map((_, i) => i + 1)
          .map((i) => (
            <Grid key={i} width={1 / 8}>
              {'test'}
            </Grid>
          ))}
      </Grid>,
    );
    // dont have render
  });
});
