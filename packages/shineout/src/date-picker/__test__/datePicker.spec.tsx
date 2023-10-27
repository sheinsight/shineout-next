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
import DatePickerWeek from '../__example__/04-week';
import DatePickerMonth from '../__example__/05-month';
import DatePickerQuarter from '../__example__/05-quarter';
import DatePickerYear from '../__example__/06-year';
import DatePickerTime from '../__example__/07-time-0';
import DatePickerTimeOther from '../__example__/07-time-1';
import DatePickerRange from '../__example__/08-range';
import DatePickerQuick from '../__example__/09-quick';
import DatePickerDisable from '../__example__/10-disable';

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
  'pickerHeaderInfo',
  'pickerHeaderIcon',
  'resultSeparator',
  'resultText',
  'picker',
  'quickPickerItem',
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
  'pickerCellToday',
  'quickPicker',
  'dayPicker',
  'wrapperDisabled',
  'pickerCellDisabled',
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
  pickerHeaderInfo,
  pickerHeaderIcon,
  pickerCellToday,
  resultSeparator,
  resultText,
  picker,
  quickPicker,
  dayPicker,
  quickPickerItem,
  wrapperDisabled,
  pickerCellDisabled,
} = createClassName(SO_PREFIX, originClasses, originItemClasses);

const nowDate = new Date();
const year = nowDate.getFullYear();
const month = nowDate.getMonth() + 1;

const styleWithShow =
  'pointer-events: none; position: absolute; z-index: -1000; display: none; opacity: 1;';
