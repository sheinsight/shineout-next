import { cleanup, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Empty from '..';
import mountTest from '../../tests/mountTest';
import { classLengthTest } from '../../tests/structureTest';
import {
  baseTest,
  createClassName,
  displayTest,
  snapshotTest,
  textContentTest,
} from '../../tests/utils';
import EmptyBase from '../__example__/001-base';
import EmptyIcon from '../__example__/002-icon';
import EmptyImage from '../__example__/003-imge';

const SO_PREFIX = 'empty';
const originClasses = ['empty', 'wrapper', 'image', 'description'];
const originItemClasses = [] as string[];
const {
  empty,
  wrapper,
  image: imageClassName,
  description,
} = createClassName(SO_PREFIX, originClasses, originItemClasses);
afterEach(cleanup);
mountTest(<Empty />);

describe('Empty[Base]', () => {
  displayTest(Empty, 'ShineoutEmpty');
  baseTest(Empty, empty);
  snapshotTest(<EmptyBase />);
  snapshotTest(<EmptyIcon />, 'about icon');
  snapshotTest(<EmptyImage />, 'anout image');
  test('should render default', () => {
    const { container } = render(<Empty />);
    const emptyMain = container.querySelector(empty)!;
    const emptyWrapper = emptyMain.querySelector(wrapper)!;
    const emptyImage = emptyWrapper.querySelector(imageClassName)!;
    expect(emptyImage).toBeInTheDocument();
    classLengthTest(emptyImage, 'svg', 1);
    const emptyDescription = emptyWrapper.querySelector(description)!;
    expect(emptyDescription).toBeInTheDocument();
    textContentTest(emptyDescription, '暂无数据');
  });
  test('should render when set icon and description', () => {
    const { container } = render(<EmptyIcon />);
    const emptyMain = container.querySelector(empty)!;
    const emptyWrapper = emptyMain.querySelector(wrapper)!;
    const emptyImage = emptyWrapper.querySelector(imageClassName)!;
    expect(emptyImage).toBeInTheDocument();
    classLengthTest(emptyImage, 'svg', 1);
    const emptyDescription = emptyWrapper.querySelector(description)!;
    expect(emptyDescription).toBeInTheDocument();
    textContentTest(emptyDescription, 'No network');
  });
  test('should render when set icon is reactNode', () => {
    const { container } = render(<Empty icon={<div className='demo'>demo</div>} />);
    const emptyMain = container.querySelector(empty)!;
    const emptyWrapper = emptyMain.querySelector(wrapper)!;
    const emptyImage = emptyWrapper.querySelector(imageClassName)!;
    expect(emptyImage).toBeInTheDocument();
    classLengthTest(emptyImage, 'svg', 0);
    const emptyImageChildren = emptyImage.querySelector('.demo')!;
    expect(emptyImageChildren).toBeInTheDocument();
    textContentTest(emptyImageChildren, 'demo');
  });
  test('should render when set description is boolean', () => {
    const { container, rerender } = render(<Empty description={true} />);
    const emptyMain = container.querySelector(empty)!;
    const emptyWrapper = emptyMain.querySelector(wrapper)!;
    const emptyImageChildren = emptyWrapper.querySelector(description)!;
    expect(emptyImageChildren).toBeInTheDocument();
    textContentTest(emptyImageChildren, '');
    rerender(<Empty description={false} />);
    expect(emptyImageChildren).not.toBeInTheDocument();
  });
  test('should render when set imgSrc', () => {
    const { container } = render(<EmptyImage />);
    const emptyMain = container.querySelector(empty)!;
    const emptyWrapper = emptyMain.querySelector(wrapper)!;
    const emptyImage = emptyWrapper.querySelector(imageClassName)!;
    expect(emptyImage).toBeInTheDocument();
    classLengthTest(emptyImage, 'img', 1);
    const emptyDescription = emptyWrapper.querySelector(description)!;
    classLengthTest(emptyDescription, 'button', 1);
    textContentTest(emptyDescription.querySelector('button')!, 'Refresh');
  });
});
