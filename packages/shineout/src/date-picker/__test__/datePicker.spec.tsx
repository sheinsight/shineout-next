import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import DatePicker from '..';
import {
  attributesTest,
  baseTest,
  classContentTest,
  classTest,
  createClassName,
  delay,
  displayTest,
  snapshotTest,
  styleTest,
  textContentTest,
} from '../../tests/utils';
import { classLengthTest } from '../../tests/structureTest';
import mountTest from '../../tests/mountTest';
import DatePickerBase from '../__example__/01-base';
import DatePickerDateTime from '../__example__/02-datetime';
import DatePickerSize from '../__example__/03-size';

type sizeType = 'small' | 'large' | 'default' | undefined;
const SO_PREFIX = 'datePicker';
const originClasses = [
  'wrapper',
  'resultWrapper',
  'result',
  'icon',
  'pickerWrapper',
  'pickerHeader',
  'pickerBody',
  'pickerFooter',
  'pickerHeaderLeft',
  'pickerHeaderRight',
  'pickerHeaderMid',
  'clear',
  'pickerFooterLeft',
  'timePicker',
  'timeList',
  'timeItem',
];
const originItemClasses = [
  'wrapperFocus',
  'disabled',
  'wrapperSmall',
  'wrapperLarge',
  'wrapperNoBorder',
  'wrapperUnderline',
  'timeItemActive',
  'pickerCellActive',
  'pickerCellBound',
];
const {
  wrapper,
  resultWrapper,
  result,
  icon,
  pickerWrapper,
  pickerHeader,
  pickerBody,
  pickerFooter,
  pickerHeaderLeft,
  pickerHeaderRight,
  pickerHeaderMid,
  wrapperFocus,
  wrapperSmall,
  wrapperLarge,
  wrapperNoBorder,
  wrapperUnderline,
  clear,
  pickerFooterLeft,
  timePicker,
  timeList,
  timeItem,
  timeItemActive,
  pickerCellActive,
  pickerCellBound,
} = createClassName(SO_PREFIX, originClasses, originItemClasses);

beforeAll(() => {
  jest.useFakeTimers();
});
afterAll(() => {
  jest.runAllTimers();
});
afterEach(cleanup);
mountTest(<DatePicker />);

