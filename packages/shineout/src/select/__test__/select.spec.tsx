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
  styleContainTest,
  styleContentTest,
  styleTest,
  textContentTest,
} from '../../tests/utils';
import mountTest from '../../tests/mountTest';
import SelectBase from '../__example__/01-01-base';
import SelectMultiple from '../__example__/01-02-multiple';
import SelectAutoAdapt from '../__example__/02-auto-adapt';
import SelectFormat from '../__example__/03-01-format';
import SelectBigData from '../__example__/04-bigdata';
import SelectSize from '../__example__/05-size';
import SelectGroup from '../__example__/06-group';
import SelectDisabled from '../__example__/07-disabled';
import SelectTree from '../__example__/08-tree';
import SelectCreate from '../__example__/09-create';
import SelectFilter from '../__example__/10-01-filter';
import SelectTreeMore from '../__example__/10-04-tree';
import SelectAbsolute from '../__example__/11-absolute';
// import SelectGroupMore from '../__example__/13-group';
import SelectInnerTitle from '../__example__/14-inner-title';
import SelectLoading from '../__example__/15-loading';
import SelectCustomRender from '../__example__/16-custom-render';
import SelectCustomResult from '../__example__/17-custom-result-1';
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
  'columns',
  'columnsOption',
  'columnsRadio',
  'columnsCheckbox',
  'loading',
  'header',
  'columnsTitle',
  'inputMirror',
  'tree',
  'treeOption',
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
  'wrapperUnderline',
  'wrapperDisabled',
  'optionDisabled',
  'wrapperOpen',
  'wrapperEmpty',
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
  wrapperUnderline,
  columns: columnsClassName,
  columnsOption,
  columnsRadio,
  columnsCheckbox,
  loading,
  header,
  columnsTitle,
  inputMirror,
  tree,
  treeOption,
  wrapperDisabled,
  optionDisabled,
  wrapperOpen,
  wrapperEmpty
} = createClassName(SO_PREFIX, originClasses, originItemClasses);

const { text: treeText, content: treeContent } = createClassName('tree', ['text', 'content'], ['']);

const {
  wrapper: popoverWrapper
} = createClassName('popover', ['wrapper'], [''])

const {
  wrapper: tagWrapper
} = createClassName('tag', ['wrapper'], [''])

const defaultSelectPicker =
  'pointer-events: none; position: absolute; z-index: -1000; width: 100%; display: none;';
const defaultSelectPickerOpen = {
  zIndex: '1051',
  display: 'block',
  width: '100%',
  top: 'calc(100% + 4px)',
  left: '0px',
  transform: 'scaleY(1)',
  "transform-origin": "center top",
  "transition": "transform 240ms ease-in-out ,opacity 120ms ease-in-out",
}

const testDataObject = [
  { id: 1, city: 'Pune' },
  { id: 2, city: 'Accra' },
  { id: 3, city: 'Dhaka' },
];

const testData = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet', 'pink'];
const SelectTest = (props: any) => <Select keygen data={testData} {...props} />;

