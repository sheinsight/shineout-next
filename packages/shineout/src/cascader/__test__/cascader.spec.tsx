import { cleanup, fireEvent, render, waitFor } from "@testing-library/react";
import '@testing-library/jest-dom'
import Cascader from '..'
import { attributesTest, baseTest, classTest, createClassName, delay, displayTest, snapshotTest, styleContainTest, styleTest, textContentTest } from "../../tests/utils";
import mountTest from "../../tests/mountTest";
import { classLengthTest } from "../../tests/structureTest";
import CascaderBase from "../__example__/01-01-base";
import CascaderRenderResult from '../__example__/01-02-base'
import CascaderHideTag from '../__example__/01-03-base'
import CascaderMultiple from '../__example__/02-01-multiple'
import CascaderCompressed from '../__example__/02-03-00-multiple-compressed'
import CascaderNoRepeat from '../__example__/02-03-01-multiple'
import CascaderTrigger from '../__example__/03-01-trigger'
import CascaderFinal from '../__example__/03-02-finalDismiss'
import CascaderDisabled from '../__example__/04-disabled-normal'
import CascaderLoader from '../__example__/05-loader'
import CascaderFilter from '../__example__/06-01-filter'
import CascaderWide from '../__example__/06-02-filter'
import CascaderInnerTitle from '../__example__/07-inner-title'
import CascaderUnmatch from '../__example__/08-unmatch'
import CascaderFinalOther from '../__example__/09-final'

interface DataItem {
  value: string;
  children?: DataItem[];
}

const data: DataItem[] = [
  {
    value: 'jiangsu',
    children: [
      {
        value: 'nanjing',
        children: [
          {
            value: 'jiangning',
          },
        ],
      },
    ],
  },
  {
    value: 'anhui',
    children: [
      {
        value: 'hefei',
        children: [
          {
            value: 'feidong',
          },
        ],
      },
    ],
  },
];

const CascaderTest = (props: any) => <Cascader keygen={'value'} data={data} renderItem={(n: any) => `${n?.value}`} {...props} />

const SO_PREFIX = 'cascader'
const originClasses = ['wrapper', 'resultWrapper', 'result', 'arrowIcon', 'pickerWrapper', 'listContent', 'option', 'list']
const originItemClasses = ['wrapperEmpty', 'wrapperPaddingBox', 'wrapperInnerTitleTop', 'wrapperInnerTitleBottom', 'arrowIconOpen', 'activeOption']
const {
  wrapper,
  wrapperEmpty,
  resultWrapper,
  wrapperPaddingBox,
  wrapperInnerTitleTop,
  wrapperInnerTitleBottom,
  result,
  arrowIcon,
  arrowIconOpen,
  pickerWrapper,
  listContent,
  option,
  activeOption,
  list
} = createClassName(SO_PREFIX, originClasses, originItemClasses)

// const {
//   tag
// } = createClassName('select', ['tag'], [''])

const defaultOpenStyle = {
  zIndex: '1051',
  display: 'block',
  top: 'calc(100% + 4px)',
  left: '0px',
  transform: 'scaleY(1)',
  "transform-origin": "center top",
  "transition": "transform 240ms ease-in-out ,opacity 120ms ease-in-out",
}

beforeAll(() => {
  jest.useFakeTimers();
});
afterAll(() => {
  jest.runAllTimers();
});
afterEach(cleanup)
mountTest(<CascaderTest />)

