import React from 'react';
import { render, cleanup, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Select from '..';
import { classLengthTest } from '../../tests/structureTest';
import {
  attributesTest,
  classTest,
  createClassName,
  delay,
  displayTest,
  snapshotTest,
  styleTest,
  textContentTest,
} from '../../tests/utils';
import mountTest from '../../tests/mountTest';
import SelectBase from '../__example__/01-01-base';
import SelectMultiple from '../__example__/01-02-multiple';
import SelectAutoAdapt from '../__example__/02-auto-adapt';
import SelectFormat from '../__example__/03-format';
import SelectBigData from '../__example__/04-bigdata';
import SelectSize from '../__example__/05-size';
import SelectGroup from '../__example__/06-group';
import SelectDisabled from '../__example__/07-disabled';
import SelectTree from '../__example__/08-tree';
import SelectCreate from '../__example__/09-create';
import SelectFilter from '../__example__/10-01-filter';
import SelectMaxLength from '../__example__/10-03-max-length';
import SelectTreeMore from '../__example__/10-04-tree';
import SelectAbsolute from '../__example__/11-absolute';
import SelectGroupMore from '../__example__/13-group';
import SelectInnerTitle from '../__example__/14-inner-title';
import SelectLoading from '../__example__/15-loading';
import SelectCustomRender from '../__example__/16-custom-render';
import SelectMaxLengthMore from '../__example__/16-max-length';
import SelectCustomResult from '../__example__/17-custom-result';
import SelectCustomUnmatch from '../__example__/18-custom-unmatch';

const SO_PREFIX = 'select';
const originClasses = [
  'wrapper',
  'resultWrapper',
  'result',
  'resultTextWrapper',
  'space',
  'arrowIcon',
  'pickerWrapper',
  'list',
  'virtualList',
  'option',
  'optionInner',
  'placeholder',
  'clearIcon',
  'tag',
  'checkedIcon',
  'optionGroupTitle',
];
const originItemClasses = [
  'clearable',
  'wrapperPaddingBox',
  'wrapperInnerTitleTop',
  'wrapperInnerTitleBottom',
  'controlKeyboard',
  'optionHover',
  'wrapperFocus',
  'arrowIconOpen',
  'ellipsis',
  'optionActive',
  'multiple',
  'wrapperSmall',
  'wrapperLarge',
];
const {
  wrapper,
  clearable,
  resultWrapper,
  wrapperPaddingBox,
  wrapperInnerTitleTop,
  wrapperInnerTitleBottom,
  result,
  resultTextWrapper,
  space,
  arrowIcon,
  pickerWrapper,
  list,
  controlKeyboard,
  virtualList,
  option,
  optionInner,
  optionHover,
  wrapperFocus,
  arrowIconOpen,
  placeholder,
  ellipsis,
  optionActive,
  clearIcon,
  multiple,
  tag,
  checkedIcon,
  wrapperSmall,
  wrapperLarge,
  optionGroupTitle,
} = createClassName(SO_PREFIX, originClasses, originItemClasses);

const defaultSelectPicker =
  'pointer-events: none; position: absolute; z-index: -1000; width: 100%; display: none;';
const defaultSelectPickerOpen =
  'z-index: 1051; width: 100%; display: block; left: 0px; transform: scaleY(1); transition: transform 240ms ease-in-out;';

const testDataObject = [
  { id: 1, city: 'Pune' },
  { id: 2, city: 'Accra' },
  { id: 3, city: 'Dhaka' },
];

const testData = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet', 'pink'];
const SelectTest = (props: any) => <Select keygen data={testData} {...props} />;

beforeAll(() => {
  jest.useFakeTimers();
});
afterAll(() => {
  jest.runAllTimers();
});
afterEach(cleanup);
mountTest(<SelectTest />);

describe('Select[Base]', () => {
  displayTest(Select as React.FC<any>, 'ShineoutSelect');
  snapshotTest(<SelectBase />);
  snapshotTest(<SelectMultiple />, 'about multiple');
  snapshotTest(<SelectAutoAdapt />, 'about autoAdapt');
  snapshotTest(<SelectFormat />, 'about format');
  snapshotTest(<SelectBigData />, 'about big data');
  snapshotTest(<SelectSize />, 'about size');
  snapshotTest(<SelectGroup />, 'about group');
  snapshotTest(<SelectDisabled />, 'about disabled');
  snapshotTest(<SelectTree />, 'about tree');
  snapshotTest(<SelectCreate />, 'about create');
  snapshotTest(<SelectFilter />, 'about filter');
  snapshotTest(<SelectMaxLength />, 'about max length');
  snapshotTest(<SelectTreeMore />, 'about tree more');
  snapshotTest(<SelectAbsolute />, 'about absolute');
  snapshotTest(<SelectGroupMore />, 'about group more');
  snapshotTest(<SelectInnerTitle />, 'about inner title');
  snapshotTest(<SelectLoading />, 'about loading');
  snapshotTest(<SelectCustomRender />, 'about custom render');
  snapshotTest(<SelectMaxLengthMore />, 'about max length more');
  snapshotTest(<SelectCustomResult />, 'about custom result');
  snapshotTest(<SelectCustomUnmatch />, 'about custom unmatch');

  test('should render when set className and style', () => {
    const className = 'test';
    const style = { color: 'red' };
    const styleStr = 'color: red;';
    const { container } = render(<SelectTest className={className} style={style} />);
    const selectWrapper = container.querySelector(wrapper)!;
    classTest(selectWrapper, className);
    styleTest(selectWrapper, styleStr);
  });
  test('should render default', async () => {
    const { container } = render(<SelectTest />);
    const selectWrapper = container.querySelector(wrapper)!;
    classTest(selectWrapper, clearable);
    attributesTest(selectWrapper, 'data-soui-type', 'input');
    const selectResultWrapper = container.querySelector(resultWrapper)!;
    classTest(selectResultWrapper, wrapperPaddingBox);
    classTest(selectResultWrapper, wrapperInnerTitleTop);
    classTest(selectResultWrapper, wrapperInnerTitleBottom);
    const selectResult = container.querySelector(result)!;
    classLengthTest(selectResult.querySelector(resultTextWrapper)!, space, 1);
    const selectArrowIcon = selectWrapper.querySelector(arrowIcon)!;
    classLengthTest(selectArrowIcon, 'svg', 1);
    const selectPickerWrapper = selectWrapper.querySelector(pickerWrapper)!;
    attributesTest(selectPickerWrapper, 'data-sheinx-animation-duration', 'fast');
    attributesTest(selectPickerWrapper, 'data-sheinx-animation-type', 'scale-y');
    styleTest(selectPickerWrapper, defaultSelectPicker);
    const selectList = selectPickerWrapper.querySelector(list)!;
    classTest(selectList, controlKeyboard);
    const selectVirtualList = selectList.querySelector(virtualList)!;
    styleTest(selectVirtualList, 'transform: translate3d(0, -0px, 0);');
    const selectOptions = selectVirtualList.querySelectorAll(option);
    selectOptions.forEach((option, index) => {
      classTest(option, `option-${index}`);
      attributesTest(option, 'title', testData[index]);
      textContentTest(option.querySelector(optionInner)!, testData[index]);
      if (index === 0) {
        classTest(option, optionHover);
      }
    });
    fireEvent.click(selectResultWrapper);
    await waitFor(async () => {
      await delay(200);
    });
    classTest(selectWrapper, wrapperFocus);
    classTest(selectWrapper.querySelector(arrowIcon)!, arrowIconOpen);
    styleTest(selectPickerWrapper, defaultSelectPickerOpen);
    fireEvent.click(selectOptions[1]);
    await waitFor(async () => {
      await delay(200);
    });
    textContentTest(selectResult, testData[1]);
    classTest(selectOptions[1].querySelector(optionInner)!, optionActive);
    classTest(selectWrapper, wrapperFocus, false);
    classTest(selectWrapper.querySelector(arrowIcon)!, arrowIconOpen, false);
    fireEvent.click(selectArrowIcon);
    await waitFor(async () => {
      await delay(200);
    });
    classLengthTest(selectWrapper, arrowIcon, 0);
    classLengthTest(selectWrapper, clearIcon, 1);
    fireEvent.click(selectWrapper.querySelector(clearIcon)!);
    await waitFor(async () => {
      await delay(200);
    });
    classTest(selectWrapper, wrapperFocus, false);
  });
  test('should render when set width and height', () => {
    const width = 200;
    const height = 200;
    const { container } = render(<SelectTest width={width} height={height} />);
    const selectWrapper = container.querySelector(wrapper)!;
    styleTest(selectWrapper, `width: ${width}px;`);
    const selectList = selectWrapper.querySelector(list)!;
    styleTest(selectList.firstElementChild!, `height: ${height}px;`);
  });
  test('should render when set placeholder', () => {
    const placeholderStr = 'test';
    const { container } = render(<SelectTest placeholder={placeholderStr} />);
    const selectResult = container.querySelector(result)!;
    const selectplaceholder = selectResult.querySelector(placeholder)!;
    classTest(selectplaceholder, ellipsis);
    textContentTest(selectplaceholder, placeholderStr);
  });
  test('should render when set renderItem', () => {
    const renderItem = (item: any) => `test-${item}`;
    const { container } = render(<SelectTest renderItem={renderItem} />);
    const selectOptions = container.querySelectorAll(option);
    selectOptions.forEach((option, index) => {
      textContentTest(option.querySelector(optionInner)!, renderItem(testData[index]));
    });
  });
  test('should render when set autoAdapt', () => {
    render(<SelectTest autoAdapt />);
    // render
  });
  test('should render when set size is small', () => {
    const size = 'small';
    const { container } = render(<SelectTest size={size} />);
    const selectWrapper = container.querySelector(wrapper)!;
    classTest(selectWrapper, wrapperSmall);
  });
  test('should render when set size is large', () => {
    const size = 'large';
    const { container } = render(<SelectTest size={size} />);
    const selectWrapper = container.querySelector(wrapper)!;
    classTest(selectWrapper, wrapperLarge);
  });
  test('should render when set value/onChange/format', async () => {
    const App = () => {
      const [value, setValue] = React.useState();
      return (
        <div>
          <div className='test'>{value}</div>
          <SelectTest
            data={testDataObject}
            keygen='id'
            format='id'
            value={value}
            onChange={setValue}
            renderItem='city'
            prediction={(v: any, d: any) => v === d.id}
          />
        </div>
      );
    };
    const { container } = render(<App />);
    const selectWrapper = container.querySelector(wrapper)!;
    const selectOptions = selectWrapper.querySelectorAll(option);
    fireEvent.click(selectOptions[1]);
    await waitFor(async () => {
      await delay(200);
    });
    textContentTest(container.querySelector('.test')!, `${testDataObject[1].id}`);
  });
  test('should render when set groupBy', () => {
    const data = [
      { value: 'Mars', group: '3' },
      { value: 'China', group: '2' },
      { value: 'Beijing', group: '1' },
      { value: 'Shanghai', group: '1' },
    ];
    const groupBy = (d: { value: string; group: string }) => {
      if (d.group === '1') return 'City';
      if (d.group === '2') return 'Country';
      return 'Other';
    };
    const { container } = render(
      <SelectTest
        data={data}
        groupBy={groupBy}
        keygen='value'
        format='value'
        prediction={(v: any, d: any) => v === d.value}
        renderItem='value'
      />,
    );
    const selectWrapper = container.querySelector(wrapper)!;
    classLengthTest(selectWrapper, optionGroupTitle, 3);
  });
  test('should render when set renderUnmatched', () => {
    const unMatchStr = 'test';
    const { container } = render(
      <SelectTest defaultValue='redddd' renderUnmatched={() => <div>{unMatchStr}</div>} />,
    );
    const selectWrapper = container.querySelector(wrapper)!;
    textContentTest(selectWrapper.querySelector(result)!, unMatchStr);
    screen.debug();
  });
});
describe('Select[Multiple]', () => {
  test('should render when set multiple', async () => {
    const { container } = render(<SelectTest multiple />);
    const selectWrapper = container.querySelector(wrapper)!;
    const selectResultWrapper = container.querySelector(resultWrapper)!;
    classTest(selectWrapper, multiple);
    fireEvent.click(selectResultWrapper);
    await waitFor(async () => {
      await delay(200);
    });
    const selectOptions = selectWrapper.querySelectorAll(option);
    fireEvent.click(selectOptions[1]);
    await waitFor(async () => {
      await delay(200);
    });
    const selectTags = selectResultWrapper.querySelectorAll(tag);
    expect(selectTags.length).toBe(1);
    textContentTest(selectTags[0], testData[1]);
    classLengthTest(selectOptions[1], checkedIcon, 1);
    fireEvent.click(selectOptions[2]);
    await waitFor(async () => {
      await delay(200);
    });
    expect(selectResultWrapper.querySelectorAll(tag).length).toBe(2);
  });
});