const groupData = [
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

const treeData = [
  {
    id: '1',
    title: 'node 1',
    children: [
      {
        id: '1-1',
        title: 'node 1-1',
        children: [
          { id: '1-1-1', title: 'node 1-1-1' },
          { id: '1-1-2', title: 'node 1-1-2' },
        ],
      },
      { id: '1-2', title: 'node 1-2' },
    ],
  },
  {
    id: '2',
    title: 'node 2',
  },
];

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
  snapshotTest(<SelectTreeMore />, 'about tree more');
  snapshotTest(<SelectAbsolute />, 'about absolute');
  // snapshotTest(<SelectGroupMore />, 'about group more');
  snapshotTest(<SelectInnerTitle />, 'about inner title');
  snapshotTest(<SelectLoading />, 'about loading');
  snapshotTest(<SelectCustomRender />, 'about custom render');
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
    // classTest(selectWrapper, clearable);
    attributesTest(selectWrapper, 'data-soui-input-border', 'true');
    const selectResultWrapper = container.querySelector(resultWrapper)!;
    classTest(selectResultWrapper, wrapperPaddingBox);
    classTest(selectResultWrapper, wrapperInnerTitleTop);
    classTest(selectResultWrapper, wrapperInnerTitleBottom);
    const selectResult = container.querySelector(result)!;
    classLengthTest(selectResult.querySelector(resultTextWrapper)!, space, 1);
    const selectArrowIcon = selectWrapper.querySelector(arrowIcon)!;
    classLengthTest(selectArrowIcon, 'svg', 1);

    fireEvent.click(selectResult);
    await waitFor(async () => {
      await delay(200);
    });

    classTest(selectWrapper, wrapperOpen);
    const selectPickerWrapper = selectWrapper.querySelector(pickerWrapper)!;
    attributesTest(selectPickerWrapper, 'data-sheinx-animation-duration', 'fast');
    attributesTest(selectPickerWrapper, 'data-sheinx-animation-type', 'scale-y');
    styleContainTest(selectPickerWrapper, defaultSelectPickerOpen);
    const selectList = selectPickerWrapper.querySelector(list)!;
    classTest(selectList, controlKeyboard);

    const selectVirtualList = selectList.querySelector(virtualList)!;
    styleTest(selectVirtualList, 'transform: translate3d(0, -0px, 0); padding-top: 3px; padding-bottom: 3px;');
    const selectOptions = selectVirtualList.querySelectorAll(option);
    selectOptions.forEach((option, index) => {
      classTest(option, `option-${index}`);
      attributesTest(option, 'title', testData[index]);
      textContentTest(option.querySelector(optionInner)!, testData[index]);
      if (index === 0) {
        classTest(option, optionHover);
      }
    });

    classTest(selectWrapper.querySelector(arrowIcon)!, arrowIconOpen);
    fireEvent.click(selectOptions[1]);
    await waitFor(async () => {
      await delay(200);
    });
    textContentTest(selectResult, testData[1]);
    classTest(selectWrapper, wrapperOpen, false);

    classTest(selectWrapper, wrapperFocus, false);
    classTest(selectWrapper.querySelector(arrowIcon)!, arrowIconOpen, false);
    fireEvent.click(selectArrowIcon);
    await waitFor(async () => {
      await delay(200);
    });

    classTest(selectWrapper, wrapperOpen);
    classTest(selectWrapper.querySelector(arrowIcon)!, arrowIconOpen);
    classTest(selectOptions[1].querySelector(optionInner)!, optionActive);
  });
  test('should render when set width and height', async () => {
    const width = 200;
    const height = 200;
    const { container } = render(<SelectTest width={width} height={height} />);
    const selectWrapper = container.querySelector(wrapper)!;
    styleTest(selectWrapper, `width: ${width}px;`);
    const selectResult = container.querySelector(result)!;
    fireEvent.click(selectResult);
    await waitFor(async () => {
      await delay(200);
    });
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
    const selectResult = container.querySelector(result)!;
    fireEvent.click(selectResult);
    await waitFor(async () => {
      await delay(200);
    });
    const selectOptions = selectWrapper.querySelectorAll(option);
    fireEvent.click(selectOptions[1]);
    await waitFor(async () => {
      await delay(200);
    });
    textContentTest(container.querySelector('.test')!, `${testDataObject[1].id}`);
  });
  test('should render when set onChange with all parameters', async () => {
    const App = () => {
      const [value, setValue] = React.useState();
      const [checked, setChecked] = React.useState();
      return (
        <>
          <div className='test'>{value}</div>
          <div className='test'>{checked}</div>
          <SelectTest
            data={testDataObject}
            keygen='id'
            format='id'
            value={value}
            onChange={(value: any, data: any, checked: any) => {
              console.log('11', data)
              setValue(value)
              setChecked(checked)
            }}
            renderItem='city'
            prediction={(v: any, d: any) => v === d.id}
          />
        </>
      )
    }

    const { container } = render(<App />);

    const selectWrapper = container.querySelector(wrapper)!;
    const selectResult = container.querySelector(result)!;
    fireEvent.click(selectResult);
    await waitFor(async () => {
      await delay(200);
    });
    const selectOptions = selectWrapper.querySelectorAll(option);
    fireEvent.click(selectOptions[1]);
    await waitFor(async () => {
      await delay(200);
    });


  })
  test('should render when set groupBy', async () => {
    const { container } = render(
      <SelectTest
        data={groupData}
        groupBy={groupBy}
        keygen='value'
        format='value'
        prediction={(v: any, d: any) => v === d.value}
        renderItem='value'
      />,
    );
    const selectWrapper = container.querySelector(wrapper)!;
    const selectResult = container.querySelector(result)!;
    fireEvent.click(selectResult);
    await waitFor(async () => {
      await delay(200);
    });
    classLengthTest(selectWrapper, optionGroupTitle, 3);
  });
  test('should render when set renderUnmatched', () => {
    const unMatchStr = 'test';
    const { container } = render(
      <SelectTest defaultValue='redddd' renderUnmatched={() => <div>{unMatchStr}</div>} />,
    );
    const selectWrapper = container.querySelector(wrapper)!;
    textContentTest(selectWrapper.querySelector(result)!, unMatchStr);
  });
  test('should render when set underline', () => {
    const { container } = render(<SelectTest underline />);
    const selectWrapper = container.querySelector(wrapper)!;
    classTest(selectWrapper, wrapperUnderline);
  });
  test('should render when set showArrow is false', () => {
    const { container } = render(<SelectTest showArrow={false} />);
    const selectWrapper = container.querySelector(wrapper)!;
    classLengthTest(selectWrapper, arrowIcon, 0);
  });
  test('should render when set renderResult', async () => {
    const renderResult = (d: any) => `text-${d}`;
    const { container } = render(<SelectTest renderResult={renderResult} />);
    const selectWrapper = container.querySelector(wrapper)!;
    const selectResult = container.querySelector(result)!;
    fireEvent.click(selectResult);
    await waitFor(async () => {
      await delay(200);
    });
    const selectOptions = selectWrapper.querySelectorAll(option);
    fireEvent.click(selectOptions[1]);
    await waitFor(async () => {
      await delay(200);
    });
    textContentTest(selectWrapper.querySelector(result)!, renderResult(testData[1]));
  });
  test('should render when set optionWidth', async () => {
    const optionWidth = 200;
    const { container } = render(<SelectTest optionWidth={optionWidth} />);
    const selectResult = container.querySelector(result)!;
    fireEvent.click(selectResult);
    await waitFor(async () => {
      await delay(200);
    });
    styleContentTest(container.querySelector(pickerWrapper)!, `width: ${optionWidth}px;`);
  });
  test('should render when set clearable', async () => {
    const { container } = render(<SelectTest clearable />);
    const selectWrapper = container.querySelector(wrapper)!;
    const selectResult = container.querySelector(result)!;
    fireEvent.click(selectWrapper.querySelector(result)!)
    await waitFor(async () => {
      await delay(200);
    });
    classLengthTest(selectWrapper, clearIcon, 0);
    classTest(selectWrapper, clearable)
    classTest(selectWrapper, wrapperOpen)
    const selectOptions = selectWrapper.querySelectorAll(option);
    fireEvent.click(selectOptions[1]);
    await waitFor(async () => {
      await delay(200);
    });
    classTest(selectWrapper, wrapperOpen, false)
    textContentTest(selectResult, testData[1]);
    classTest(selectWrapper, wrapperEmpty, false)
    fireEvent.mouseEnter(selectWrapper.querySelector(arrowIcon)!);
    classLengthTest(selectWrapper, clearIcon, 1);
    fireEvent.click(selectWrapper.querySelector(clearIcon)!);
    await waitFor(async () => {
      await delay(200);
    });
    classLengthTest(selectWrapper, clearIcon, 0);
    classTest(selectWrapper, wrapperEmpty)
  });
  test('should render when set renderOptionList', async () => {
    const className = 'test';
    const renderOptionList = (d: any) => <div className='test'>{d}</div>;
    const { container } = render(<SelectTest renderOptionList={renderOptionList} />);
    const selectWrapper = container.querySelector(wrapper)!;
    fireEvent.click(selectWrapper.querySelector(result)!)
    await waitFor(async () => {
      await delay(200);
    });
    const selectList = selectWrapper.querySelector(list)!;
    classTest(selectList.parentElement!, className);
  });
  test('should render when set header and footer', async () => {
    const headerContent = 'header';
    const footerContent = 'footer';
    const className = 'test';
    const header = <div className={className}>{headerContent}</div>;
    const footer = <div className={className}>{footerContent}</div>;
    const { container } = render(<SelectTest header={header} footer={footer} />);
    const selectWrapper = container.querySelector(wrapper)!;
    fireEvent.click(selectWrapper.querySelector(result)!)
    await waitFor(async () => {
      await delay(200);
    });
    const selectMore = selectWrapper.querySelectorAll(`.${className}`)!;
    expect(selectMore.length).toBe(2);
    textContentTest(selectMore[0], headerContent);
    textContentTest(selectMore[1], footerContent);
  });
  test('should render when set loading', async () => {
    const { container } = render(<SelectTest loading />);
    fireEvent.click(container.querySelector(arrowIcon)!)
    await waitFor(async () => {
      await delay(200);
    });
    const selectWrapper = container.querySelector(wrapper)!;
    classLengthTest(selectWrapper, loading, 1);
  });
  test('should render when set innerTitle', () => {
    const innerTitle = 'test';
    render(<SelectTest innerTitle={innerTitle} />);
    const selectInnerTitles = screen.getAllByText(innerTitle);
    expect(selectInnerTitles.length).toBe(2);
  });
  test('should render when mouseEnter li', async () => {
    const { container } = render(<SelectTest />);
    const selectWrapper = container.querySelector(wrapper)!;
    fireEvent.click(selectWrapper.querySelector(result)!)
    await waitFor(async () => {
      await delay(200);
    });
    const selectOptions = selectWrapper.querySelectorAll(option);
    fireEvent.mouseEnter(selectOptions[2]);
    await waitFor(async () => {
      await delay(200);
    });
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
    fireEvent.click(selectOptions[2]);
    await waitFor(async () => {
      await delay(200);
    });
    expect(selectResultWrapper.querySelectorAll(tag).length).toBe(1);
  });
  test('should render when set separator', async () => {
    const separator = '/';
    const App = () => {
      const [value, setValue] = React.useState();
      return (
        <div>
          <div className='test'>{value}</div>
          <SelectTest value={value} onChange={setValue} multiple separator={separator} />
        </div>
      );
    };
    const { container } = render(<App />);
    const selectWrapper = container.querySelector(wrapper)!;
    fireEvent.click(selectWrapper.querySelector(result)!)
    await waitFor(async () => {
      await delay(200);
    });
    const selectOptions = selectWrapper.querySelectorAll(option);
    fireEvent.click(selectOptions[1]);
    fireEvent.click(selectOptions[2]);
    await waitFor(async () => {
      await delay(200);
    });
    textContentTest(container.querySelector('.test')!, `${testData[1]}${separator}${testData[2]}`);
  });
  test('should render when set resultClassName', async () => {
    const className = 'test';
    const { container } = render(<SelectTest multiple resultClassName={className} />);
    const selectWrapper = container.querySelector(wrapper)!;
    fireEvent.click(selectWrapper.querySelector(result)!)
    await waitFor(async () => {
      await delay(200);
    });
    const selectOptions = selectWrapper.querySelectorAll(option);
    const selectResultWrapper = container.querySelector(resultWrapper)!;
    fireEvent.click(selectOptions[1]);
    await waitFor(async () => {
      await delay(200);
    });
    classTest(selectResultWrapper.querySelectorAll(tag)[0], className);
  });
});
describe('Select[Columns]', () => {
  test('should render when set columns', async () => {
    const columns = 2;
    const { container } = render(<SelectTest columns={columns} />);
    const selectWrapper = container.querySelector(wrapper)!;
    fireEvent.click(selectWrapper.querySelector(result)!)
    await waitFor(async () => {
      await delay(200);
    });
    const selectColumns = selectWrapper.querySelectorAll(columnsClassName);
    expect(selectColumns.length).toBe(testData.length / columns);
    selectColumns.forEach((item) => {
      const selectColumnsOptions = item.querySelectorAll(columnsOption);
      expect(selectColumnsOptions.length).toBe(columns);
      selectColumnsOptions.forEach((option) => {
        classLengthTest(option, columnsRadio, 1);
      });
    });
    fireEvent.click(selectColumns[0].querySelectorAll('input')[0]);
    await waitFor(async () => {
      await delay(200);
    });
    textContentTest(selectWrapper.querySelector(result)!, testData[0]);
  });
  test('should render when set columns and multiple', async () => {
    const columns = 2;
    const { container } = render(<SelectTest columns={columns} multiple />);
    const selectWrapper = container.querySelector(wrapper)!;
    fireEvent.click(selectWrapper.querySelector(result)!)
    await waitFor(async () => {
      await delay(200);
    });
    const selectColumns = selectWrapper.querySelectorAll(columnsClassName);
    const selectResult = selectWrapper.querySelector(result)!;
    expect(selectColumns.length).toBe(testData.length / columns);
    selectColumns.forEach((item) => {
      const selectColumnsOptions = item.querySelectorAll(columnsOption);
      selectColumnsOptions.forEach((option) => {
        classLengthTest(option, columnsCheckbox, 1);
      });
    });
    fireEvent.click(selectColumns[0].querySelectorAll('input')[0]);
    await waitFor(async () => {
      await delay(200);
    });
    classLengthTest(selectResult, tag, 1);
    textContentTest(selectResult, testData[0]);
    fireEvent.click(selectColumns[0].querySelectorAll('input')[0]);
    await waitFor(async () => {
      await delay(200);
    });
    classLengthTest(selectResult, tag, 0);
    const selectHeader = selectWrapper.querySelector(header)!;
    fireEvent.click(selectHeader.querySelector('input')!);
    await waitFor(async () => {
      await delay(200);
    });
    classLengthTest(selectResult, tag, testData.length);
    fireEvent.click(selectHeader.querySelector('input')!);
    await waitFor(async () => {
      await delay(200);
    });
    classLengthTest(selectResult, tag, 0);
  });
  test('should render when set group in columns', async () => {
    const { container } = render(
      <SelectTest
        data={groupData}
        columns={2}
        groupBy={groupBy}
        keygen='value'
        format='value'
        prediction={(v: any, d: any) => v === d.value}
        renderItem='value'
      />,
    );
    fireEvent.click(container.querySelector(result)!)
    await waitFor(async () => {
      await delay(200);
    });
    classLengthTest(container, columnsClassName, 6);
  });
  test('should render when set columnsTitle in columns', async () => {
    const columnsTitleStr = 'test';
    const { container } = render(
      <SelectTest columns={2} columnsTitle={columnsTitleStr} multiple />,
    );
    fireEvent.click(container.querySelector(result)!)
    await waitFor(async () => {
      await delay(200);
    });
    textContentTest(container.querySelector(columnsTitle)!, columnsTitleStr);
  });
  test('should render when set columnsWidth', () => {
    const columnsWidth = 100;
    const { container } = render(<SelectTest columns={2} columnWidth={columnsWidth} />);
    const selectColumnsOptions = container.querySelectorAll(columnsOption);
    selectColumnsOptions.forEach((item) => {
      styleContentTest(item, `width: ${columnsWidth}px;`);
    });
  });
  test('should render when set loading in columns', async () => {
    const { container } = render(<SelectTest columns={2} loading />);
    fireEvent.click(container.querySelector(result)!)
    await waitFor(async () => {
      await delay(200);
    });
    classLengthTest(container, loading, 1);
  });
});
describe('Select[More]', () => {
  test('should render when set compressed/compressedBound/compressedClassName', async () => {
    // TODO: have question
    const compressedClassName = 'test'
    const { container } = render(<SelectTest multiple compressed compressedBound={2} compressedClassName={compressedClassName} />);
    const selectWrapper = container.querySelector(wrapper)!;
    fireEvent.click(selectWrapper.querySelector(result)!)
    await waitFor(async () => {
      await delay(200);
    });
    const selectOptions = selectWrapper.querySelectorAll(option);
    fireEvent.click(selectOptions[1]);
    fireEvent.click(selectOptions[2]);
    fireEvent.click(selectOptions[3]);
    await waitFor(async () => {
      await delay(200);
    });

    classLengthTest(selectWrapper.querySelector(result)!, tag, 3);
    const moreTag = selectWrapper.querySelectorAll(tag)[2]
    textContentTest(moreTag, '+1')
    fireEvent.mouseEnter(selectWrapper.querySelector('.soui-select-result-text-wrapper > span')!)
    await waitFor(async () => {
      await delay(200);
    });
    expect(document.querySelector(popoverWrapper)).toBeInTheDocument()
  });
});
describe('Select[OnCreate/OnFilter]', () => {
  let originalScrollTo: any;
  beforeEach(() => {
    const scrollToSpy = jest.fn();
    originalScrollTo = Element.prototype.scrollTo;

    // Mock scrollTo method
    Element.prototype.scrollTo = scrollToSpy;
  });
  afterEach(() => {
    Element.prototype.scrollTo = originalScrollTo;
  });
  test('should render when set onCreate is true in multiple', async () => {
    const testValue = 'test';
    const { container } = render(<SelectTest onCreate multiple />);
    const selectWrapper = container.querySelector(wrapper)!;
    const selectResultTextWrapper = selectWrapper.querySelector(resultTextWrapper)!;
    fireEvent.click(selectResultTextWrapper);
    await waitFor(async () => {
      await delay(200);
    });
    classLengthTest(selectResultTextWrapper, 'input', 1);
    classLengthTest(selectResultTextWrapper, inputMirror, 1);
    const selectInput = selectResultTextWrapper.querySelector('input')!;
    fireEvent.change(selectInput, { target: { value: testValue } });
    await waitFor(async () => {
      await delay(200);
    });
    attributesTest(selectInput, 'value', testValue);
    textContentTest(selectResultTextWrapper.querySelector(inputMirror)!, testValue);
    const selectVirtualLsit = selectWrapper.querySelector(virtualList)!;
    textContentTest(selectVirtualLsit.firstElementChild!, testValue);
    fireEvent.keyDown(selectWrapper, { keyCode: 13 });
    await waitFor(async () => {
      await delay(200);
    });
    const selectTags = selectWrapper.querySelectorAll(tag);
    expect(selectTags.length).toBe(1);
    textContentTest(selectTags[0], testValue);
    fireEvent.click(selectTags[0].querySelector('svg')!);
    await waitFor(async () => {
      await delay(200);
    });
    expect(selectWrapper.querySelectorAll(tag).length).toBe(0);
  });
  test('should render when set onCreate is function in multiple', async () => {
    const testValue = 'test';
    const onCreate = (d: string) => `test-${d}`;
    const { container } = render(<SelectTest onCreate={onCreate} multiple />);
    const selectWrapper = container.querySelector(wrapper)!;
    const selectResultTextWrapper = selectWrapper.querySelector(resultTextWrapper)!;
    fireEvent.click(selectResultTextWrapper);
    await waitFor(async () => {
      await delay(200);
    });
    const selectInput = selectResultTextWrapper.querySelector('input')!;
    fireEvent.change(selectInput, { target: { value: testValue } });
    await waitFor(async () => {
      await delay(200);
    });
    fireEvent.keyDown(selectWrapper, { keyCode: 13 });
    await waitFor(async () => {
      await delay(200);
    });
    textContentTest(selectResultTextWrapper, onCreate(testValue));
  });
  test('should render when set onCreate in single', async () => {
    const testValue = 'test';
    const { container } = render(<SelectTest onCreate />);
    const selectWrapper = container.querySelector(wrapper)!;
    const selectResultTextWrapper = selectWrapper.querySelector(resultTextWrapper)!;
    fireEvent.click(selectResultTextWrapper);
    await waitFor(async () => {
      await delay(200);
    });
    const selectInput = selectResultTextWrapper.querySelector('input')!;
    fireEvent.change(selectInput, { target: { value: testValue } });
    await waitFor(async () => {
      await delay(200);
    });
    fireEvent.keyDown(selectWrapper, { keyCode: 13 });
    await waitFor(async () => {
      await delay(200);
    });
    classLengthTest(selectResultTextWrapper, tag, 0);
  });
  test('should render when onCreate and handleHideOption', async () => {
    const testValue = 'test';
    const { container } = render(<SelectTest onCreate multiple hideCreateOption />);
    const selectWrapper = container.querySelector(wrapper)!;
    const selectResultTextWrapper = selectWrapper.querySelector(resultTextWrapper)!;
    fireEvent.click(selectResultTextWrapper);
    await waitFor(async () => {
      await delay(200);
    });
    const selectInput = selectResultTextWrapper.querySelector('input')!;
    fireEvent.change(selectInput, { target: { value: testValue } });
    await waitFor(async () => {
      await delay(200);
    });
    const selectVirtualLsit = selectWrapper.querySelector(virtualList)!;
    textContentTest(selectVirtualLsit.firstElementChild!, testData[0]);
    fireEvent.keyDown(selectWrapper, { keyCode: 13 });
    await waitFor(async () => {
      await delay(200);
    });
    const selectTags = selectWrapper.querySelectorAll(tag);
    expect(selectTags.length).toBe(1);
    textContentTest(selectTags[0], testValue);
  });
  test('should render when set onFilter', async () => {
    const testValue = 'r';
    const handleFilter = (v: string) => (d: string) => d.indexOf(v) >= 0;
    const { container } = render(<SelectTest onFilter={handleFilter} />);
    const selectWrapper = container.querySelector(wrapper)!;
    const selectResultTextWrapper = selectWrapper.querySelector(resultTextWrapper)!;
    fireEvent.click(selectResultTextWrapper);
    await waitFor(async () => {
      await delay(200);
    });
    const selectInput = selectResultTextWrapper.querySelector('input')!;
    fireEvent.change(selectInput, { target: { value: testValue } });
    await waitFor(async () => {
      await delay(500);
    });
    const selectOptions = selectWrapper.querySelectorAll(option);
    selectOptions.forEach((item) => {
      expect(item.textContent?.indexOf(testValue)).toBeGreaterThanOrEqual(0);
    });
  });
  test('should render when blur and set trim', async () => {
    const blurFn = jest.fn();
    const testValue = 'test';
    const { container } = render(<SelectTest onCreate multiple trim onBlur={blurFn} />);

    const selectWrapper = container.querySelector(wrapper)!;
    const selectResultTextWrapper = selectWrapper.querySelector(resultTextWrapper)!;
    fireEvent.click(selectResultTextWrapper);
    await waitFor(async () => {
      await delay(200);
    });
    const selectInput = selectResultTextWrapper.querySelector('input')!;
    fireEvent.click(selectInput);
    await waitFor(async () => {
      await delay(200);
    });
    classTest(selectWrapper.querySelector(arrowIcon)!, arrowIconOpen);
    fireEvent.change(selectInput, { target: { value: `${testValue} ` } });
    fireEvent.blur(selectInput);
    await waitFor(async () => {
      await delay(500);
    });

    textContentTest(selectResultTextWrapper.querySelector(tagWrapper)!, testValue)
    expect(blurFn.mock.calls.length).toBe(1);
  });
  test('should render when blur and click', async () => {
    const testValue = 'test';
    const { container } = render(<SelectTest onCreate multiple trim placeholder='Select Color' />);
    const selectWrapper = container.querySelector(wrapper)!;
    const selectResultTextWrapper = selectWrapper.querySelector(resultTextWrapper)!;
    fireEvent.click(selectResultTextWrapper);
    await waitFor(async () => {
      await delay(200);
    });
    const selectInput = selectResultTextWrapper.querySelector('input')!;

    fireEvent.change(selectInput, { target: { value: testValue } });
    await waitFor(async () => {
      await delay(200);
    });
    fireEvent.blur(selectInput);
    await waitFor(async () => {
      await delay(200);
    });
    fireEvent.click(selectWrapper.querySelector(arrowIcon)!);
    await waitFor(async () => {
      await delay(200);
    });
    classLengthTest(selectResultTextWrapper, 'input', 1);
    fireEvent.click(selectWrapper.querySelector('input')!);
    await waitFor(async () => {
      await delay(200);
    });

    fireEvent.change(selectResultTextWrapper.querySelector('input')!, {
      target: { value: 'demo' },
    });
    await waitFor(async () => {
      await delay(200);
    });

    fireEvent.keyDown(selectWrapper, { keyCode: 13 });
    await waitFor(async () => {
      await delay(200);
    });
    fireEvent.blur(selectInput);
    await waitFor(async () => {
      await delay(200);
    });
  });
});
describe('Select[KeyDown]', () => {
  let originalScrollTo: any;
  beforeEach(() => {
    const scrollToSpy = jest.fn();
    originalScrollTo = Element.prototype.scrollTo;

    // Mock scrollTo method
    Element.prototype.scrollTo = scrollToSpy;
  });
  afterEach(() => {
    Element.prototype.scrollTo = originalScrollTo;
  });
  test('should render when backSpace', async () => {
    const { container } = render(<SelectTest multiple />);
    const selectWrapper = container.querySelector(wrapper)!;
    const selectResultWrapper = container.querySelector(resultWrapper)!;
    fireEvent.click(selectResultWrapper);
    await waitFor(async () => {
      await delay(200);
    });
    const selectOptions = selectWrapper.querySelectorAll(option);
    fireEvent.click(selectOptions[1]);
    await waitFor(async () => {
      await delay(200);
    });
    fireEvent.keyDown(selectWrapper, { keyCode: 8 });
    await waitFor(async () => {
      await delay(200);
    });
    expect(selectWrapper.querySelectorAll(tag).length).toBe(0);
  });
  test('should render when open by arrowDown and arrowUp', async () => {
    const onEnterExpand = jest.fn();
    const { container } = render(<SelectTest multiple onEnterExpand={onEnterExpand} />);
    const selectWrapper = container.querySelector(wrapper)!;
    const selectResultWrapper = container.querySelector(resultWrapper)!;
    fireEvent.click(selectResultWrapper);
    await waitFor(async () => {
      await delay(200);
    });
    fireEvent.keyDown(selectWrapper, { keyCode: 13 });
    await waitFor(async () => {
      await delay(200);
    });
    classTest(selectWrapper, wrapperOpen);

    // expect(onEnterExpand.mock.calls.length).toBe(1);
    fireEvent.keyDown(selectWrapper, { keyCode: 40 });
    await waitFor(async () => {
      await delay(200);
    });
    classTest(selectWrapper.querySelectorAll(option)[1], optionHover);
    fireEvent.keyDown(selectWrapper, { keyCode: 38 });
    await waitFor(async () => {
      await delay(200);
    });
    classTest(selectWrapper.querySelectorAll(option)[0], optionHover);
    fireEvent.keyDown(selectWrapper, { keyCode: 9 });
    await waitFor(async () => {
      await delay(200);
    });
    classTest(selectWrapper, wrapperOpen, false);
  });
  test('should render when move', async () => {
    const { container } = render(<SelectTest multiple />);
    const selectWrapper = container.querySelector(wrapper)!;
    const selectResultWrapper = container.querySelector(resultWrapper)!;
    fireEvent.click(selectResultWrapper);
    await waitFor(async () => {
      await delay(200);
    });

    fireEvent.keyDown(selectWrapper, { keyCode: 40 });
    fireEvent.keyDown(selectWrapper, { keyCode: 40 });
    fireEvent.keyDown(selectWrapper, { keyCode: 40 });
    fireEvent.keyDown(selectWrapper, { keyCode: 40 });
    fireEvent.keyDown(selectWrapper, { keyCode: 40 });
    fireEvent.keyDown(selectWrapper, { keyCode: 40 });
    fireEvent.keyDown(selectWrapper, { keyCode: 40 });
    fireEvent.keyDown(selectWrapper, { keyCode: 40 });
    await waitFor(async () => {
      await delay(200);
    });

    classTest(selectWrapper.querySelectorAll(option)[0], optionHover);
    fireEvent.keyDown(selectWrapper, { keyCode: 38 });
    fireEvent.keyDown(selectWrapper, { keyCode: 38 });
    fireEvent.keyDown(selectWrapper, { keyCode: 38 });
    fireEvent.keyDown(selectWrapper, { keyCode: 38 });
    fireEvent.keyDown(selectWrapper, { keyCode: 38 });
    fireEvent.keyDown(selectWrapper, { keyCode: 38 });
    fireEvent.keyDown(selectWrapper, { keyCode: 38 });
    fireEvent.keyDown(selectWrapper, { keyCode: 38 });
    fireEvent.keyDown(selectWrapper, { keyCode: 38 });
    await waitFor(async () => {
      await delay(200);
    });
    classTest(selectWrapper.querySelectorAll(option)[0], optionHover);
  });
  test('should render when move with group', async () => {
    const { container } = render(
      <SelectTest
        data={groupData}
        groupBy={groupBy}
        keygen='value'
        format='value'
        prediction={(v: any, d: any) => v === d.value}
        renderItem='value'
      />,
    );
    const selectWrapper = container.querySelector(wrapper)!;
    const selectResultWrapper = container.querySelector(resultWrapper)!;
    fireEvent.click(selectResultWrapper);
    await waitFor(async () => {
      await delay(200);
    });
    fireEvent.keyDown(selectWrapper, { keyCode: 38 });
    fireEvent.keyDown(selectWrapper, { keyCode: 38 });
    fireEvent.keyDown(selectWrapper, { keyCode: 38 });
    fireEvent.keyDown(selectWrapper, { keyCode: 38 });
    fireEvent.keyDown(selectWrapper, { keyCode: 38 });
    fireEvent.keyDown(selectWrapper, { keyCode: 38 });
    fireEvent.keyDown(selectWrapper, { keyCode: 38 });
    fireEvent.keyDown(selectWrapper, { keyCode: 38 });
    await waitFor(async () => {
      await delay(200);
    });
    classTest(selectWrapper.querySelectorAll(option)[3], optionHover);
  });
});
describe('Select[Tree]', () => {
  test('should render when set treeData', async () => {
    const { container } = render(
      <Select
        treeData={treeData}
        keygen='id'
        format={'id'}
        childrenKey='children'
        prediction={(v, d: any) => v === d.id}
        renderItem={(d) => d.title}
      />,
    );
    const selectWrapper = container.querySelector(wrapper)!;
    const selectResultWrapper = container.querySelector(resultWrapper)!;
    fireEvent.click(selectResultWrapper);
    await waitFor(async () => {
      await delay(200);
    });
    const selectTree = selectWrapper.querySelector(tree)!;
    const selectTreeOptions = selectTree.querySelectorAll(treeOption);
    fireEvent.click(selectTreeOptions[0].querySelector(treeText)!);
    await waitFor(async () => {
      await delay(200);
    });
    textContentTest(selectWrapper.querySelector(result)!, treeData[0].title);
    fireEvent.click(selectTreeOptions[0].querySelector(treeText)!);
    await waitFor(async () => {
      await delay(200);
    });
  });
  test('should render when set disabled and treeData', async () => {
    const { container } = render(
      <Select
        treeData={treeData}
        keygen='id'
        format={'id'}
        childrenKey='children'
        prediction={(v, d: any) => v === d.id}
        renderItem={(d) => d.title}
        disabled
      />,
    );
    const selectWrapper = container.querySelector(wrapper)!;
    classTest(selectWrapper, wrapperDisabled);
    const treeContents = selectWrapper.querySelectorAll(treeContent);
    treeContents.forEach((item) => {
      classTest(item, optionDisabled);
    });
  });
  // treeData test is same as tree test
});
describe('Select[Other]', () => {
  test('Should render when set absolute', async () => {
    const { container } = render(<SelectTest absolute />);
    const selectWrapper = container.querySelector(wrapper)!;
    const selectResultWrapper = container.querySelector(resultWrapper)!;
    fireEvent.click(selectResultWrapper);
    await waitFor(async () => {
      await delay(200);
    });
    classLengthTest(selectWrapper, pickerWrapper, 0);
    classLengthTest(document, pickerWrapper, 1);
  });
  test('should render when set beforeChange', async () => {
    const beforeChange = jest.fn();
    const { container } = render(<SelectTest beforeChange={beforeChange} />);
    const selectWrapper = container.querySelector(wrapper)!;
    fireEvent.click(selectWrapper.querySelector(resultWrapper)!);
    await waitFor(async () => {
      await delay(200);
    });
    fireEvent.click(selectWrapper.querySelectorAll(option)[1]);
    await waitFor(async () => {
      await delay(200);
    });
    expect(beforeChange.mock.calls.length).toBe(1);
  });
  test('should render when set onFocus', async () => {
    const focusFn = jest.fn();
    const { container } = render(<SelectTest onFocus={focusFn} />);
    const selectWrapper = container.querySelector(wrapper)!;
    fireEvent.focus(selectWrapper);
    await waitFor(async () => {
      await delay(200);
    });
    expect(focusFn.mock.calls.length).toBe(1);
  });
  test('should render when set onCollapse', async () => {
    const collapseFn = jest.fn();
    const { container } = render(<SelectTest onCollapse={collapseFn} />);
    const selectWrapper = container.querySelector(wrapper)!;
    fireEvent.click(selectWrapper.querySelector(resultWrapper)!);
    await waitFor(async () => {
      await delay(200);
    });
    expect(collapseFn.mock.calls.length).toBe(1);
  });
});