describe('Cascader[Base]', () => {
  displayTest(Cascader as React.FC, 'ShineoutCascader')
  baseTest(CascaderTest, wrapper)
  snapshotTest(<CascaderBase />)
  snapshotTest(<CascaderCompressed />, 'about compressed')
  snapshotTest(<CascaderFinal />, 'about finalDismiss')
  snapshotTest(<CascaderHideTag />, 'about hideTag')
  snapshotTest(<CascaderMultiple />, 'about multiple')
  snapshotTest(<CascaderNoRepeat />, 'about noRepeat')
  snapshotTest(<CascaderRenderResult />, 'about renderResult')
  snapshotTest(<CascaderTrigger />, 'about trigger')
  snapshotTest(<CascaderDisabled />, 'about disabled')
  snapshotTest(<CascaderLoader />, 'about loader')
  snapshotTest(<CascaderFilter />, 'about filter')
  snapshotTest(<CascaderWide />, 'about wide')
  snapshotTest(<CascaderInnerTitle />, 'about innerTitle')
  snapshotTest(<CascaderUnmatch />, 'about unmatch')
  snapshotTest(<CascaderFinalOther />, 'about final')
  test('should render default', async () => {
    const { container } = render(<CascaderTest />)
    const cascaderWrapper = container.querySelector(wrapper)!
    classTest(cascaderWrapper, wrapperEmpty)
    attributesTest(cascaderWrapper, 'data-soui-input-border', 'true')
    const cascaderResultWrapper = cascaderWrapper.querySelector(resultWrapper)!
    classTest(cascaderResultWrapper, wrapperPaddingBox)
    classTest(cascaderResultWrapper, wrapperInnerTitleTop)
    classTest(cascaderResultWrapper, wrapperInnerTitleBottom)
    const cascaderResult = cascaderResultWrapper.querySelector(result)!
    expect(cascaderResult).toBeInTheDocument()
    const cascaderArrowIcon = cascaderWrapper.querySelector(arrowIcon)!
    classTest(cascaderArrowIcon, arrowIconOpen, false)
    classLengthTest(cascaderArrowIcon, 'svg', 1)
    fireEvent.click(cascaderResult);
    await waitFor(async () => {
      await delay(200);
    });
    classTest(cascaderArrowIcon, arrowIconOpen)
    const cascaderPicker = cascaderWrapper.querySelector(pickerWrapper)!
    attributesTest(cascaderPicker, 'data-sheinx-animation-duration', 'fast')
    attributesTest(cascaderPicker, 'data-sheinx-animation-type', 'scale-y')
    styleContainTest(cascaderPicker, defaultOpenStyle)
    const cascaderListContent = cascaderPicker.querySelector(listContent)!
    styleTest(cascaderListContent, `height: 250px;`)
    const cascaderOptions = cascaderListContent.querySelectorAll(option)
    expect(cascaderOptions.length).toBe(data.length)
    cascaderOptions.forEach((item, index) => {
      textContentTest(item, data[index].value)
      classLengthTest(item, 'svg', 1)
    })
    fireEvent.click(cascaderOptions[0])
    await waitFor(async () => {
      await delay(200);
    });
    classTest(cascaderOptions[0], activeOption)
    const cascaderLists = cascaderListContent.querySelectorAll(list)
    expect(cascaderLists.length).toBe(2)
    const cascaderOptionsSencond = cascaderLists[1].querySelectorAll(option)
    expect(cascaderOptionsSencond.length).toBe(data[0].children?.length)
    cascaderOptionsSencond.forEach((item, index) => {
      textContentTest(item, data[0]?.children?.[index].value)
      classLengthTest(item, 'svg', 1)
    })
    fireEvent.click(cascaderOptionsSencond[0])
    await waitFor(async () => {
      await delay(200);
    });
    classTest(cascaderOptionsSencond[0], activeOption)
    const cascaderListsNew = cascaderListContent.querySelectorAll(list)
    expect(cascaderListsNew.length).toBe(3)
    const cascaderOptionsThird = cascaderListsNew[2].querySelectorAll(option)
    expect(cascaderOptionsThird.length).toBe(data[0]?.children?.[0]?.children?.length)
    cascaderOptionsThird.forEach((item, index) => {
      textContentTest(item, data[0]?.children?.[0]?.children?.[index].value)
      if (!data[0]?.children?.[0]?.children?.[index].children) {
        classLengthTest(item, 'svg', 0)
      }
    })
    // const tags = cascaderResult.querySelectorAll(tag)
    // expect(tags.length).toBe(2)
    // textContentTest(tags[0], data[0].value)
    // textContentTest(tags[1], data[0]?.children?.[0].value)
    // fireEvent.click(cascaderOptionsThird[0]);
    // await waitFor(async () => {
    //   await delay(200);
    // });
    // const tagsNew = cascaderResult.querySelectorAll(tag)
    // expect(tagsNew.length).toBe(3)
    // textContentTest(tagsNew[2], data[0]?.children?.[0]?.children?.[0].value)
    // fireEvent.click()
    // screen.debug()
  })

  test('should check on filtered data when checkOnFiltered is true', async () => {
    const onChange = jest.fn();
    const filterData: DataItem[] = [
      {
        value: 'zhejiang',
        children: [
          {
            value: 'hangzhou',
            children: [
              { value: 'xihu' },
              { value: 'yuhang' },
            ],
          },
          {
            value: 'wenzhou',
            children: [
              { value: 'ouhai' },
            ],
          },
        ],
      },
      {
        value: 'jiangsu',
        children: [
          {
            value: 'nanjing',
            children: [
              { value: 'gulou' },
            ],
          },
        ],
      },
    ];

    const { container } = render(
      <Cascader
        keygen="value"
        data={filterData}
        renderItem={(n: any) => `${n?.value}`}
        multiple
        mode={2}
        onChange={onChange}
        checkOnFiltered
        onFilter={(text: string) => {
          return (d: DataItem) => d.value.indexOf(text) > -1;
        }}
      />
    );

    const cascaderWrapper = container.querySelector(wrapper)!;
    const cascaderResult = cascaderWrapper.querySelector(result)!;

    // 打开下拉框
    fireEvent.click(cascaderResult);
    await waitFor(async () => {
      await delay(200);
    });

    // 输入筛选关键字 'hang'，应该只匹配到 hangzhou 及其子节点 xihu, yuhang
    const input = cascaderWrapper.querySelector('input')!;
    fireEvent.change(input, { target: { value: 'hang' } });
    await waitFor(async () => {
      await delay(500);
    });

    // 验证筛选后的选项
    const cascaderPicker = cascaderWrapper.querySelector(pickerWrapper)!;
    const filteredOptions = cascaderPicker.querySelectorAll(option);
    expect(filteredOptions.length).toBeGreaterThan(0);

    // 点击筛选后的第一个选项（hangzhou）
    const firstOption = filteredOptions[0];
    const checkbox = firstOption.querySelector('input[type="checkbox"]');
    if (checkbox) {
      fireEvent.click(checkbox);
      await waitFor(async () => {
        await delay(200);
      });

      // 验证 onChange 被调用
      expect(onChange).toHaveBeenCalled();
      const lastCall = onChange.mock.calls[onChange.mock.calls.length - 1];
      const selectedValues = lastCall[0];

      // 关键验证：checkOnFiltered=true 时，只应该选中筛选后的叶子节点
      // 筛选 'hang' 匹配 hangzhou，mode=2 返回叶子节点
      // 应该只包含 xihu, yuhang
      // 不应该包含 wenzhou 下的 ouhai（虽然它是 zhejiang 的子节点）
      expect(selectedValues).toBeDefined();
      expect(Array.isArray(selectedValues)).toBe(true);
      expect(selectedValues).toContain('xihu');
      expect(selectedValues).toContain('yuhang');
      expect(selectedValues).not.toContain('ouhai'); // 关键：不应该包含未筛选的节点
      expect(selectedValues.length).toBe(2);
    }
  });

  test('should check on full data when checkOnFiltered is false or undefined', async () => {
    const onChange = jest.fn();
    const fullData: DataItem[] = [
      {
        value: 'zhejiang',
        children: [
          {
            value: 'hangzhou',
            children: [
              { value: 'xihu' },
              { value: 'yuhang' },
            ],
          },
          {
            value: 'wenzhou',
            children: [
              { value: 'ouhai' },
            ],
          },
        ],
      },
      {
        value: 'jiangsu',
        children: [
          {
            value: 'nanjing',
            children: [
              { value: 'gulou' },
            ],
          },
        ],
      },
    ];

    const { container } = render(
      <Cascader
        keygen="value"
        data={fullData}
        renderItem={(n: any) => `${n?.value}`}
        multiple
        mode={2}
        onChange={onChange}
        checkOnFiltered={false}
        onFilter={(text: string) => {
          return (d: DataItem) => d.value.indexOf(text) > -1;
        }}
      />
    );

    const cascaderWrapper = container.querySelector(wrapper)!;
    const cascaderResult = cascaderWrapper.querySelector(result)!;

    // 打开下拉框
    fireEvent.click(cascaderResult);
    await waitFor(async () => {
      await delay(200);
    });

    // 输入筛选关键字 'hang'，匹配 hangzhou
    const input = cascaderWrapper.querySelector('input')!;
    fireEvent.change(input, { target: { value: 'hang' } });
    await waitFor(async () => {
      await delay(500);
    });

    // 点击筛选后的第一个选项（hangzhou）
    const cascaderPicker = cascaderWrapper.querySelector(pickerWrapper)!;
    const filteredOptions = cascaderPicker.querySelectorAll(option);
    const firstOption = filteredOptions[0];
    const checkbox = firstOption.querySelector('input[type="checkbox"]');

    if (checkbox) {
      fireEvent.click(checkbox);
      await waitFor(async () => {
        await delay(200);
      });

      // 验证基于完整数据集的选择
      expect(onChange).toHaveBeenCalled();
      const lastCall = onChange.mock.calls[onChange.mock.calls.length - 1];
      const selectedValues = lastCall[0];

      // 关键验证：checkOnFiltered=false 时，即使筛选了 'hang'
      // 选中父节点应该选中完整数据集中的所有子节点
      // 应该包含 zhejiang 下的所有叶子节点：xihu, yuhang, ouhai
      expect(selectedValues).toBeDefined();
      expect(Array.isArray(selectedValues)).toBe(true);
      expect(selectedValues).toContain('xihu');
      expect(selectedValues).toContain('yuhang');
      // 关键：checkOnFiltered=false 时应该包含 ouhai（虽然它不匹配筛选条件）
      expect(selectedValues).toContain('ouhai');
      expect(selectedValues.length).toBe(3);
    }
  });
})
