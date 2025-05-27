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
  "transition": "transform 240ms ease-in-out ,opacity 240ms ease-in-out",
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
})
