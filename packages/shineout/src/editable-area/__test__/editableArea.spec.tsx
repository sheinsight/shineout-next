import { render, cleanup, fireEvent, screen } from '@testing-library/react';
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

const {
  footer: textareaFooterClassName
} = createClassName('textarea', ['footer'], ['']);

const changeValueHandle = (container: HTMLElement, value: string) => {
  fireEvent.click(container.querySelector(place)!);
  fireEvent.change(document.querySelectorAll('textarea')[0], { target: { value } });
  fireEvent.blur(document.querySelectorAll('textarea')[0]);
};

const defaultValue: string = 'defaultValue';
const value: string = 'value';

const testValue = (container: HTMLElement, contentValue: string) => {
  textContentTest(container.querySelector(content)!, contentValue);
  textContentTest(document.querySelectorAll('textarea')[0], contentValue);
  textContentTest(document.querySelectorAll('textarea')[1], contentValue);
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
    fireEvent.click(editablePlace);
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
  });
  // TODO
  test('should render when set getPopupContainer', () => {
    const {container} = render(<EditableAreaContainer />);
    const editablePlace = container.querySelector(place)!;
    fireEvent.click(editablePlace);
    // TODO: should container.querySelectorAll, is a bug, but no problem on the browser
    expect(document.querySelectorAll('textarea').length).toBe(2);
  });
  test('should render when set maxHeight', () => {
    const maxHeight = 200;
    const { container } = render(<EditableArea maxHeight={maxHeight} />);
    const editablePlace = container.querySelector(place)!;
    fireEvent.click(editablePlace);
    styleContentTest(document.querySelectorAll('textarea')[0], `max-height: ${maxHeight}px;`);
  });
  test('should render when set renderFooter', () => {
    const { container } = render(<EditableAreaRenderFooter />);
    fireEvent.click(container.querySelector(place)!);
    textContentTest(document.querySelector(textareaFooterClassName)!, 'Tip');
  });
});
describe('EditableArea[Value]', () => {
  test('should render when set defaultValue', () => {
    const { container } = render(<EditableArea defaultValue={defaultValue} />);
    fireEvent.click(container.querySelector(place)!);
    screen.debug()
    testValue(container, defaultValue);
  });
  test('should render when set value', () => {
    const { container } = render(<EditableArea value={value} />);
    testValue(container, value);
    changeValueHandle(container, 'test\n');
    testValue(container, value);
  });
  test('should render when set value and defaultValue at the same time', () => {
    const { container } = render(<EditableArea defaultValue={defaultValue} value={value} />);
    testValue(container, value);
  });
  test('should render when set clearable', () => {
    const { container, rerender } = render(<EditableArea clearable />);
    expect(container.querySelector(clear)).not.toBeInTheDocument();
    changeValueHandle(container, 'value\n');
    expect(container.querySelector(clear)).toBeInTheDocument();
    rerender(<EditableArea clearable value='hello' />);
    expect(container.querySelector(clear)).toBeInTheDocument();
    fireEvent.click(container.querySelector(clear)!);
    textContentTest(container.querySelector(content)!, '');
    classContentTest(document.querySelector(popup)!, popupShow);
  });
  test('should render when set renderResult', () => {
    const { container } = render(<EditableArea renderResult={(v: string) => v + 1} />);
    changeValueHandle(container, value);
    textContentTest(container.querySelector(content)!, value + 1);
    textContentTest(document.querySelectorAll('textarea')[0], value);
    textContentTest(document.querySelectorAll('textarea')[1], value);
  });
  test('should render when is controlled', () => {
    const { container } = render(<EditableAreaControlled />);
    changeValueHandle(container, value);
    testValue(container, value);
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
  test('should render when set beforeChange', () => {
    const { container } = render(<EditableArea beforeChange={(v: string) => v + 1} />);
    changeValueHandle(container, 'value');
    testValue(container, 'value1');
  });
  test('should render when set onChange', () => {
    const changeFn = jest.fn();
    const { container } = render(<EditableArea onChange={changeFn} />);
    changeValueHandle(container, 'value');
    expect(changeFn.mock.calls.length).toBe(1);
  });
  test('should render when set onBlur', () => {
    const blurFn = jest.fn();
    const { container } = render(<EditableArea onBlur={blurFn} />);
    changeValueHandle(container, 'value');
    expect(blurFn.mock.calls.length).toBe(1);
  });
  test('should render when set onFocus', () => {
    const focusFn = jest.fn();
    const { container, rerender } = render(<EditableArea onFocus={focusFn} />);
    fireEvent.click(container.querySelector(place)!);
    fireEvent.click(document.querySelectorAll('textarea')[0]);
    expect(focusFn.mock.calls.length).toBe(1);
    rerender(<EditableArea onFocus={focusFn} />);
    fireEvent.focus(container.querySelector(place)!);
    classContentTest(document.querySelector(popup)!, popupShow);
  });
});