describe('Select[ResultClassName]', () => {
  interface ColorData {
    id: number;
    name: string;
    category: string;
  }

  const colorData: ColorData[] = [
    { id: 1, name: 'Red', category: 'warm' },
    { id: 2, name: 'Blue', category: 'cool' },
    { id: 3, name: 'Green', category: 'cool' },
  ];

  const SelectTestWithData = (props: any) => <Select keygen="id" data={colorData} renderItem={(d: ColorData) => d.name} {...props} />;

  test('should apply string resultClassName to multiple select result', async () => {
    const className = 'test-result-class';
    const { container } = render(<SelectTestWithData multiple resultClassName={className} />);
    
    const selectWrapper = container.querySelector(wrapper)!;
    fireEvent.click(selectWrapper.querySelector(result)!);
    
    await waitFor(async () => {
      await delay(200);
    });
    
    const selectOptions = selectWrapper.querySelectorAll(option);
    fireEvent.click(selectOptions[0]);
    
    await waitFor(async () => {
      await delay(200);
    });
    
    const selectResultWrapper = container.querySelector(resultWrapper)!;
    classTest(selectResultWrapper.querySelectorAll(tag)[0], className);
  });

  test('should apply function resultClassName to multiple select result', async () => {
    const { container } = render(
      <SelectTestWithData multiple resultClassName={(value: ColorData) => `result-${value.category}`} />
    );
    
    const selectWrapper = container.querySelector(wrapper)!;
    fireEvent.click(selectWrapper.querySelector(result)!);
    
    await waitFor(async () => {
      await delay(200);
    });
    
    const selectOptions = selectWrapper.querySelectorAll(option);
    fireEvent.click(selectOptions[0]); // Select Red (warm category)
    
    await waitFor(async () => {
      await delay(200);
    });
    
    const selectResultWrapper = container.querySelector(resultWrapper)!;
    classTest(selectResultWrapper.querySelectorAll(tag)[0], 'result-warm');
  });

  test('should apply resultClassName to multiple select results', async () => {
    const { container } = render(
      <SelectTestWithData multiple resultClassName={(value: ColorData) => `result-${value.category}`} />
    );
    
    const selectWrapper = container.querySelector(wrapper)!;
    fireEvent.click(selectWrapper.querySelector(result)!);
    
    await waitFor(async () => {
      await delay(200);
    });
    
    const selectOptions = selectWrapper.querySelectorAll(option);
    fireEvent.click(selectOptions[0]); // Select Red (warm)
    fireEvent.click(selectOptions[1]); // Select Blue (cool)
    
    await waitFor(async () => {
      await delay(200);
    });
    
    const selectResultWrapper = container.querySelector(resultWrapper)!;
    const tags = selectResultWrapper.querySelectorAll(tag);
    
    classTest(tags[0], 'result-warm');
    classTest(tags[1], 'result-cool');
  });

  test('should work with renderResult and resultClassName together', async () => {
    const className = 'custom-render-result';
    const { container } = render(
      <SelectTestWithData 
        multiple
        renderResult={(d: ColorData) => `Custom ${d.name}`}
        resultClassName={className}
      />
    );
    
    const selectWrapper = container.querySelector(wrapper)!;
    fireEvent.click(selectWrapper.querySelector(result)!);
    
    await waitFor(async () => {
      await delay(200);
    });
    
    const selectOptions = selectWrapper.querySelectorAll(option);
    fireEvent.click(selectOptions[0]);
    
    await waitFor(async () => {
      await delay(200);
    });
    
    const selectResultWrapper = container.querySelector(resultWrapper)!;
    const tagElement = selectResultWrapper.querySelectorAll(tag)[0];
    classTest(tagElement, className);
    textContentTest(tagElement, 'Custom Red');
  });
});

// virtual list is same as table or list

// disabled
// filterSingleSelect
// focusSelected
// showHitDescendants

// select missing api and function
// emptyText
// emptyAfterSelect