describe('Alert[Base]', () => {
  displayTest(DatePicker, 'ShineoutDatePicker');
  baseTest(DatePicker, wrapper);
  snapshotTest(<DatePickerBase />);
  snapshotTest(<DatePickerDateTime />, 'about dateTime');
  snapshotTest(<DatePickerSize />, 'about size');
  test('should render default', async () => {
    const { container } = render(<DatePicker />);
    const datePickerWrapper = container.querySelector(wrapper)!;
    attributesTest(datePickerWrapper, 'data-soui-type', 'date');
    const datePickerResultWrapper = datePickerWrapper.querySelector(resultWrapper)!;
    attributesTest(datePickerResultWrapper, 'tabindex', '1');
    const datePickerResult = datePickerResultWrapper.querySelector(result)!;
    textContentTest(datePickerResult, '请选择日期');
    const datePickerIcon = datePickerResultWrapper.querySelector(icon)!;
    classLengthTest(datePickerIcon, 'svg', 1);
    const datePickerPickerWrapper = datePickerWrapper.querySelector(pickerWrapper)!;
    attributesTest(datePickerPickerWrapper, 'data-sheinx-animation-duration', 'fast');
    attributesTest(datePickerPickerWrapper, 'data-sheinx-animation-type', 'fade');
    styleTest(
      datePickerPickerWrapper,
      'pointer-events: none; position: absolute; z-index: -1000; display: none; opacity: 1;',
    );
    const datePickerPickerHeader = datePickerPickerWrapper.querySelector(pickerHeader)!;
    classLengthTest(datePickerPickerHeader.querySelector(pickerHeaderLeft)!, 'svg', 2);
    expect(datePickerPickerHeader.querySelector(pickerHeaderMid)).toBeInTheDocument();
    classLengthTest(datePickerPickerHeader.querySelector(pickerHeaderRight)!, 'svg', 2);
    const datePickerPickerBody = datePickerPickerWrapper.querySelector(pickerBody)!;
    classLengthTest(datePickerPickerBody, 'table', 1);
    const table = datePickerPickerBody.querySelector('table')!;
    classLengthTest(table, 'thead', 1);
    classLengthTest(table.querySelector('thead')!, 'th', 7);
    classLengthTest(table, 'tbody', 1);
    classLengthTest(table.querySelector('tbody')!, 'tr', 6);
    fireEvent.focus(datePickerResultWrapper);
    fireEvent.click(datePickerResultWrapper);
    await waitFor(async () => {
      await delay(300);
      classContentTest(datePickerWrapper, wrapperFocus);
      styleTest(
        datePickerPickerWrapper,
        'z-index: 1051; display: block; opacity: 1; transition: opacity 240ms ease-in-out; left: 0px;',
      );
    });
    const cell = table
      .querySelector('tbody')
      ?.querySelectorAll('tr')[3]
      .querySelectorAll('td')[0] as Element;
    classContentTest(cell, pickerCellActive, false);
    fireEvent.click(cell);
    await waitFor(async () => {
      await delay(300);
      textContentTest(datePickerResult, '2023-10-16');
      classTest(cell, pickerCellActive);
    });
    fireEvent.blur(datePickerResultWrapper);
    fireEvent.click(document);
    await waitFor(async () => {
      await delay(300);
      classContentTest(datePickerWrapper, wrapperFocus, false);
    });
  });
  test('should render when set placeholder', () => {
    const { container } = render(<DatePicker placeholder='hello' />);
    const datePickerResult = container.querySelector(result)!;
    textContentTest(datePickerResult, 'hello');
  });
  const sizeClassNamesMap: { [key: string]: string } = {
    small: wrapperSmall,
    large: wrapperLarge,
  };
  test.each(['small', 'large'])('should render when set size is %s', async (type) => {
    const { container } = render(<DatePicker size={type as sizeType} />);
    classTest(container.querySelector(wrapper)!, sizeClassNamesMap[type]);
  });
  test('should render when set showSelNow', async () => {
    const { container } = render(<DatePicker showSelNow />);
    const datePickerPickerWrapper = container.querySelector(pickerWrapper)!;
    const datePickerResultWrapper = container.querySelector(resultWrapper)!;
    const datePickerPickerFooter = datePickerPickerWrapper.querySelector(pickerFooter)!;
    expect(datePickerPickerFooter).toBeInTheDocument();
    classLengthTest(datePickerPickerFooter, 'button', 1);
    textContentTest(datePickerPickerFooter, '今天');
    fireEvent.focus(datePickerResultWrapper);
    fireEvent.click(datePickerResultWrapper);
    await waitFor(async () => {
      await delay(300);
    });
    fireEvent.click(datePickerPickerFooter.querySelector('button')!);
    await waitFor(async () => {
      await delay(300);
      expect(datePickerResultWrapper.querySelector(result)?.textContent).not.toBe('请选择日期');
    });
  });
  test('should render when set border is false', () => {
    const { container } = render(<DatePicker border={false} />);
    classTest(container.querySelector(wrapper)!, wrapperNoBorder);
  });
  test('should render when set underline', () => {
    const { container } = render(<DatePicker underline />);
    classTest(container.querySelector(wrapper)!, wrapperUnderline);
  });
  test('should render when set width is number or string', () => {
    const { container, rerender } = render(<DatePicker width={500} />);
    styleTest(container.querySelector(wrapper)!, 'width: 500px;');
    rerender(<DatePicker width='500px' />);
    styleTest(container.querySelector(wrapper)!, 'width: 500px;');
    screen.debug();
  });
});
describe('DatePicker[Clearable]', () => {
  test('should render default clearable', async () => {
    const { container } = render(<DatePicker />);
    const datePickerResultWrapper = container.querySelector(resultWrapper)!;
    const datePickerResult = datePickerResultWrapper.querySelector(result)!;
    const table = container.querySelector('table')!;
    fireEvent.focus(datePickerResultWrapper);
    fireEvent.click(datePickerResultWrapper);
    await waitFor(async () => {
      await delay(300);
    });
    fireEvent.click(
      table.querySelector('tbody')?.querySelectorAll('tr')[0].querySelectorAll('td')[0] as Element,
    );
    await waitFor(async () => {
      await delay(300);
      textContentTest(datePickerResult, '2023-09-25');
    });
    fireEvent.mouseDown(datePickerResultWrapper);
    await waitFor(async () => {
      await delay(300);
      fireEvent.click(datePickerResultWrapper.querySelector(clear)!);
    });
    await waitFor(async () => {
      await delay(300);
      textContentTest(datePickerResult, '请选择日期');
    });
  });
  test('should render when set clearable is false', async () => {
    const { container } = render(<DatePicker clearable={false} />);
    const datePickerResultWrapper = container.querySelector(resultWrapper)!;
    const table = container.querySelector('table')!;
    fireEvent.focus(datePickerResultWrapper);
    fireEvent.click(datePickerResultWrapper);
    await waitFor(async () => {
      await delay(300);
    });
    fireEvent.click(
      table.querySelector('tbody')?.querySelectorAll('tr')[0].querySelectorAll('td')[0] as Element,
    );
    await waitFor(async () => {
      await delay(300);
    });
    fireEvent.mouseDown(datePickerResultWrapper);
    await waitFor(async () => {
      await delay(300);
      expect(datePickerResultWrapper.querySelector(clear)).not.toBeInTheDocument();
    });
  });
  // TODO: clearWithUndefined
});
describe('DatePicker[Event]', () => {
  test('should render when set onChange', async () => {
    const changeFn = jest.fn();
    const { container } = render(<DatePicker onChange={changeFn} />);
    const datePickerWrapper = container.querySelector(wrapper)!;
    const datePickerResultWrapper = datePickerWrapper.querySelector(resultWrapper)!;
    const datePickerResult = datePickerResultWrapper.querySelector(result)!;
    textContentTest(datePickerResult, '请选择日期');
    const datePickerPickerWrapper = datePickerWrapper.querySelector(pickerWrapper)!;
    const datePickerPickerBody = datePickerPickerWrapper.querySelector(pickerBody)!;
    const table = datePickerPickerBody.querySelector('table')!;
    fireEvent.focus(datePickerResultWrapper);
    fireEvent.click(datePickerResultWrapper);
    await waitFor(async () => {
      await delay(300);
      expect(changeFn.mock.calls.length).toBe(1);
    });
    fireEvent.click(
      table.querySelector('tbody')?.querySelectorAll('tr')[0].querySelectorAll('td')[0] as Element,
    );
    await waitFor(async () => {
      await delay(300);
      textContentTest(datePickerResult, '2023-09-25');
      expect(changeFn.mock.calls.length).toBe(2);
    });
  });
});
describe('DatePicker[Type]', () => {
  test('should render when set type is datetime', async () => {
    const { container } = render(<DatePicker type='datetime' />);
    const datePickerWrapper = container.querySelector(wrapper)!;
    attributesTest(datePickerWrapper, 'data-soui-type', 'datetime');
    const datePickerResultWrapper = datePickerWrapper.querySelector(resultWrapper)!;
    const datePickerResult = datePickerResultWrapper.querySelector(result)!;
    const table = datePickerWrapper.querySelector('table')!;
    fireEvent.focus(datePickerResultWrapper);
    fireEvent.click(datePickerResultWrapper);
    expect(datePickerWrapper.querySelector(pickerFooter)).not.toBeInTheDocument();
    await waitFor(async () => {
      await delay(300);
    });
    fireEvent.click(
      table.querySelector('tbody')?.querySelectorAll('tr')[0].querySelectorAll('td')[0] as Element,
    );
    await waitFor(async () => {
      await delay(300);
      textContentTest(datePickerResult, '2023-09-25 00:00:00');
      expect(datePickerWrapper.querySelector(pickerFooter)).toBeInTheDocument();
    });
    const datePickerFooterLeft = datePickerWrapper.querySelector(pickerFooterLeft)!;
    const datePickerTimePicker = datePickerFooterLeft.querySelector(timePicker)!;
    fireEvent.mouseDown(datePickerFooterLeft);
    await waitFor(async () => [await delay(300)]);
    classLengthTest(datePickerTimePicker, timeList, 3);
    classLengthTest(datePickerTimePicker.querySelectorAll(timeList)[0], timeItem, 24);
    const item = datePickerTimePicker.querySelectorAll(timeList)[0].querySelectorAll(timeItem)[1];
    classTest(item, timeItemActive, false);
    fireEvent.click(item);
    classTest(item, timeItemActive);
    await waitFor(async () => [await delay(300)]);
    textContentTest(datePickerResult, '2023-09-25 01:00:00');
    screen.debug();
  });
  test('should render when set type is week', async () => {
    const { container } = render(<DatePicker type='week' />);
    const datePickerWrapper = container.querySelector(wrapper)!;
    attributesTest(datePickerWrapper, 'data-soui-type', 'week');
    const datePickerResultWrapper = datePickerWrapper.querySelector(resultWrapper)!;
    const datePickerResult = datePickerResultWrapper.querySelector(result)!;
    const table = datePickerWrapper.querySelector('table')!;
    const tbody = table.querySelector('tbody')!;
    fireEvent.focus(datePickerResultWrapper);
    fireEvent.click(datePickerResultWrapper);
    await waitFor(async () => {
      await delay(300);
      classLengthTest(tbody, 'tr', 6);
      classLengthTest(tbody.querySelectorAll('tr')[0], 'th', 1);
      classTest(tbody.querySelectorAll('tr')[0].querySelector('th')!, pickerCellBound);
      classLengthTest(tbody.querySelectorAll('tr')[0], 'td', 7);
    });
    fireEvent.mouseEnter(tbody.querySelectorAll('tr')[1].querySelectorAll('td')[3]);
    await waitFor(async () => {
      await delay(300);
    });
    fireEvent.click(tbody.querySelectorAll('tr')[2].querySelectorAll('td')[3]);
    await waitFor(async () => {
      textContentTest(
        datePickerResult,
        `2023 ${tbody.querySelectorAll('tr')[2].querySelector('th')?.textContent}`,
      );
      screen.debug();
    });
  });
});