const styleByShow =
  'z-index: 1051; display: block; opacity: 1; transition: opacity 240ms ease-in-out; left: 0px;';

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
  snapshotTest(<DatePickerWeek />, 'about week');
  snapshotTest(<DatePickerMonth />, 'about month');
  snapshotTest(<DatePickerQuarter />, 'about quarter');
  snapshotTest(<DatePickerYear />, 'about year');
  snapshotTest(<DatePickerTime />, 'about time');
  snapshotTest(<DatePickerTimeOther />, 'about other time');
  snapshotTest(<DatePickerRange />, 'about range');
  snapshotTest(<DatePickerQuick />, 'about quick');
  snapshotTest(<DatePickerDisable />, 'about disable');
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
    styleTest(datePickerPickerWrapper, styleWithShow);
    const datePickerPickerHeader = datePickerPickerWrapper.querySelector(pickerHeader)!;
    const datePickerHeaderLeft = datePickerPickerHeader.querySelector(pickerHeaderLeft)!;
    const datePickerHeaderRight = datePickerPickerHeader.querySelector(pickerHeaderRight)!;
    const datePickerHeaderMid = datePickerPickerHeader.querySelector(pickerHeaderMid)!;
    classLengthTest(datePickerHeaderLeft, 'svg', 2);
    expect(datePickerHeaderMid).toBeInTheDocument();
    const headerInfos = datePickerHeaderMid.querySelectorAll(pickerHeaderInfo);
    expect(headerInfos.length).toBe(2);
    textContentTest(headerInfos[0], `${year}`);
    textContentTest(headerInfos[1], '10');
    classLengthTest(datePickerHeaderRight, 'svg', 2);
    const leftHeaderIcons = datePickerHeaderLeft.querySelectorAll(pickerHeaderIcon);
    expect(leftHeaderIcons.length).toBe(2);
    const rightHeaderIcons = datePickerHeaderRight.querySelectorAll(pickerHeaderIcon);
    expect(rightHeaderIcons.length).toBe(2);
    fireEvent.click(rightHeaderIcons[1]);
    await waitFor(async () => {
      await delay(300);
      textContentTest(headerInfos[0], `${year + 1}`);
    });
    fireEvent.click(leftHeaderIcons[0]);
    await waitFor(async () => {
      await delay(300);
      textContentTest(headerInfos[0], `${year}`);
    });
    fireEvent.click(rightHeaderIcons[0]);
    await waitFor(async () => {
      await delay(300);
      textContentTest(headerInfos[1], `${month + 1}`);
    });
    fireEvent.click(leftHeaderIcons[1]);
    await waitFor(async () => {
      await delay(300);
      textContentTest(headerInfos[1], `${month}`);
    });
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
      styleTest(datePickerPickerWrapper, styleByShow);
    });
    const cell = table
      .querySelector('tbody')
      ?.querySelectorAll('tr')[3]
      .querySelectorAll('td')[0] as Element;
    classContentTest(cell, pickerCellActive, false);
    fireEvent.click(cell);
    await waitFor(async () => {
      await delay(300);
      textContentTest(datePickerResult, `${year}-${month}-16`);
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
      table.querySelector('tbody')?.querySelectorAll('tr')[3].querySelectorAll('td')[0] as Element,
    );
    await waitFor(async () => {
      await delay(300);
      textContentTest(datePickerResult, `${year}-${month}-16`);
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
      table.querySelector('tbody')?.querySelectorAll('tr')[3].querySelectorAll('td')[0] as Element,
    );
    await waitFor(async () => {
      await delay(300);
      textContentTest(datePickerResult, `${year}-${month}-16`);
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
      table.querySelector('tbody')?.querySelectorAll('tr')[3].querySelectorAll('td')[0] as Element,
    );
    await waitFor(async () => {
      await delay(300);
      textContentTest(datePickerResult, `${year}-${month}-16 00:00:00`);
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
    textContentTest(datePickerResult, `${year}-${month}-16 01:00:00`);
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
      tbody
        .querySelectorAll('tr')[2]
        .querySelectorAll('td')
        .forEach((item) => {
          classTest(item, pickerCellActive);
        });
    });
    const datePickerHeaderMid = container.querySelector(pickerHeaderMid)!;
    const headerInfos = datePickerHeaderMid.querySelectorAll(pickerHeaderInfo);
    expect(headerInfos.length).toBe(2);
    textContentTest(headerInfos[0], `${year}`);
    textContentTest(headerInfos[1], `${month}`);
    fireEvent.click(tbody.querySelectorAll('tr')[0].querySelectorAll('td')[3]);
    textContentTest(headerInfos[1], `${month - 1}`);
  });
  test('should render when set type is month', async () => {
    const { container } = render(<DatePicker type='month' />);
    const datePickerWrapper = container.querySelector(wrapper)!;
    attributesTest(datePickerWrapper, 'data-soui-type', 'month');
    const datePickerResultWrapper = datePickerWrapper.querySelector(resultWrapper)!;
    const datePickerResult = datePickerResultWrapper.querySelector(result)!;
    const datePickerHeaderMid = datePickerWrapper.querySelector(pickerHeaderMid)!;
    const datePickerHeaderLeft = datePickerWrapper.querySelector(pickerHeaderLeft)!;
    const datePickerHeaderRight = datePickerWrapper.querySelector(pickerHeaderRight)!;
    textContentTest(datePickerHeaderMid, `${year}`);
    classLengthTest(datePickerHeaderLeft, pickerHeaderIcon, 1);
    classLengthTest(datePickerHeaderRight, pickerHeaderIcon, 1);
    fireEvent.click(datePickerHeaderLeft.querySelector(pickerHeaderIcon)!);
    await waitFor(async () => {
      await delay(300);
      textContentTest(datePickerHeaderMid, `${year - 1}`);
    });
    fireEvent.click(datePickerHeaderRight.querySelector(pickerHeaderIcon)!);
    await waitFor(async () => {
      await delay(300);
      textContentTest(datePickerHeaderMid, `${year}`);
    });
    const table = datePickerWrapper.querySelector('table')!;
    const tbody = table.querySelector('tbody')!;
    fireEvent.focus(datePickerResultWrapper);
    fireEvent.click(datePickerResultWrapper);
    await waitFor(async () => {
      await delay(300);
      classLengthTest(tbody, 'tr', 4);
      classLengthTest(tbody.querySelector('tr')!, 'td', 3);
      classTest(tbody.querySelectorAll('tr')[3].querySelectorAll('td')[0], pickerCellToday);
    });
    fireEvent.click(tbody.querySelectorAll('tr')[0].querySelectorAll('td')[0]);
    await waitFor(async () => {
      await delay(300);
      textContentTest(datePickerResult, `${year}-01`);
    });
  });
  test('should render when set type is quarter', async () => {
    const { container } = render(<DatePicker type='quarter' />);
    const datePickerWrapper = container.querySelector(wrapper)!;
    attributesTest(datePickerWrapper, 'data-soui-type', 'quarter');
    const datePickerResultWrapper = datePickerWrapper.querySelector(resultWrapper)!;
    const datePickerResult = datePickerResultWrapper.querySelector(result)!;
    const datePickerHeaderMid = datePickerWrapper.querySelector(pickerHeaderMid)!;
    const datePickerHeaderLeft = datePickerWrapper.querySelector(pickerHeaderLeft)!;
    const datePickerHeaderRight = datePickerWrapper.querySelector(pickerHeaderRight)!;
    textContentTest(datePickerHeaderMid, `${year}`);
    classLengthTest(datePickerHeaderLeft, pickerHeaderIcon, 1);
    classLengthTest(datePickerHeaderRight, pickerHeaderIcon, 1);
    fireEvent.click(datePickerHeaderLeft.querySelector(pickerHeaderIcon)!);
    await waitFor(async () => {
      await delay(300);
      textContentTest(datePickerHeaderMid, `${year - 1}`);
    });
    fireEvent.click(datePickerHeaderRight.querySelector(pickerHeaderIcon)!);
    await waitFor(async () => {
      await delay(300);
      textContentTest(datePickerHeaderMid, `${year}`);
    });
    const table = datePickerWrapper.querySelector('table')!;
    const tbody = table.querySelector('tbody')!;
    fireEvent.focus(datePickerResultWrapper);
    fireEvent.click(datePickerResultWrapper);
    await waitFor(async () => {
      await delay(300);
      classLengthTest(tbody, 'tr', 1);
      classLengthTest(tbody.querySelector('tr')!, 'td', 4);
    });
    fireEvent.click(tbody.querySelector('tr')?.querySelectorAll('td')[0] as Element);
    await waitFor(async () => {
      await delay(300);
      textContentTest(datePickerResult, `${year}-Q1`);
    });
  });
  test('should render when set type is year', async () => {
    const { container } = render(<DatePicker type='year' />);
    const datePickerWrapper = container.querySelector(wrapper)!;
    attributesTest(datePickerWrapper, 'data-soui-type', 'year');
    const datePickerResultWrapper = datePickerWrapper.querySelector(resultWrapper)!;
    const datePickerResult = datePickerResultWrapper.querySelector(result)!;
    const datePickerHeaderMid = datePickerWrapper.querySelector(pickerHeaderMid)!;
    const datePickerHeaderLeft = datePickerWrapper.querySelector(pickerHeaderLeft)!;
    const datePickerHeaderRight = datePickerWrapper.querySelector(pickerHeaderRight)!;
    const midContents = datePickerHeaderMid.querySelectorAll('span');
    expect(midContents.length).toBe(2);
    textContentTest(midContents[0], '2020');
    textContentTest(midContents[1], '2029');
    classLengthTest(datePickerHeaderLeft, pickerHeaderIcon, 1);
    classLengthTest(datePickerHeaderRight, pickerHeaderIcon, 1);
    fireEvent.click(datePickerHeaderLeft.querySelector(pickerHeaderIcon)!);
    await waitFor(async () => {
      await delay(300);
      textContentTest(datePickerHeaderMid, '2010-2019');
    });
    fireEvent.click(datePickerHeaderRight.querySelector(pickerHeaderIcon)!);
    await waitFor(async () => {
      await delay(300);
      textContentTest(datePickerHeaderMid, '2020-2029');
    });
    const table = datePickerWrapper.querySelector('table')!;
    const tbody = table.querySelector('tbody')!;
    fireEvent.focus(datePickerResultWrapper);
    fireEvent.click(datePickerResultWrapper);
    await waitFor(async () => {
      await delay(300);
      classLengthTest(tbody, 'tr', 4);
      classLengthTest(tbody.querySelector('tr')!, 'td', 3);
    });
    fireEvent.click(tbody.querySelectorAll('tr')[1]?.querySelectorAll('td')[0] as Element);
    await waitFor(async () => {
      await delay(300);
      textContentTest(datePickerResult, '2022');
    });
  });
  test('should render when set type is time', async () => {
    const { container } = render(<DatePicker type='time' />);
    const datePickerWrapper = container.querySelector(wrapper)!;
    attributesTest(datePickerWrapper, 'data-soui-type', 'time');
    const datePickerResultWrapper = datePickerWrapper.querySelector(resultWrapper)!;
    const datePickerResult = datePickerResultWrapper.querySelector(result)!;
    const datePickerBody = container.querySelector(pickerBody)!;
    fireEvent.focus(datePickerResultWrapper);
    fireEvent.click(datePickerResultWrapper);
    await waitFor(async () => {
      await delay(300);
      classLengthTest(datePickerBody, timeList, 3);
      classLengthTest(datePickerBody.querySelectorAll(timeList)[0]!, timeItem, 24);
      classLengthTest(datePickerBody.querySelectorAll(timeList)[1]!, timeItem, 60);
      classLengthTest(datePickerBody.querySelectorAll(timeList)[2]!, timeItem, 60);
    });
    const lists = datePickerBody.querySelectorAll(timeList);
    lists.forEach((item) => {
      classTest(item.querySelectorAll(timeItem)[0]!, timeItemActive);
    });
    fireEvent.scroll(lists[0]);
    fireEvent.click(lists[0].querySelectorAll(timeItem)[3]);
    await waitFor(async () => {
      await delay(300);
      textContentTest(datePickerResult, '03:00:00');
      classTest(lists[0].querySelectorAll(timeItem)[3]!, timeItemActive);
    });
  });
});
describe('DatePicker[Format]', () => {
  test('should render when set different format', async () => {
    const { container, rerender } = render(<DatePicker type='time' format='HH:mm' />);
    const datePickerResultWrapper = container.querySelector(resultWrapper)!;
    const datePickerResult = container.querySelector(result)!;
    fireEvent.focus(datePickerResultWrapper);
    fireEvent.click(datePickerResultWrapper);
    await waitFor(async () => {
      await delay(300);
    });
    const datePickerBody = container.querySelector(pickerBody)!;
    const lists = datePickerBody.querySelectorAll(timeList);
    fireEvent.click(lists[0].querySelectorAll(timeItem)[3]);
    await waitFor(async () => {
      await delay(300);
      textContentTest(datePickerResult, '03:00');
    });
    rerender(<DatePicker type='time' format='hh:mm a' />);
    fireEvent.focus(datePickerResultWrapper);
    fireEvent.click(datePickerResultWrapper);
    await waitFor(async () => {
      await delay(300);
    });
    fireEvent.click(lists[0].querySelectorAll(timeItem)[3]);
    await waitFor(async () => {
      await delay(300);
      textContentTest(datePickerResult, '03:00 AM');
    });
  });
});
describe('DatePicker[Step]', () => {
  test('should render when set hourStep', async () => {
    const { container } = render(<DatePicker type='time' hourStep={2} />);
    const datePickerResultWrapper = container.querySelector(resultWrapper)!;
    const datePickerBody = container.querySelector(pickerBody)!;
    fireEvent.focus(datePickerResultWrapper);
    fireEvent.click(datePickerResultWrapper);
    await waitFor(async () => {
      await delay(300);
      classLengthTest(datePickerBody.querySelectorAll(timeList)[0]!, timeItem, 12);
    });
  });
  test('should render when set minuteStep', async () => {
    const { container } = render(<DatePicker type='time' minuteStep={2} />);
    const datePickerResultWrapper = container.querySelector(resultWrapper)!;
    const datePickerBody = container.querySelector(pickerBody)!;
    fireEvent.focus(datePickerResultWrapper);
    fireEvent.click(datePickerResultWrapper);
    await waitFor(async () => {
      await delay(300);
      classLengthTest(datePickerBody.querySelectorAll(timeList)[1], timeItem, 30);
    });
  });
  test('should render when set secondStep', async () => {
    const { container } = render(<DatePicker type='time' secondStep={2} />);
    const datePickerResultWrapper = container.querySelector(resultWrapper)!;
    const datePickerBody = container.querySelector(pickerBody)!;
    fireEvent.focus(datePickerResultWrapper);
    fireEvent.click(datePickerResultWrapper);
    await waitFor(async () => {
      await delay(300);
      classLengthTest(datePickerBody.querySelectorAll(timeList)[2], timeItem, 30);
    });
  });
});
describe('DatePicker[Range]', () => {
  test('should render when set range', async () => {
    const { container } = render(<DatePicker type='quarter' range />);
    const datePickerResultWrapper = container.querySelector(resultWrapper)!;
    const datePickerWrapper = container.querySelector(pickerWrapper)!;
    fireEvent.focus(datePickerResultWrapper);
    fireEvent.click(datePickerResultWrapper);
    await waitFor(async () => {
      await delay(300);
    });
    const datePickerResult = datePickerResultWrapper.querySelector(result);
    textContentTest(datePickerResult?.querySelector(resultSeparator) as Element, '~');
    const DatePickTexts = datePickerResult?.querySelectorAll(resultText) as NodeListOf<Element>;
    expect(DatePickTexts?.length).toBe(2);
    textContentTest(DatePickTexts[0], '开始季度');
    textContentTest(DatePickTexts[1], '结束季度');
    const pickers = datePickerWrapper.querySelectorAll(picker);
    expect(pickers.length).toBe(2);
    fireEvent.click(pickers[0].querySelectorAll('td')[2]);
    fireEvent.click(pickers[1].querySelectorAll('td')[3]);
    await waitFor(async () => {
      await delay(300);
    });
    textContentTest(DatePickTexts[0], '2023-Q3');
    textContentTest(DatePickTexts[1], '2023-Q4');
  });
});
describe('DatePicker[QuickSelect]', () => {
  test('should render when set quickSelect', async () => {
    const QuickSelectData = [
      { name: 'Today', value: () => Date.now() },
      {
        name: 'A week later',
        value: () => {
          const now = Date.now();
          return now + 7 * 24 * 60 * 60 * 1000;
        },
      },
      {
        name: 'A month later',
        value: () => {
          const now = Date.now();
          return now + 30 * 24 * 60 * 60 * 1000;
        },
      },
    ];
    const { container } = render(<DatePicker quickSelect={QuickSelectData} />);
    const datePickerResultWrapper = container.querySelector(resultWrapper)!;
    fireEvent.focus(datePickerResultWrapper);
    fireEvent.click(datePickerResultWrapper);
    await waitFor(async () => {
      await delay(300);
    });
    const datePickerWrapper = container.querySelector(pickerWrapper)!;
    const datePickerPickers = datePickerWrapper.querySelectorAll(picker);
    expect(datePickerPickers.length).toBe(2);
    classTest(datePickerPickers[0], quickPicker);
    classTest(datePickerPickers[1], dayPicker);
    textContentTest(datePickerPickers[1].querySelectorAll(pickerHeaderInfo)[1], `${month}`);
    const quickPickerItems = datePickerPickers[0].querySelectorAll(quickPickerItem);
    expect(quickPickerItems.length).toBe(3);
    quickPickerItems.forEach((item, index) => {
      textContentTest(item, QuickSelectData[index].name);
    });
    fireEvent.click(quickPickerItems[2]);
    await waitFor(async () => {
      await delay(300);
      textContentTest(datePickerPickers[1].querySelectorAll(pickerHeaderInfo)[1], `${month + 1}`);
    });
  });
});
describe('DatePicker[Disable]', () => {
  const testAboutDisable = async (container: HTMLElement) => {
    const datePickerWrapper = container.querySelector(wrapper)!;
    const datePickerResultWrapper = datePickerWrapper.querySelector(resultWrapper)!;
    const datePickerPickerWrapper = datePickerWrapper.querySelector(pickerWrapper)!;
    classContentTest(datePickerWrapper, wrapperDisabled);
    fireEvent.focus(datePickerResultWrapper);
    fireEvent.click(datePickerResultWrapper);
    await waitFor(async () => {
      await delay(300);
      classContentTest(datePickerWrapper, wrapperFocus, false);
      expect(datePickerPickerWrapper.getAttribute('style')).not.toBe(styleByShow);
    });
  };
  test('should render when set disable', async () => {
    const { container } = render(<DatePicker disabled />);
    testAboutDisable(container);
  });
  test('should render when set disable and range', async () => {
    const { container } = render(<DatePicker range disabled />);
    testAboutDisable(container);
  });
  test('should render when set range and disable by array', async () => {
    const { container } = render(<DatePicker range disabled={[false, true]} />);
    const datePickerWrapper = container.querySelector(wrapper)!;
    const datePickerResultWrapper = datePickerWrapper.querySelector(resultWrapper)!;
    const datePickerPickerWrapper = datePickerWrapper.querySelector(pickerWrapper)!;
    const resultTexts = datePickerResultWrapper.querySelectorAll(resultText);
    textContentTest(resultTexts[0], '开始日期');
    textContentTest(resultTexts[1], '结束日期');
    classContentTest(datePickerWrapper, wrapperDisabled, false);
    fireEvent.focus(datePickerResultWrapper);
    fireEvent.click(datePickerResultWrapper);
    await waitFor(async () => {
      await delay(300);
      classContentTest(datePickerWrapper, wrapperFocus);
      styleTest(datePickerPickerWrapper, styleByShow);
    });
    const pickers = datePickerPickerWrapper.querySelectorAll(picker);
    pickers[1]
      .querySelector(pickerBody)
      ?.querySelectorAll('tr')[0]
      .querySelectorAll('td')
      .forEach((item) => {
        classTest(item, pickerCellDisabled);
      });
    fireEvent.click(
      pickers[0]
        .querySelector(pickerBody)
        ?.querySelectorAll('tr')[2]
        .querySelectorAll('td')[3] as Element,
    );
    await waitFor(async () => {
      await delay(300);
      expect(resultTexts[0].textContent).not.toBe('开始日期');
    });
    fireEvent.click(
      pickers[1]
        .querySelector(pickerBody)
        ?.querySelectorAll('tr')[2]
        .querySelectorAll('td')[3] as Element,
    );
    await waitFor(async () => {
      await delay(300);
      textContentTest(resultTexts[1], '结束日期');
    });
    screen.debug();
  });
});
