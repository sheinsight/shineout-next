import { act, cleanup, fireEvent, render, waitFor } from '@testing-library/react';
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
  inputValueTest,
  inputPlaceholderTest,
  styleContentTest,
  styleTest,
  styleContainTest,
  textContentTest,
} from '../../tests/utils';
import { classLengthTest } from '../../tests/structureTest';
import mountTest from '../../tests/mountTest';
// import DatePickerBase from '../__example__/01-base';
// import DatePickerDateTime from '../__example__/02-datetime';
// import DatePickerSize from '../__example__/03-size';
// import DatePickerWeek from '../__example__/04-week';
// import DatePickerMonth from '../__example__/05-month';
// import DatePickerQuarter from '../__example__/05-quarter';
// import DatePickerYear from '../__example__/06-year';
// import DatePickerTime from '../__example__/07-time-0';
// import DatePickerTimeOther from '../__example__/07-time-1';
// import DatePickerRange from '../__example__/08-range';
// import DatePickerQuick from '../__example__/09-quick';
// import DatePickerDisable from '../__example__/10-disable';
// import DatePickerDisbaleDateOne from '../__example__/11-disable-date-1';
// import DatePickerDisbaleDateTwo from '../__example__/11-disable-date-2';
// import DatePickerDisbaleDateThree from '../__example__/11-disable-date-3';
// import DatePickerInputable from '../__example__/12-inputable';
// import DatePickerAbsolute from '../__example__/13-absolute';
// import DatePickerInnerTitle from '../__example__/14-innerTitle';
// import DatePickerPosition from '../__example__/14-position';
// import DatePickerTimezone from '../__example__/15-timezone';
import DatePickerClearableWithUndefine from '../__example__/16-clearable-02';
// import DatePickerDefaultPicker from '../__example__/17-default-picker';
// import DatePickerAllowSingle from '../__example__/18-allow-single';
// import DatePickerFormat from '../__example__/19-format';
// import DatePickerMinmax from '../__example__/20-minmax';
import DatePickerControlled from '../__example__/test-001-control';
import DatePickerOpen from '../__example__/test-003-open';

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
  'pickerFooterTime',
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
  'timeItemDisabled',
  'resultAlignRight',
  'resultAlignLeft',
  'resultAlignCenter',
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
  pickerFooterTime,
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
  timeItemDisabled,
  resultAlignRight,
  resultAlignLeft,
  resultAlignCenter,
} = createClassName(SO_PREFIX, originClasses, originItemClasses);

const {
  wrapper: innerTitleWrapper,
  title: innerTitle,
  // place: innerTitlePlace,
  wrapperOpen: innerTitleWrapperOpen,
} = createClassName('inner-title', ['wrapper', 'title'], ['place', 'wrapperOpen']);

const Now = Date.now();
const nowDate = new Date(Now);

const getFormatTime = (time: number) => ('0' + time).slice(-2);

const year = nowDate.getFullYear();
const month = getFormatTime(nowDate.getMonth() + 1);
const monthWithFormat = nowDate.getMonth() + 1;
const day = getFormatTime(nowDate.getDate());
const hours = getFormatTime(nowDate.getHours());
const minutes = getFormatTime(nowDate.getMinutes());
const seconds = getFormatTime(nowDate.getSeconds());

// const styleWithoutShow = 'pointer-events: none; position: absolute; z-index: -1000; display: none;';
// const styleWithShow =
//   'z-index: 1051; display: block; left: 0px; opacity: 1; transition: opacity 120ms ease-in-out;';
// const styleWithShowRight =
//   'z-index: 1051; display: block; right: 0px; opacity: 1; transition: opacity 120ms ease-in-out;';
// const styleWithShowTopLeft =
//   'z-index: 1051; display: block; left: 0px; transform-origin: center bottom; opacity: 1; transition: opacity 120ms ease-in-out;';
// const styleWithShowTopRight =
//   'z-index: 1051; display: block; right: 0px; transform-origin: center bottom; opacity: 1; transition: opacity 120ms ease-in-out;';
// const styleWithShowOther =
//   'z-index: 1051; display: block; left: 0px; opacity: 1; transition: opacity 120ms ease-in-out;';
const pickerWrapperStyle = {
  opacity: '1',
  display: 'block',
  top: 'calc(100% + 4px)',
  left: '0px',
  "transform": "scaleY(1)",
  "transform-origin": "center top",
  "transition": "transform 240ms ease-in-out ,opacity 120ms ease-in-out",
  "z-index": "1051",
};
const pickerWrapperStyleTopLeft = {
  zIndex: '1051',
  opacity: '1',
  display: 'block',
  bottom: 'calc(100% + 4px)',
  left: '0px',
  transformOrigin: 'center bottom',
  "transform": "scaleY(1)",
  "transition": "transform 240ms ease-in-out ,opacity 120ms ease-in-out",
};
const pickerWrapperStyleTopRight = {
  zIndex: '1051',
  opacity: '1',
  display: 'block',
  bottom: 'calc(100% + 4px)',
  right: '0px',
  transformOrigin: 'center bottom',
  "transform": "scaleY(1)",
  "transition": "transform 240ms ease-in-out ,opacity 120ms ease-in-out",
};
const piCKerWrapperStyleRight = {
  zIndex: '1051',
  opacity: '1',
  display: 'block',
  top: 'calc(100% + 4px)',
  right: '0px',
  "transform": "scaleY(1)",
  "transition": "transform 240ms ease-in-out ,opacity 120ms ease-in-out",
};
beforeAll(() => {
  jest.useFakeTimers();
});
afterAll(() => {
  jest.runAllTimers();
});
afterEach(cleanup);
mountTest(<DatePicker />);

const resultTextInput = `${resultText} input`;

