import { render, cleanup, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import EditableArea from '..';
import mountTest from '../../tests/mountTest';
import { classLengthTest } from '../../tests/structureTest';
import {
  attributesTest,
  baseTest,
  classContentTest,
  createClassName,
  displayTest,
  snapshotTest,
  styleContentTest,
  styleTest,
  textContentTest,
} from '../../tests/utils';
import EditableAreaBase from '../__example__/01-base';
import EditableAreaControlled from '../__example__/02-controlled';
import EditableAreaContainer from '../__example__/03-container';
import EditableAreaRenderFooter from '../__example__/t-04-renderFooter';
import EditableAreaResult from '../__example__/t-05-renderResult';

const SO_PREFIX = 'editableArea';
const originClasses = ['wrapper', 'place', 'clear', 'placeholder', 'content', 'popup'];
const originItemClasses = [
  'wrapperDisabled',
  'wrapperNoBorder',
  'wrapperError',
  'wrapperSmall',
  'wrapperLarge',
  'wrapperPaddingBox',
  'wrapperInnerTitle',
  'wrapperInnerTitleTop',
  'wrapperInnerTitleBottom',
  'popupShow',
];
const {
  wrapper,
  place,
  clear,
  content,
  popup,
  placeholder,
  wrapperDisabled,
  wrapperNoBorder,
  wrapperPaddingBox,
  wrapperInnerTitleTop,
  wrapperInnerTitleBottom,
  popupShow,
} = createClassName(SO_PREFIX, originClasses, originItemClasses);

const changeValueHandle = (container: HTMLElement, value: string) => {
  fireEvent.click(container.querySelector(place)!);
  fireEvent.change(document.querySelectorAll('textarea')[0], { target: { value } });
  fireEvent.blur(document.querySelectorAll('textarea')[0]);
};

afterEach(cleanup);
mountTest(<EditableArea />);

describe('EditableArea[Base]', () => {
  displayTest(EditableArea, 'ShineoutEditableArea');
  baseTest(EditableArea, wrapper);
  snapshotTest(<EditableAreaBase />);
  snapshotTest(<EditableAreaControlled />);
  snapshotTest(<EditableAreaContainer />);
  snapshotTest(<EditableAreaRenderFooter />);
  snapshotTest(<EditableAreaResult />);
  test('should render default', () => {
    const { container } = render(<EditableArea />);
    const editableWrapper = container.querySelector(wrapper)!;
    classContentTest(editableWrapper, wrapperNoBorder);
    const editablePlace = editableWrapper.querySelector(place)!;
    classContentTest(editablePlace, wrapperPaddingBox);
    classContentTest(editablePlace, wrapperInnerTitleTop);
    classContentTest(editablePlace, wrapperInnerTitleBottom);
    attributesTest(editablePlace, 'tabindex', '0');
    const editableContent = editablePlace.querySelector(content)!;
    expect(editableContent?.querySelector(placeholder)).toBeInTheDocument();
    const editablePopup = document.querySelector(popup)!;
    expect(editablePopup).toBeInTheDocument();
    classLengthTest(editablePopup, 'textarea', 2);
    fireEvent.click(editablePlace);
    classContentTest(editablePopup, popupShow);
  });
  test('should render when set bordered is true', () => {
    const { container } = render(<EditableArea bordered />);
    const editableWrapper = container.querySelector(wrapper)!;
    classContentTest(editableWrapper, wrapperNoBorder, false);
  });
  test('should render when set placeholder', () => {
    const placeholderContent = 'input something';
    const { container } = render(<EditableArea placeholder={placeholderContent} />);
    const editableWrapper = container.querySelector(wrapper)!;
    textContentTest(editableWrapper.querySelector(content)!, placeholderContent);
  });
  test('should render when set width', () => {
    const { container } = render(<EditableArea width={100} />);
    styleTest(container.querySelector(wrapper)!, 'width: 100px;');
  });
  test('should render when content more than one line', () => {
    const { container } = render(<EditableArea width={100} />);
    fireEvent.click(container.querySelector(place)!);
    const editablePopup = document.querySelector(popup)!;
    classContentTest(editablePopup, popupShow);
    fireEvent.change(document.querySelectorAll('textarea')[0], { target: { value: 'value\n' } });
    fireEvent.blur(document.querySelectorAll('textarea')[0]);
    classContentTest(editablePopup, popupShow, false);
    textContentTest(container.querySelector(content)!, 'value...');
  });
  test('should render when set trim', () => {
    const { container } = render(<EditableArea trim />);
    changeValueHandle(container, ' value \n');
    textContentTest(container.querySelector(content)!, 'value');
    screen.debug();
  });
  test('should render when set getPopupContainer', () => {
    render(<EditableAreaContainer />);
    screen.debug();
  });
  test('should render when set maxHeight', () => {
    const maxHeight = 200;
    render(<EditableArea maxHeight={maxHeight} />);
    screen.debug();
    styleContentTest(document.querySelectorAll('textarea')[0], `max-height: ${maxHeight}px;`);
  });
});
describe('EditableArea[Value]', () => {
  const defaultValue = 'defaultValue';
  const value = 'value';
  const testValue = (container: HTMLElement, contentValue: string) => {
    textContentTest(container.querySelector(content)!, contentValue);
    textContentTest(document.querySelectorAll('textarea')[0], contentValue);
    textContentTest(document.querySelectorAll('textarea')[1], contentValue);
  };
  test('should render when set defaultValue', () => {
    const { container } = render(<EditableArea defaultValue={defaultValue} />);
    testValue(container, defaultValue);
  });
  test('should render when set value', () => {
    const { container } = render(<EditableArea value={value} />);
    testValue(container, value);
    changeValueHandle(container, 'test\n');
    testValue(container, value);
  });
  test('should render when set clearable', () => {
    const { container, rerender } = render(<EditableArea clearable />);
    expect(container.querySelector(clear)).not.toBeInTheDocument();
    changeValueHandle(container, 'value\n');
    expect(container.querySelector(clear)).toBeInTheDocument();
    rerender(<EditableArea clearable value='hello' />);
    expect(container.querySelector(clear)).toBeInTheDocument();
  });
});
describe('EditableArea[Event]', () => {
  test('should render when set diabled', () => {
    const { container } = render(<EditableArea disabled />);
    const editableArea = container.querySelector(wrapper)!;
    classContentTest(editableArea, wrapperDisabled);
    fireEvent.click(container.querySelector(place)!);
    classContentTest(document.querySelector(popup)!, popupShow, false);
  });
});