describe('Alert[Base]', () => {
  displayTest(DatePicker, 'ShineoutDatePicker');
  baseTest(DatePicker, wrapper);
  // snapshotTest(<DatePickerBase />);
  // snapshotTest(<DatePickerDateTime />, 'about dateTime');
  // snapshotTest(<DatePickerSize />, 'about size');
  // snapshotTest(<DatePickerWeek />, 'about week');
  // snapshotTest(<DatePickerMonth />, 'about month');
  // snapshotTest(<DatePickerQuarter />, 'about quarter');
  // snapshotTest(<DatePickerYear />, 'about year');
  // snapshotTest(<DatePickerTime />, 'about time');
  // snapshotTest(<DatePickerTimeOther />, 'about other time');
  // snapshotTest(<DatePickerRange />, 'about range');
  // snapshotTest(<DatePickerQuick />, 'about quick');
  // snapshotTest(<DatePickerDisable />, 'about disable');
  // snapshotTest(<DatePickerDisbaleDateOne />, 'about disable one');
  // snapshotTest(<DatePickerDisbaleDateTwo />, 'about disable two');
  // snapshotTest(<DatePickerDisbaleDateThree />, 'about disable three');
  // snapshotTest(<DatePickerInputable />, 'about inputable');
  // snapshotTest(<DatePickerAbsolute />, 'about absolute');
  // snapshotTest(<DatePickerInnerTitle />, 'about innerTitle');
  // snapshotTest(<DatePickerPosition />, 'about position');
  // snapshotTest(<DatePickerTimezone />, 'about timezone');
  // snapshotTest(<DatePickerDefaultPicker />, 'about defaultPicker');
  // snapshotTest(<DatePickerAllowSingle />, 'about allowSingle');
  // snapshotTest(<DatePickerFormat />, 'about format');
  // snapshotTest(<DatePickerMinmax />, 'about minmax');
  test('should render default', async () => {
    const { container } = render(<DatePicker />);
    const datePickerWrapper = container.querySelector(wrapper)!;
    attributesTest(datePickerWrapper, 'data-soui-type', 'date');
    const datePickerResultWrapper = datePickerWrapper.querySelector(resultWrapper)!;
    attributesTest(datePickerResultWrapper, 'tabindex', '1');
    const datePickerResult = datePickerResultWrapper.querySelector(resultTextInput)!;
    inputPlaceholderTest(datePickerResult, 'Please select date');
    const datePickerIcon = datePickerResultWrapper.querySelector(icon)!;
    classLengthTest(datePickerIcon, 'svg', 1);

    fireEvent.click(datePickerIcon);
    await waitFor(async () => {
      await delay(200);
    });

    const datePickerPickerWrapper = datePickerWrapper.querySelector(pickerWrapper)!;
    styleContainTest(datePickerPickerWrapper, pickerWrapperStyle);
    const datePickerPickerHeader = datePickerPickerWrapper.querySelector(pickerHeader)!;
    const datePickerHeaderLeft = datePickerPickerHeader.querySelector(pickerHeaderLeft)!;
    const datePickerHeaderRight = datePickerPickerHeader.querySelector(pickerHeaderRight)!;
    const datePickerHeaderMid = datePickerPickerHeader.querySelector(pickerHeaderMid)!;
    classLengthTest(datePickerHeaderLeft, 'svg', 2);
    expect(datePickerHeaderMid).toBeInTheDocument();

    const headerInfos = datePickerHeaderMid.querySelectorAll(pickerHeaderInfo);
    expect(headerInfos.length).toBe(2);
    textContentTest(headerInfos[0], `${year}`);
    textContentTest(headerInfos[1], `${monthWithFormat}`);
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
      textContentTest(headerInfos[1], `${Number(month === '12' ? 0 : month) + 1}`);
    });
    fireEvent.click(leftHeaderIcons[1]);
    await waitFor(async () => {
      await delay(300);
      textContentTest(headerInfos[1], `${monthWithFormat}`);
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
      styleContainTest(datePickerPickerWrapper, pickerWrapperStyle);
    });
    const cell = table
      .querySelector('tbody')
      ?.querySelectorAll('tr')[3]
      .querySelectorAll('td')[0] as Element;
    classContentTest(cell, pickerCellActive, false);
    fireEvent.click(cell);
    await waitFor(async () => {
      await delay(300);
      inputValueTest(datePickerResult, `${year}-${month}-${cell.textContent}`);
      classTest(cell, pickerCellActive);
    });
    fireEvent.click(headerInfos[0]);
    await waitFor(async () => {
      await delay(300);
    });
    classLengthTest(
      container
        .querySelector(pickerBody)
        ?.querySelector('table')
        ?.querySelector('tbody') as Element,
      'tr',
      4,
    );
    fireEvent.blur(datePickerResultWrapper);
    fireEvent.click(document);
    await waitFor(async () => {
      await delay(300);
      classContentTest(datePickerWrapper, wrapperFocus, false);
    });
  });
  test('should render when set placeholder', () => {
    const { container } = render(<DatePicker placeholder='hello' />);
    const datePickerResult = container.querySelector(resultTextInput)!;
    inputPlaceholderTest(datePickerResult, 'hello');
  });
  test('should render when set placeholder is array', () => {
    const start = 'start';
    const end = 'end';
    const { container } = render(<DatePicker range placeholder={[start, end]} />);
    const resultTexts = container.querySelectorAll(`${resultText} input`);
    inputPlaceholderTest(resultTexts[0], start);
    inputPlaceholderTest(resultTexts[1], end);
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
    const { container, rerender } = render(<DatePicker showSelNow />);

    const datePickerResultWrapper = container.querySelector(resultWrapper)!;
    const datePickerIcon = datePickerResultWrapper.querySelector(icon)!;
    fireEvent.click(datePickerIcon);
    await waitFor(async () => {
      await delay(200);
    });
    const datePickerPickerWrapper = container.querySelector(pickerWrapper)!;
    const datePickerPickerFooter = datePickerPickerWrapper.querySelector(pickerFooter)!;
    expect(datePickerPickerFooter).toBeInTheDocument();
    classLengthTest(datePickerPickerFooter, 'a', 1);
    textContentTest(datePickerPickerFooter, 'Today');
    fireEvent.focus(datePickerResultWrapper);
    fireEvent.click(datePickerResultWrapper);
    await waitFor(async () => {
      await delay(300);
    });
    fireEvent.click(datePickerPickerFooter.querySelector('a')!);
    await waitFor(async () => {
      await delay(300);
      expect(datePickerResultWrapper.querySelector(result)?.textContent).not.toBe(
        'Please select date',
      );
    });
    rerender(<DatePicker type='datetime' showSelNow />);
    textContentTest(
      container.querySelector(pickerFooter)?.querySelector('a') as Element,
      'Current',
    );
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
    const datePickerResult = datePickerResultWrapper.querySelector(resultTextInput)!;

    fireEvent.focus(datePickerResultWrapper);
    fireEvent.click(datePickerResultWrapper);
    await waitFor(async () => {
      await delay(200);
    });

    const table = container.querySelector('table')!;
    const cell = table
      .querySelector('tbody')
      ?.querySelectorAll('tr')[3]
      .querySelectorAll('td')[0] as Element;
    fireEvent.click(cell);
    await waitFor(async () => {
      await delay(300);
      inputValueTest(datePickerResult, `${year}-${month}-${cell.textContent}`);
    });
    fireEvent.mouseDown(datePickerResultWrapper);
    await waitFor(async () => {
      await delay(300);
      fireEvent.click(datePickerResultWrapper.querySelector(clear)!);
    });
    await waitFor(async () => {
      await delay(300);
      inputPlaceholderTest(datePickerResult, 'Please select date');
    });
  });
  test('should render when set clearable is false', async () => {
    const { container } = render(<DatePicker clearable={false} />);
    const datePickerResultWrapper = container.querySelector(resultWrapper)!;
    fireEvent.focus(datePickerResultWrapper);
    fireEvent.click(datePickerResultWrapper);
    await waitFor(async () => {
      await delay(200);
    });
    const table = container.querySelector('table')!;
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
  test('should render when set clearWithUndefined', async () => {
    const value = '2022-02-22';
    const { container } = render(<DatePickerClearableWithUndefine />);
    const datePickerWrapper = container.querySelector(wrapper)!;
    const datePickerResultWrapper = datePickerWrapper.querySelector(resultWrapper)!;

    const resultInput = datePickerResultWrapper.querySelector(resultTextInput)!;
    inputValueTest(resultInput, value);

    const clearButton = datePickerResultWrapper.querySelector(clear)?.querySelector('svg') ?? null;
    if (clearButton) {
      fireEvent.click(clearButton);
    }

    await waitFor(async () => {
      await delay(500);
    });

    inputValueTest(resultInput, '');
  });
});
describe('DatePicker[Event]', () => {
  test('should render when set onChange and beforeChange', async () => {
    const changeFn = jest.fn();
    const beforeChangeFn = jest.fn();
    const { container } = render(<DatePicker onChange={changeFn} beforeChange={beforeChangeFn} />);
    const datePickerWrapper = container.querySelector(wrapper)!;
    const datePickerResultWrapper = datePickerWrapper.querySelector(resultWrapper)!;
    const datePickerResult = datePickerResultWrapper.querySelector(resultTextInput)!;
    inputPlaceholderTest(datePickerResult, 'Please select date');
    fireEvent.focus(datePickerResultWrapper);
    fireEvent.click(datePickerResultWrapper);
    await waitFor(async () => {
      await delay(300);
    });
    const datePickerPickerWrapper = datePickerWrapper.querySelector(pickerWrapper)!;
    const datePickerPickerBody = datePickerPickerWrapper.querySelector(pickerBody)!;
    const table = datePickerPickerBody.querySelector('table')!;

    const cell = table
      .querySelector('tbody')
      ?.querySelectorAll('tr')[3]
      .querySelectorAll('td')[0] as Element;
    fireEvent.click(cell);
    await waitFor(async () => {
      await delay(300);
      inputValueTest(datePickerResult, `${year}-${month}-${cell.textContent}`);
      expect(changeFn.mock.calls.length).toBe(1);
      expect(beforeChangeFn.mock.calls.length).toBe(1);
    });
  });
  test('should render when is controlled', async () => {
    const { container } = render(<DatePickerControlled />);
    const datePickerWrapper = container.querySelector(wrapper)!;
    const datePickerResultWrapper = datePickerWrapper.querySelector(resultWrapper)!;
    const datePickerResult = datePickerResultWrapper.querySelector(resultTextInput)!;
    inputPlaceholderTest(datePickerResult, 'Select date');
    fireEvent.focus(datePickerResultWrapper);
    fireEvent.click(datePickerResultWrapper);
    await waitFor(async () => {
      await delay(300);
    });
    const datePickerPickerWrapper = datePickerWrapper.querySelector(pickerWrapper)!;
    const datePickerPickerBody = datePickerPickerWrapper.querySelector(pickerBody)!;
    const table = datePickerPickerBody.querySelector('table')!;

    const cell = table
      .querySelector('tbody')
      ?.querySelectorAll('tr')[3]
      .querySelectorAll('td')[0] as Element;
    fireEvent.click(cell);
    await waitFor(async () => {
      await delay(300);
      inputValueTest(datePickerResult, `${year}-${month}-${cell.textContent}`);
    });
  });
  test('should render when set onBlur', async () => {
    const blurFn = jest.fn();
    const { container } = render(<DatePicker onBlur={blurFn} />);
    const datePickerResultWrapper = container.querySelector(resultWrapper)!;
    fireEvent.focus(datePickerResultWrapper);
    fireEvent.click(datePickerResultWrapper);
    fireEvent.blur(datePickerResultWrapper);
    await waitFor(async () => {
      await delay(300);
    });
    expect(blurFn.mock.calls.length).toBe(1);
  });
  test('should render when set onCollapse', async () => {
    const collapseFn = jest.fn();
    const { container } = render(<DatePicker onCollapse={collapseFn} />);
    const datePickerResultWrapper = container.querySelector(resultWrapper)!;
    fireEvent.click(datePickerResultWrapper);
    await waitFor(async () => {
      await delay(300);
    });
    expect(collapseFn.mock.calls.length).toBe(1);
    fireEvent.blur(datePickerResultWrapper);
    fireEvent.mouseDown(document);
    await waitFor(async () => {
      await delay(300);
    });
    expect(collapseFn.mock.calls.length).toBe(2);
  });
  test('should render when set onFocus', async () => {
    const focusFn = jest.fn();
    const { container } = render(<DatePicker onFocus={focusFn} />);
    const datePickerResultWrapper = container.querySelector(resultWrapper)!;
    fireEvent.focus(datePickerResultWrapper);
    await waitFor(async () => {
      await delay(300);
    });
    expect(focusFn.mock.calls.length).toBe(1);
  });
  test('should render when set onPickerChange', async () => {
    const pickerChangeFn = jest.fn();
    const { container } = render(<DatePicker onPickerChange={pickerChangeFn} />);
    const datePickerResultWrapper = container.querySelector(resultWrapper)!;

    fireEvent.focus(datePickerResultWrapper);
    fireEvent.click(datePickerResultWrapper);
    fireEvent.blur(datePickerResultWrapper);
    await waitFor(async () => {
      await delay(300);
    });
    const table = container.querySelector('table')!;
    const cell = table
      .querySelector('tbody')
      ?.querySelectorAll('tr')[3]
      .querySelectorAll('td')[0] as Element;
    fireEvent.click(cell);
    await waitFor(async () => {
      await delay(300);
    });
    expect(pickerChangeFn.mock.calls.length).toBe(1);
  });
  test('should render when doubleClick', async () => {
    const { container } = render(<DatePicker range type='datetime' />);
    const datePickerResultWrapper = container.querySelector(resultWrapper)!;

    fireEvent.focus(datePickerResultWrapper);
    fireEvent.click(datePickerResultWrapper);
    fireEvent.blur(datePickerResultWrapper);
    await waitFor(async () => {
      await delay(300);
    });
    const datePickerPickerWrapper = container.querySelector(pickerWrapper)!;
    const pickers = datePickerPickerWrapper.querySelectorAll(`${picker}:not(${timePicker})`)!;
    const cell = pickers[0]
      .querySelector(pickerBody)
      ?.querySelector('table')
      ?.querySelector('tbody')
      ?.querySelectorAll('tr')[3]
      .querySelectorAll('td')[0] as Element;
    fireEvent.click(cell);
    await waitFor(async () => {
      await delay(300);
    });
    const results = datePickerResultWrapper.querySelectorAll(`${resultText} input`);
    inputValueTest(results[0], `${year}-${month}-${cell.textContent} 00:00:00`);
    fireEvent.doubleClick(cell);
    await waitFor(async () => {
      await delay(300);
    });
    inputValueTest(results[0], `${year}-${month}-${cell.textContent} 00:00:00`);
    inputValueTest(results[1], `${year}-${month}-${cell.textContent} 00:00:00`);
    const endCell = pickers[1]
      .querySelector(pickerBody)
      ?.querySelector('table')
      ?.querySelector('tbody')
      ?.querySelectorAll('tr')[4]
      .querySelectorAll('td')[0] as Element;
    fireEvent.doubleClick(endCell);
    await waitFor(async () => {
      await delay(300);
    });
    inputValueTest(results[0], `${year}-${month}-${endCell.textContent} 00:00:00`);
    inputValueTest(results[1], `${year}-${month}-${endCell.textContent} 00:00:00`);
  });
});
describe('DatePicker[Type]', () => {
  test('should render when set type is datetime', async () => {
    const { container } = render(<DatePicker type='datetime' />);
    const datePickerWrapper = container.querySelector(wrapper)!;
    attributesTest(datePickerWrapper, 'data-soui-type', 'datetime');
    const datePickerResultWrapper = datePickerWrapper.querySelector(resultWrapper)!;
    const datePickerResult = datePickerResultWrapper.querySelector(resultTextInput)!;

    fireEvent.focus(datePickerResultWrapper);
    fireEvent.click(datePickerResultWrapper);
    expect(datePickerWrapper.querySelector(pickerFooter)).not.toBeInTheDocument();
    await waitFor(async () => {
      await delay(300);
    });
    const table = datePickerWrapper.querySelector('table')!;
    const cell = table
      .querySelector('tbody')
      ?.querySelectorAll('tr')[3]
      .querySelectorAll('td')[0] as Element;
    fireEvent.click(cell);
    await waitFor(async () => {
      await delay(300);
      inputValueTest(datePickerResult, `${year}-${month}-${cell.textContent} 00:00:00`);
      expect(datePickerWrapper.querySelector(pickerFooter)).toBeInTheDocument();
    });
    const datepickerFooterTime = datePickerWrapper.querySelector(pickerFooterTime)!;
    const datePickerTimePicker = datepickerFooterTime.querySelector(timePicker)!;
    fireEvent.mouseDown(datepickerFooterTime);
    await waitFor(async () => [await delay(300)]);
    classLengthTest(datePickerTimePicker, timeList, 3);
    classLengthTest(datePickerTimePicker.querySelectorAll(timeList)[0], timeItem, 24);
    const item = datePickerTimePicker.querySelectorAll(timeList)[0].querySelectorAll(timeItem)[1];
    classTest(item, timeItemActive, false);
    fireEvent.click(item);
    classTest(item, timeItemActive);
    await waitFor(async () => [await delay(300)]);
    inputValueTest(datePickerResult, `${year}-${month}-${cell.textContent} 01:00:00`);
  });
  test('should render when set type is week', async () => {
    const { container } = render(<DatePicker type='week' />);
    const datePickerWrapper = container.querySelector(wrapper)!;
    attributesTest(datePickerWrapper, 'data-soui-type', 'week');
    const datePickerResultWrapper = datePickerWrapper.querySelector(resultWrapper)!;
    const datePickerResult = datePickerResultWrapper.querySelector(resultTextInput)!;
    fireEvent.focus(datePickerResultWrapper);
    fireEvent.click(datePickerResultWrapper);
    await waitFor(async () => {
      await delay(300);
    });
    const table = datePickerWrapper.querySelector('table')!;
    const tbody = table.querySelector('tbody')!;
    classLengthTest(tbody, 'tr', 6);
    classLengthTest(tbody.querySelectorAll('tr')[0], 'th', 1);
    classTest(tbody.querySelectorAll('tr')[0].querySelector('th')!, pickerCellBound);
    classLengthTest(tbody.querySelectorAll('tr')[0], 'td', 7);
    fireEvent.mouseEnter(tbody.querySelectorAll('tr')[1].querySelectorAll('td')[3]);
    await waitFor(async () => {
      await delay(300);
    });
    fireEvent.click(tbody.querySelectorAll('tr')[2].querySelectorAll('td')[3]);
    await waitFor(async () => {
      let month = `${tbody.querySelectorAll('tr')[2].querySelector('th')?.textContent}`;
      if (month.length === 1) month = `0${month}`;
      inputValueTest(datePickerResult, `${year}-${month}W`);
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
    textContentTest(headerInfos[1], `${monthWithFormat}`);
    fireEvent.click(headerInfos[1]);
    await waitFor(async () => {
      await delay(300);
    });
    classLengthTest(
      container
        .querySelector(pickerBody)
        ?.querySelector('table')
        ?.querySelector('tbody') as Element,
      'tr',
      4,
    );
  });
  test('should render when set type is month', async () => {
    const { container } = render(<DatePicker type='month' />);
    const datePickerWrapper = container.querySelector(wrapper)!;
    attributesTest(datePickerWrapper, 'data-soui-type', 'month');
    const datePickerResultWrapper = datePickerWrapper.querySelector(resultWrapper)!;
    const datePickerResult = datePickerResultWrapper.querySelector(resultTextInput)!;
    fireEvent.focus(datePickerResultWrapper);
    fireEvent.click(datePickerResultWrapper);
    await waitFor(async () => {
      await delay(300);
    });
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
    });
    tbody.querySelectorAll('tr').forEach((trs) => {
      trs.querySelectorAll('td').forEach((td) => {
        if (td.textContent !== month) return;
        classTest(td, pickerCellToday);
      });
    });
    fireEvent.click(tbody.querySelectorAll('tr')[0].querySelectorAll('td')[0]);
    await waitFor(async () => {
      await delay(300);
      inputValueTest(datePickerResult, `${year}-01`);
    });
  });
  test('should render when set type is quarter', async () => {
    const { container } = render(<DatePicker type='quarter' />);
    const datePickerWrapper = container.querySelector(wrapper)!;
    attributesTest(datePickerWrapper, 'data-soui-type', 'quarter');
    const datePickerResultWrapper = datePickerWrapper.querySelector(resultWrapper)!;
    const datePickerResult = datePickerResultWrapper.querySelector(resultTextInput)!;
    fireEvent.focus(datePickerResultWrapper);
    fireEvent.click(datePickerResultWrapper);
    await waitFor(async () => {
      await delay(300);
    });
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
      inputValueTest(datePickerResult, `${year}-Q1`);
    });
  });
  test('should render when set type is year', async () => {
    const { container } = render(<DatePicker type='year' />);
    const datePickerWrapper = container.querySelector(wrapper)!;
    attributesTest(datePickerWrapper, 'data-soui-type', 'year');
    const datePickerResultWrapper = datePickerWrapper.querySelector(resultWrapper)!;
    const datePickerResult = datePickerResultWrapper.querySelector(resultTextInput)!;
    fireEvent.focus(datePickerResultWrapper);
    fireEvent.click(datePickerResultWrapper);
    await waitFor(async () => {
      await delay(300);
    });
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
    fireEvent.blur(datePickerResult);
    await act(async () => {
      jest.runAllTimers(); // 如果有定时器
    });
    await waitFor(async () => {
      await delay(300);
      inputValueTest(datePickerResult, '2022');
    });
  });
  test('should render when set type is time', async () => {
    const { container } = render(<DatePicker type='time' />);
    const datePickerWrapper = container.querySelector(wrapper)!;
    attributesTest(datePickerWrapper, 'data-soui-type', 'time');
    const datePickerResultWrapper = datePickerWrapper.querySelector(resultWrapper)!;
    const datePickerResult = datePickerResultWrapper.querySelector(resultTextInput)!;

    fireEvent.focus(datePickerResultWrapper);
    fireEvent.click(datePickerResultWrapper);
    await waitFor(async () => {
      await delay(300);
    });
    const datePickerBody = container.querySelector(pickerBody)!;
    classLengthTest(datePickerBody, timeList, 3);
    classLengthTest(datePickerBody.querySelectorAll(timeList)[0]!, timeItem, 24);
    classLengthTest(datePickerBody.querySelectorAll(timeList)[1]!, timeItem, 60);
    classLengthTest(datePickerBody.querySelectorAll(timeList)[2]!, timeItem, 60);
    const lists = datePickerBody.querySelectorAll(timeList);
    lists.forEach((item) => {
      classTest(item.querySelectorAll(timeItem)[0]!, timeItemActive);
    });
    fireEvent.scroll(lists[0]);
    fireEvent.click(lists[0].querySelectorAll(timeItem)[3]);
    await waitFor(async () => {
      await delay(300);
      inputValueTest(datePickerResult, '03:00:00');
      classTest(lists[0].querySelectorAll(timeItem)[3]!, timeItemActive);
    });
  });
});
describe('DatePicker[Value/DefaultValue/DefaultTime]', () => {
  test('should render when set defaultValue', () => {
    const { container } = render(<DatePicker defaultValue={Now} />);
    inputValueTest(container.querySelector(resultTextInput)!, `${year}-${month}-${day}`);
  });
  test('should render when set defaultValue is array', () => {
    const { container } = render(<DatePicker range defaultValue={[Now, Now]} />);

    inputValueTest(container.querySelectorAll(resultTextInput)[0], `${year}-${month}-${day}`);
    inputValueTest(container.querySelectorAll(resultTextInput)[1], `${year}-${month}-${day}`);
  });
  test('should render when set value', () => {
    const { container } = render(<DatePicker value={Now} />);
    inputValueTest(container.querySelector(resultTextInput)!, `${year}-${month}-${day}`);
  });
  test('should render when set value is array', () => {
    const { container } = render(<DatePicker range value={[Now, Now]} />);
    inputValueTest(container.querySelectorAll(resultTextInput)[0], `${year}-${month}-${day}`);
    inputValueTest(container.querySelectorAll(resultTextInput)[1], `${year}-${month}-${day}`);
  });
  test('should render when set value and defaultValue', () => {
    const nowDate = new Date();

    nowDate.setDate(nowDate.getDate() + 1);

    const year = nowDate.getFullYear();
    const month = nowDate.getMonth() + 1;
    const day = nowDate.getDate();

    const expectedDateString = `${year}-${getFormatTime(month)}-${getFormatTime(day)}`;

    const { container } = render(<DatePicker defaultValue={Now} value={nowDate.getTime()} />);

    inputValueTest(container.querySelector(resultTextInput)!, expectedDateString);
  });
  test('should render when set defaultTime', async () => {
    const defaultTime = '10:01:02';
    const { container } = render(<DatePicker type='datetime' defaultTime={defaultTime} />);
    const datePickerWrapper = container.querySelector(wrapper)!;
    const datePickerResultWrapper = datePickerWrapper.querySelector(resultWrapper)!;
    fireEvent.focus(datePickerResultWrapper);
    fireEvent.click(datePickerResultWrapper);
    await waitFor(async () => {
      await delay(300);
    });
    const table = datePickerWrapper.querySelector('table')!;
    const cell = table
      .querySelector('tbody')
      ?.querySelectorAll('tr')[3]
      .querySelectorAll('td')[0] as Element;
    fireEvent.click(cell);
    inputValueTest(
      container.querySelector(resultTextInput)!,
      `${year}-${month}-${cell.textContent} ${defaultTime}`,
    );
  });
});
describe('DatePicker[Format]', () => {
  test('should render when set different format', async () => {
    const errorSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    const { container, rerender } = render(<DatePicker type='time' format='HH:mm' />);
    const datePickerResultWrapper = container.querySelector(resultWrapper)!;
    const datePickerResult = container.querySelector(resultTextInput)!;
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
      inputValueTest(datePickerResult, '03:00');
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
      inputValueTest(datePickerResult, '03:00 AM');
    });
    expect(errorSpy).toHaveBeenCalledWith(
      '[shineout] invalid datepicker format: hh:mm a please use hh:mm A',
    );
  });
  test('should render when set format and formatResult', async () => {
    const { container, rerender } = render(
      <DatePicker format='x' type='datetime' defaultValue={Now} />,
    );
    const datePickerWrapper = container.querySelector(wrapper)!;
    const datePickerResultWrapper = datePickerWrapper.querySelector(resultWrapper)!;
    const datePickerResult = datePickerResultWrapper.querySelector(resultTextInput)!;
    inputValueTest(datePickerResult, String(Now));
    rerender(
      <DatePicker
        format='x'
        type='datetime'
        defaultValue={Now}
        formatResult={'YYYY-MM-DD HH:mm:ss'}
      />,
    );
    inputValueTest(datePickerResult, `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`);
  });
});
describe('DatePicker[Step]', () => {
  test('should render when set hourStep', async () => {
    const { container } = render(<DatePicker type='time' hourStep={2} />);
    const datePickerResultWrapper = container.querySelector(resultWrapper)!;

    fireEvent.focus(datePickerResultWrapper);
    fireEvent.click(datePickerResultWrapper);
    await waitFor(async () => {
      await delay(300);
      const datePickerBody = container.querySelector(pickerBody)!;
      classLengthTest(datePickerBody.querySelectorAll(timeList)[0]!, timeItem, 12);
    });
  });
  test('should render when set minuteStep', async () => {
    const { container } = render(<DatePicker type='time' minuteStep={2} />);
    const datePickerResultWrapper = container.querySelector(resultWrapper)!;

    fireEvent.focus(datePickerResultWrapper);
    fireEvent.click(datePickerResultWrapper);
    await waitFor(async () => {
      await delay(300);
      const datePickerBody = container.querySelector(pickerBody)!;
      classLengthTest(datePickerBody.querySelectorAll(timeList)[1], timeItem, 30);
    });
  });
  test('should render when set secondStep', async () => {
    const { container } = render(<DatePicker type='time' secondStep={2} />);
    const datePickerResultWrapper = container.querySelector(resultWrapper)!;
    fireEvent.focus(datePickerResultWrapper);
    fireEvent.click(datePickerResultWrapper);
    await waitFor(async () => {
      await delay(300);
      const datePickerBody = container.querySelector(pickerBody)!;
      classLengthTest(datePickerBody.querySelectorAll(timeList)[2], timeItem, 30);
    });
  });
});
describe('DatePicker[Range]', () => {
  test('should render when set range is boolean', async () => {
    const { container } = render(<DatePicker type='quarter' range />);
    const datePickerResultWrapper = container.querySelector(resultWrapper)!;

    fireEvent.focus(datePickerResultWrapper);
    fireEvent.click(datePickerResultWrapper);
    await waitFor(async () => {
      await delay(300);
    });
    const datePickerWrapper = container.querySelector(pickerWrapper)!;
    const datePickerResult = datePickerResultWrapper.querySelector(result);
    textContentTest(datePickerResult?.querySelector(resultSeparator) as Element, '~');
    const DatePickTexts = datePickerResult?.querySelectorAll(
      resultTextInput,
    ) as NodeListOf<Element>;
    expect(DatePickTexts?.length).toBe(2);
    inputPlaceholderTest(DatePickTexts[0], 'Start quarter');
    inputPlaceholderTest(DatePickTexts[1], 'End quarter');
    const pickers = datePickerWrapper.querySelectorAll(picker);
    expect(pickers.length).toBe(2);
    fireEvent.click(pickers[0].querySelectorAll('td')[2]);
    fireEvent.click(pickers[1].querySelectorAll('td')[3]);
    await waitFor(async () => {
      await delay(300);
    });
    inputValueTest(DatePickTexts[0], `${year}-Q3`);
    inputValueTest(DatePickTexts[1], `${year}-Q4`);
  });
  test('should render when set range and type is year', async () => {
    const { container } = render(<DatePicker type='year' range />);
    const datePickerResultWrapper = container.querySelector(resultWrapper)!;
    const results = datePickerResultWrapper.querySelectorAll(resultTextInput);
    fireEvent.focus(datePickerResultWrapper);
    fireEvent.click(datePickerResultWrapper);
    await waitFor(async () => {
      await delay(300);
    });
    const pickers = container
      .querySelector(pickerWrapper)
      ?.querySelectorAll(picker) as NodeListOf<Element>;
    fireEvent.click(
      pickers[0]
        .querySelector('tbody')
        ?.querySelectorAll('tr')[1]
        .querySelectorAll('td')[2] as Element,
    );
    fireEvent.click(
      pickers[1]
        .querySelector('tbody')
        ?.querySelectorAll('tr')[1]
        .querySelectorAll('td')[2] as Element,
    );
    await waitFor(async () => {
      await delay(300);
    });
    attributesTest(
      results[0],
      'value',
      pickers[0].querySelector('tbody')?.querySelectorAll('tr')[1].querySelectorAll('td')[2]
        .textContent as string,
    );
    attributesTest(
      results[1],
      'value',
      pickers[1].querySelector('tbody')?.querySelectorAll('tr')[1].querySelectorAll('td')[2]
        .textContent as string,
    );
    fireEvent.focus(datePickerResultWrapper);
    fireEvent.click(datePickerResultWrapper);
    await waitFor(async () => {
      await delay(300);
    });
    fireEvent.click(
      pickers[1]
        .querySelector('tbody')
        ?.querySelectorAll('tr')[2]
        .querySelectorAll('td')[2] as Element,
    );
    fireEvent.click(
      pickers[0]
        .querySelector('tbody')
        ?.querySelectorAll('tr')[0]
        .querySelectorAll('td')[2] as Element,
    );
    await waitFor(async () => {
      await delay(300);
    });
    attributesTest(
      results[0],
      'value',
      pickers[0].querySelector('tbody')?.querySelectorAll('tr')[0].querySelectorAll('td')[2]
        .textContent as string,
    );
    attributesTest(
      results[1],
      'value',
      pickers[1].querySelector('tbody')?.querySelectorAll('tr')[2].querySelectorAll('td')[2]
        .textContent as string,
    );
  });
  test('should render when set range is number', async () => {
    const { container } = render(<DatePicker range={86400 * 100} type='month' />);
    const datePickerResultWrapper = container.querySelector(resultWrapper)!;

    fireEvent.focus(datePickerResultWrapper);
    fireEvent.click(datePickerResultWrapper);
    await waitFor(async () => {
      await delay(300);
    });
    const datePickerWrapper = container.querySelector(pickerWrapper)!;
    const pickers = datePickerWrapper.querySelectorAll(picker);
    const cell = pickers[0]
      .querySelector(pickerBody)
      ?.querySelectorAll('tr')[0]
      .querySelectorAll('td')[2] as Element;
    fireEvent.click(cell);
    await waitFor(async () => {
      await delay(300);
    });
    const resultTexts = container
      .querySelector(resultWrapper)
      ?.querySelectorAll(`${resultText} input`) as NodeListOf<Element>;
    inputValueTest(resultTexts[0], `${year}-${getFormatTime(Number(cell.textContent))}`);
    fireEvent.click(
      pickers[1]
        .querySelector(pickerBody)
        ?.querySelectorAll('tr')[2]
        .querySelectorAll('td')[2] as Element,
    );
    await waitFor(async () => {
      await delay(300);
    });
    inputPlaceholderTest(resultTexts[1], 'End month');
    const cellOther = pickers[1]
      .querySelector(pickerBody)
      ?.querySelectorAll('tr')[1]
      .querySelectorAll('td')[2] as Element;
    fireEvent.click(cellOther);
    await waitFor(async () => {
      await delay(300);
    });
    inputValueTest(resultTexts[1], `${year}-${getFormatTime(Number(cellOther.textContent))}`);
  });
  test('should render when set range is number and click order to change', async () => {
    const { container } = render(<DatePicker range={86400 * 100} type='month' />);
    const datePickerResultWrapper = container.querySelector(resultWrapper)!;

    fireEvent.focus(datePickerResultWrapper);
    fireEvent.click(datePickerResultWrapper);
    await waitFor(async () => {
      await delay(300);
    });
    const datePickerWrapper = container.querySelector(pickerWrapper)!;
    const pickers = datePickerWrapper.querySelectorAll(picker);
    const cell = pickers[1]
      .querySelector(pickerBody)
      ?.querySelectorAll('tr')[1]
      .querySelectorAll('td')[2] as Element;
    fireEvent.click(cell);
    await waitFor(async () => {
      await delay(300);
    });
    const resultTexts = container
      .querySelector(resultWrapper)
      ?.querySelectorAll(`${resultText} input`) as NodeListOf<Element>;
    inputValueTest(resultTexts[1], `${year}-${getFormatTime(Number(cell.textContent))}`);
    fireEvent.click(
      pickers[0]
        .querySelector(pickerBody)
        ?.querySelectorAll('tr')[0]
        .querySelectorAll('td')[0] as Element,
    );
    await waitFor(async () => {
      await delay(300);
    });
    inputValueTest(
      resultTexts[1],
      `${year}-${getFormatTime(
        Number(
          pickers[1].querySelector(pickerBody)?.querySelectorAll('tr')[1].querySelectorAll('td')[0]
            .textContent,
        ),
      )}`,
    );
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
          const date = new Date(now);
          const year = date.getFullYear();
          const nextMonth = date.getMonth() + 1;
          // const day = date.getDate();
          return new Date(year, nextMonth, 15).getTime();
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
    textContentTest(
      datePickerPickers[1].querySelectorAll(pickerHeaderInfo)[1],
      `${monthWithFormat}`,
    );
    const quickPickerItems = datePickerPickers[0].querySelectorAll(quickPickerItem);
    expect(quickPickerItems.length).toBe(3);
    quickPickerItems.forEach((item, index) => {
      textContentTest(item, QuickSelectData[index].name);
    });
    fireEvent.click(quickPickerItems[2]);
    await waitFor(async () => {
      await delay(300);
      textContentTest(
        datePickerPickers[1].querySelectorAll(pickerHeaderInfo)[1],
        `${Number(month === '12' ? 0 : month) + 1}`,
      );
    });
  });
});
describe('DatePicker[Disable]', () => {
  const testAboutDisable = async (container: HTMLElement) => {
    const datePickerWrapper = container.querySelector(wrapper)!;
    const datePickerResultWrapper = datePickerWrapper.querySelector(resultWrapper)!;

    classContentTest(datePickerWrapper, wrapperDisabled);
    fireEvent.click(datePickerResultWrapper);
    await waitFor(async () => {
      await delay(200);
      expect(datePickerWrapper.querySelector(pickerWrapper)!).not.toBeInTheDocument();
    });
  };
  test('should render when set disable1', async () => {
    const { container } = render(<DatePicker disabled />);
    await testAboutDisable(container);
  });
  test('should render when set disable and range', async () => {
    const { container } = render(<DatePicker range disabled />);
    await testAboutDisable(container);
  });
  test('should render when set range and disable by array', async () => {
    const { container } = render(<DatePicker range disabled={[false, true]} />);
    const datePickerWrapper = container.querySelector(wrapper)!;
    const datePickerResultWrapper = datePickerWrapper.querySelector(resultWrapper)!;

    const resultTexts = datePickerResultWrapper.querySelectorAll(`${resultText} input`);
    inputPlaceholderTest(resultTexts[0], 'Start date');
    inputPlaceholderTest(resultTexts[1], 'End date');
    classContentTest(datePickerWrapper, wrapperDisabled, false);
    fireEvent.focus(datePickerResultWrapper);
    fireEvent.click(datePickerResultWrapper);
    await waitFor(async () => {
      await delay(300);
    });
    const datePickerPickerWrapper = datePickerWrapper.querySelector(pickerWrapper)!;
    classContentTest(datePickerWrapper, wrapperFocus);
    styleContainTest(datePickerPickerWrapper, pickerWrapperStyle);
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
      const inputEl = resultTexts[0] as HTMLInputElement;
      expect(inputEl.value).not.toBe('');
    });
    fireEvent.click(
      pickers[1]
        .querySelector(pickerBody)
        ?.querySelectorAll('tr')[2]
        .querySelectorAll('td')[3] as Element,
    );
    await waitFor(async () => {
      await delay(300);
      inputPlaceholderTest(resultTexts[1], 'End date');
    });
  });
  test('should render when set disable is function in datetime', async () => {
    const { container } = render(
      <DatePicker
        type='datetime'
        disabled={(d) => {
          return d.getDay() === 0 || d.getDay() === 6;
        }}
      />,
    );
    const datePickerWrapper = container.querySelector(wrapper)!;
    const datePickerResultWrapper = datePickerWrapper.querySelector(resultWrapper)!;

    fireEvent.focus(datePickerResultWrapper);
    fireEvent.click(datePickerResultWrapper);
    await waitFor(async () => {
      await delay(300);
    });
    const resultTexts = datePickerResultWrapper.querySelectorAll(`${resultText} input`);
    const datePickerPickerWrapper = datePickerWrapper.querySelector(pickerWrapper)!;
    const pickTableBody = datePickerPickerWrapper.querySelector(pickerBody)?.querySelector('tbody');
    const tds = pickTableBody
      ?.querySelectorAll('tr')[2]
      .querySelectorAll('td') as NodeListOf<HTMLTableCellElement>;

    classTest(tds[6], pickerCellDisabled);

    fireEvent.click(tds[6]);
    await waitFor(async () => {
      await delay(300);
      const inputEl = resultTexts[0] as HTMLInputElement;
      expect(inputEl.value).toBe('');
    });
  });
  test('should render when set disbale is function in time', async () => {
    const { container } = render(
      <DatePicker
        type='time'
        disabled={(d) => {
          if (d.getHours() > 15) return true;
          return false;
        }}
      />,
    );
    const datePickerWrapper = container.querySelector(wrapper)!;
    const datePickerResultWrapper = datePickerWrapper.querySelector(resultWrapper)!;

    const resultTexts = datePickerResultWrapper.querySelectorAll(`${resultText} input`);

    fireEvent.focus(datePickerResultWrapper);
    fireEvent.click(datePickerResultWrapper);
    await waitFor(async () => {
      await delay(300);
    });
    const datePickerPickerWrapper = datePickerWrapper.querySelector(pickerWrapper)!;
    const timeListsItems = datePickerPickerWrapper
      .querySelectorAll(timeList)[0]
      .querySelectorAll(timeItem);
    fireEvent.click(timeListsItems[2]);
    await waitFor(async () => {
      await delay(300);
      const inputEl = resultTexts[0] as HTMLInputElement;
      expect(inputEl.value).toBe('02:00:00');
    });
    fireEvent.click(timeListsItems[17]);
    await waitFor(async () => {
      await delay(300);
      const inputEl = resultTexts[0] as HTMLInputElement;
      expect(inputEl.value).toBe('02:00:00');
    });
    timeListsItems.forEach((item, index) => {
      if (index < 16) return;
      classTest(item, timeItemDisabled);
    });
  });
  test('should render when set disbledTime', async () => {
    const { container } = render(
      <DatePicker type='time' disabledTime={(time) => time === '12:00:00'} />,
    );
    const datePickerWrapper = container.querySelector(wrapper)!;
    const datePickerResultWrapper = datePickerWrapper.querySelector(resultWrapper)!;

    const resultTexts = datePickerResultWrapper.querySelectorAll(`${resultText} input`);

    fireEvent.focus(datePickerResultWrapper);
    fireEvent.click(datePickerResultWrapper);
    await waitFor(async () => {
      await delay(300);
    });
    const datePickerPickerWrapper = datePickerWrapper.querySelector(pickerWrapper)!;
    const timeLists = datePickerPickerWrapper.querySelectorAll(timeList);
    fireEvent.click(timeLists[0].querySelectorAll(timeItem)[12]);
    await waitFor(async () => {
      await delay(300);
      inputPlaceholderTest(resultTexts[0], 'Please select time');
    });
    fireEvent.click(timeLists[1].querySelectorAll(timeItem)[0]);
    fireEvent.click(timeLists[2].querySelectorAll(timeItem)[0]);
    fireEvent.click(timeLists[0].querySelectorAll(timeItem)[11]);
    await waitFor(async () => {
      await delay(300);
      inputValueTest(resultTexts[0], '11:00:00');
    });
    fireEvent.click(timeLists[0].querySelectorAll(timeItem)[12]);
    await waitFor(async () => {
      await delay(300);
      inputValueTest(resultTexts[0], '11:00:00');
    });
  });
  // TODO: disabled and disabledTime
});
describe('DatePicker[Inputable]', () => {
  test('should render when set inputable', async () => {
    const { container } = render(<DatePicker inputable />);
    const datePickerWrapper = container.querySelector(wrapper)!;
    const datePickerResultWrapper = datePickerWrapper.querySelector(resultWrapper)!;

    fireEvent.focus(datePickerResultWrapper);
    fireEvent.click(datePickerResultWrapper);
    await waitFor(async () => {
      await delay(300);
    });
    const datePickerPickerWrapper = datePickerWrapper.querySelector(pickerWrapper)!;
    const resultInput = datePickerResultWrapper.querySelector('input')!;
    expect(resultInput).toBeInTheDocument();
    const tempTime = `${year}-${month}-15`;
    fireEvent.change(resultInput, {
      target: {
        value: tempTime,
      },
    });
    await waitFor(async () => {
      await delay(300);
    });
    inputValueTest(resultInput, tempTime);
    textContentTest(
      datePickerPickerWrapper.querySelector(pickerHeader)!,
      `${year}-${monthWithFormat}`,
    );
    datePickerPickerWrapper
      .querySelector('tbody')
      ?.querySelectorAll('tr')
      .forEach((tr) => {
        tr.querySelectorAll('td').forEach((td) => {
          if (td.textContent !== '15') return;
          classTest(td, pickerCellActive);
        });
      });
    fireEvent.change(resultInput, {
      target: {
        value: 'aaaa',
      },
    });
    fireEvent.blur(resultInput);
    fireEvent.mouseDown(document);
    await waitFor(async () => {
      await delay(300);
    });
    inputValueTest(resultInput, tempTime);
  });
});
describe('DatePicker[Absolute]', () => {
  test('should render when set absolute', async () => {
    const { container } = render(<DatePicker absolute type='time' />);
    const datePickerWrapper = container.querySelector(wrapper)!;
    const datePickerResultWrapper = datePickerWrapper.querySelector(resultWrapper)!;
    fireEvent.focus(datePickerResultWrapper);
    fireEvent.click(datePickerResultWrapper);
    await waitFor(async () => {
      await delay(300);
    });
    expect(container.querySelector(pickerWrapper)).not.toBeInTheDocument();
    expect(document.querySelector(pickerWrapper)).toBeInTheDocument();
  });
  test('should render when set absolute and zIndex', async () => {
    const zIndex = 1200;
    const { container } = render(<DatePicker absolute type='time' zIndex={zIndex} />);
    const datePickerWrapper = container.querySelector(wrapper)!;
    const datePickerResultWrapper = datePickerWrapper.querySelector(resultWrapper)!;
    fireEvent.focus(datePickerResultWrapper);
    fireEvent.click(datePickerResultWrapper);
    await waitFor(async () => {
      await delay(300);
    });
    styleContentTest(document.querySelector(pickerWrapper)!, `z-index: ${zIndex}`);
  });
});
describe('DatePicker[InnerTitle]', () => {
  test('should render when set innerTitle', async () => {
    const innerTitleText = 'Select date';
    const { container } = render(<DatePicker type='time' innerTitle={innerTitleText} />);
    const datePickerWrapper = container.querySelector(wrapper)!;
    const datePickerResultWrapper = datePickerWrapper.querySelector(resultWrapper)!;
    const titleWrapper = datePickerResultWrapper.querySelector(innerTitleWrapper)!;
    const titles = titleWrapper.querySelectorAll(innerTitle);
    expect(titles.length).toBe(2);
    titles.forEach((item, index) => {
      textContentTest(item, innerTitleText);
      if (index === 0) return;
      // classTest(item, innerTitlePlace);
    });
    fireEvent.focus(datePickerResultWrapper);
    fireEvent.click(datePickerResultWrapper);
    await waitFor(async () => {
      await delay(300);
    });
    classTest(titleWrapper, innerTitleWrapperOpen);
  });
});
describe('DatePicker[Position]', () => {
  type positionType = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | undefined;
  const positionStyleMap: { [key: string]: object } = {
    'top-left': pickerWrapperStyleTopLeft,
    'top-right': pickerWrapperStyleTopRight,
    'bottom-left': pickerWrapperStyle,
    'bottom-right': piCKerWrapperStyleRight,
  };
  const revertPosition = (listPosition: string) => listPosition.split('-').reverse().join('-');
  test.each(['top-left', 'top-right', 'bottom-left', 'bottom-right'])(
    'should render when set position is %s',
    async (type) => {
      const { container } = render(<DatePicker type='date' position={type as positionType} />);
      const datePickerWrapper = container.querySelector(wrapper)!;
      const datePickerResultWrapper = datePickerWrapper.querySelector(resultWrapper)!;

      fireEvent.focus(datePickerResultWrapper);
      fireEvent.click(datePickerResultWrapper);
      await waitFor(async () => {
        await delay(300);
      });
      const datePickerPickerWrapper = datePickerWrapper.querySelector(pickerWrapper)!;
      styleContainTest(datePickerPickerWrapper, positionStyleMap[type]);
    },
  );
  test.each(['left-top', 'left-bottom', 'right-top', 'right-bottom'])(
    'should render when set horizontalPosition',
    async (type) => {
      // @ts-ignore
      const { container } = render(<DatePicker type='date' position={type} />);
      const datePickerWrapper = container.querySelector(wrapper)!;
      const datePickerResultWrapper = datePickerWrapper.querySelector(resultWrapper)!;

      fireEvent.focus(datePickerResultWrapper);
      fireEvent.click(datePickerResultWrapper);
      await waitFor(async () => {
        await delay(300);
      });
      const datePickerPickerWrapper = datePickerWrapper.querySelector(pickerWrapper)!;
      styleContainTest(datePickerPickerWrapper, positionStyleMap[revertPosition(type)]);
    },
  );
  test('should render when set position is other', async () => {
    // @ts-ignore
    const { container } = render(<DatePicker type='date' position={'top'} />);
    const datePickerWrapper = container.querySelector(wrapper)!;
    const datePickerResultWrapper = datePickerWrapper.querySelector(resultWrapper)!;

    fireEvent.focus(datePickerResultWrapper);
    fireEvent.click(datePickerResultWrapper);
    await waitFor(async () => {
      await delay(300);
    });
    const datePickerPickerWrapper = datePickerWrapper.querySelector(pickerWrapper)!;
    styleContainTest(datePickerPickerWrapper, positionStyleMap['bottom-left']);
  });
});
describe('DatePicker[DefaultPickerValue]', () => {
  test('should render when set defaultPickerValue', async () => {
    const { container } = render(<DatePicker defaultPickerValue={`${year}-${Number(month)}`} />);
    const datePickerWrapper = container.querySelector(wrapper)!;
    const datePickerResultWrapper = datePickerWrapper.querySelector(resultWrapper)!;

    fireEvent.focus(datePickerResultWrapper);
    fireEvent.click(datePickerResultWrapper);
    await waitFor(async () => {
      await delay(300);
    });
    const datePickerPickerWrapper = datePickerWrapper.querySelector(pickerWrapper)!;

    textContentTest(
      datePickerPickerWrapper.querySelector(pickerHeader)!,
      `${year}-${Number(month)}`,
    );
  });
  test('should render when set defaultPickerValue in range', async () => {
    const { container } = render(
      <DatePicker
        range
        defaultPickerValue={[
          `${year}-${Math.max(Math.min(Number(month) - 1, 11), 1)}`,
          `${year}-${Math.max(Math.min(Number(month) - 2, 12), 1)}`,
        ]}
      />,
    );
    const datePickerWrapper = container.querySelector(wrapper)!;
    const datePickerResultWrapper = datePickerWrapper.querySelector(resultWrapper)!;
    fireEvent.focus(datePickerResultWrapper);
    fireEvent.click(datePickerResultWrapper);
    await waitFor(async () => {
      await delay(300);
    });
    const datePickerPickerWrapper = datePickerWrapper.querySelector(pickerWrapper)!;
    const pickerHeaders = datePickerPickerWrapper.querySelectorAll(pickerHeader);
    textContentTest(pickerHeaders[0], `${year}-${Math.max(Math.min(Number(month) - 1, 11), 1)}`);
    textContentTest(pickerHeaders[1], `${year}-${Math.max(Math.min(Number(month) - 2, 12), 1)}`);
  });
});
describe('DatePicker[AllowSingle]', () => {
  test('should render when not set allowSingle', async () => {
    const { container } = render(<DatePicker range type='datetime' />);
    const datePickerWrapper = container.querySelector(wrapper)!;
    const datePickerResultWrapper = datePickerWrapper.querySelector(resultWrapper)!;
    const resultTexts = datePickerResultWrapper.querySelectorAll(`${resultText} input`);

    fireEvent.focus(datePickerResultWrapper);
    fireEvent.click(datePickerResultWrapper);
    await waitFor(async () => {
      await delay(300);
    });
    const datePickerPickerWrapper = datePickerWrapper.querySelector(pickerWrapper)!;
    const table = datePickerPickerWrapper.querySelectorAll('table')!;
    const cell = table[0]
      .querySelector('tbody')
      ?.querySelectorAll('tr')[3]
      .querySelectorAll('td')[0] as Element;
    fireEvent.click(cell);
    fireEvent.blur(datePickerResultWrapper);
    fireEvent.mouseDown(document);
    await waitFor(async () => {
      await delay(300);
    });
    inputPlaceholderTest(resultTexts[0], 'Start date');
  });
  test('should render when set allowSingle', async () => {
    const { container } = render(<DatePicker range type='datetime' allowSingle />);
    const datePickerWrapper = container.querySelector(wrapper)!;
    const datePickerResultWrapper = datePickerWrapper.querySelector(resultWrapper)!;
    const resultTexts = datePickerResultWrapper.querySelectorAll(`${resultText} input`);

    fireEvent.focus(datePickerResultWrapper);
    fireEvent.click(datePickerResultWrapper);
    await waitFor(async () => {
      await delay(300);
    });
    const datePickerPickerWrapper = datePickerWrapper.querySelector(pickerWrapper)!;
    const table = datePickerPickerWrapper.querySelectorAll('table')!;
    const cell = table[0]
      .querySelector('tbody')
      ?.querySelectorAll('tr')[3]
      .querySelectorAll('td')[0] as Element;
    fireEvent.click(cell);
    fireEvent.blur(datePickerResultWrapper);
    fireEvent.click(document);
    await waitFor(async () => {
      await delay(300);
    });
    inputValueTest(resultTexts[0], `${year}-${month}-${cell.textContent} 00:00:00`);
  });
});
describe('DatePicker[Max/Min]', () => {
  test('should render when set max and min', async () => {
    const now = new Date(2024, 5, 17).getTime();
    const getCell = (table: Element) =>
      table.querySelector('tbody')?.querySelectorAll('tr')[3].querySelectorAll('td')[0] as Element;
    const { container } = render(<DatePicker min={now} type='datetime' max={now + 4 * 86400000} />);
    const datePickerWrapper = container.querySelector(wrapper)!;
    const datePickerResultWrapper = datePickerWrapper.querySelector(resultWrapper)!;
    const resultTexts = datePickerResultWrapper.querySelector(`${resultText} input`)!;

    fireEvent.focus(datePickerResultWrapper);
    fireEvent.click(datePickerResultWrapper);
    await waitFor(async () => {
      await delay(300);
    });
    const datePickerPickerWrapper = datePickerWrapper.querySelector(pickerWrapper)!;
    fireEvent.click(getCell(datePickerPickerWrapper.querySelector('table')!));
    await waitFor(async () => {
      await delay(300);
    });
    inputPlaceholderTest(resultTexts, 'Please select date');
    fireEvent.click(
      datePickerPickerWrapper
        .querySelector(pickerHeaderRight)
        ?.querySelectorAll(pickerHeaderIcon)[0] as Element,
    );
    await waitFor(async () => {
      await delay(300);
    });
    fireEvent.click(getCell(datePickerPickerWrapper.querySelector('table')!));
    await waitFor(async () => {
      await delay(300);
    });
    inputPlaceholderTest(resultTexts, 'Please select date');
  });
});
describe('DatePicker[Open]', () => {
  test('should render when is controlled by open', async () => {
    const { container } = render(<DatePickerOpen />);
    const buttons = container.querySelector('button')!;
    expect(container.querySelector(pickerWrapper)).not.toBeInTheDocument();
    fireEvent.click(buttons);
    await waitFor(async () => {
      await delay(300);
    });
    styleContainTest(container.querySelector(pickerWrapper)!, pickerWrapperStyle);
  });
  test('should render when use key down event', async () => {
    const { container } = render(<DatePicker />);
    const datePickerWrapper = container.querySelector(wrapper)!;
    const datePickerResultWrapper = datePickerWrapper.querySelector(resultWrapper)!;

    fireEvent.focus(datePickerResultWrapper);
    fireEvent.keyDown(datePickerResultWrapper, { key: 'Enter', keyCode: 13 });
    await waitFor(async () => {
      await delay(300);
    });
    const datePickerPickerWrapper = datePickerWrapper.querySelector(pickerWrapper)!;
    styleContainTest(datePickerPickerWrapper, pickerWrapperStyle);
  });
});
describe('DatePicker[Align]', () => {
  type alignType = 'center' | 'right' | 'left' | undefined;
  const alignClassNamesMap: { [key: string]: string } = {
    left: resultAlignLeft,
    right: resultAlignRight,
    center: resultAlignCenter,
  };
  test.each(['left', 'center', 'right'])('should render when set align is %s', async (type) => {
    const { container } = render(<DatePicker align={type as alignType} />);
    classTest(container.querySelector(result)!, alignClassNamesMap[type]);
  });
});
describe('DatePicker[Error/Warn]', () => {
  test('should render error when set formatResult and inputable', () => {
    const errorSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    render(<DatePicker formatResult={'YYYY-MM-DD HH:mm:ss'} inputable />);
    expect(errorSpy).toHaveBeenCalledWith(
      '[shineout] formatResult and inputable cannot be used at the same time in DatePicker.',
    );
  });
});
// defaultRangeMonth/timeZone/placeTitle
