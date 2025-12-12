import { render, cleanup, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import TreeSelect from '..';
import mountTest from '../../tests/mountTest';
import {
  classTest,
  createClassName,
  delay,
  displayTest,
  snapshotTest,
  styleTest,
  textContentTest,
} from '../../tests/utils';
import { classLengthTest } from '../../tests/structureTest';
import TreeSelectBase from '../__example__/01-base';
import TreeMultiple from '../__example__/02-multiple';
import TreeSelectCompressed from '../__example__/03-01-01-compressed';
import TreeSelectFilter from '../__example__/04-01-filter';
import TreeSelectFilterMore from '../__example__/04-02-filter';
import TreeSelectLoader from '../__example__/05-loader';
import TreeSelectDisabled from '../__example__/06-disabled';
import TreeSelectInnerTitle from '../__example__/07-inner-title';
import TreeSelectUnmatch from '../__example__/08-unmatch';
import TreeSelectSize from '../__example__/09-size';
import TreeSelectCheckOnFiltered from '../__example__/04-02-filter-checkonfiltered';

const SO_PREFIX = 'treeSelect';
const originClasses = ['wrapper', 'tree', 'result', 'clearIcon', 'space', 'tag', 'arrowIcon'];
const originItemClasses = ['wrapperFocus', 'arrowIconOpen'];
const { wrapper, tree, result, clearIcon, space, tag, wrapperFocus, arrowIcon, arrowIconOpen } =
  createClassName(SO_PREFIX, originClasses, originItemClasses);

const {
  icon: treeIcon,
  content: treeContent,
  root,
  node,
  children,
  text,
} = createClassName('tree', ['icon', 'content', 'children', 'root', 'node', 'text'], ['']);

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

const TreeSelectTest = (props: any) =>{
  return (
    <TreeSelect keygen={'id'} renderItem={(d: any) => d.title} data={treeData} {...props} absolute={false} />
  )
}


beforeAll(() => {
  jest.useFakeTimers();
});
afterAll(() => {
  jest.runAllTimers();
});
afterEach(cleanup);
mountTest(<TreeSelectTest />);

describe('TreeSelect[Base]', () => {
  displayTest(TreeSelect as React.FC, 'ShineoutTreeSelect');
  snapshotTest(<TreeSelectBase />);
  snapshotTest(<TreeMultiple />, 'about multiple');
  snapshotTest(<TreeSelectCompressed />, 'about compressed');
  snapshotTest(<TreeSelectFilter />, 'about filter');
  snapshotTest(<TreeSelectFilterMore />, 'about filter more');
  snapshotTest(<TreeSelectLoader />, 'about loader');
  snapshotTest(<TreeSelectDisabled />, 'about disabled');
  snapshotTest(<TreeSelectInnerTitle />, 'about inner title');
  snapshotTest(<TreeSelectUnmatch />, 'about unmatch');
  snapshotTest(<TreeSelectSize />, 'about size');
  snapshotTest(<TreeSelectCheckOnFiltered />, 'about checkOnFiltered');
  test('should render when set className and style', () => {
    const className = 'test';
    const style = { color: 'red' };
    const styleStr = 'color: red;';
    const { container } = render(<TreeSelectTest className={className} style={style} />);
    const selectWrapper = container.querySelector(wrapper)!;
    classTest(selectWrapper, className);
    styleTest(selectWrapper, styleStr);
  });
  // refer to select test
  test('should render default', async () => {
    const { container } = render(<TreeSelectTest />);
    const selectWrapper = container.querySelector(wrapper)!;
    fireEvent.click(selectWrapper.querySelector(result)!)
    await waitFor(async () => {
      await delay(200);
    });

    classLengthTest(container.querySelector(wrapper)!, tree, 1);
  });
  test('should render when advanced filtering', async () => {
    const filterText = '1-1';
    const { container } = render(
      <TreeSelectTest
        showHitDescendants
        onAdvancedFilter={(text: any) => (d: any) => d.title.indexOf(text) > -1}
        clearable
      />,
    );
    const selectWrapper = container.querySelector(wrapper)!;
    const treeResult = selectWrapper.querySelector(result)!;
    fireEvent.click(treeResult);
    await waitFor(async () => {
      await delay(200);
    });
    fireEvent.change(selectWrapper.querySelector('input')!, { target: { value: filterText } });
    await waitFor(async () => {
      await delay(500);
    });
    const treeIconWrapper = container.querySelector(treeIcon)!;
    // styleTest(treeIconWrapper.firstElementChild!, filterTreeIconStyle);
    expect(screen.getByText(filterText)).toBeInTheDocument();
    classLengthTest(container, treeContent, 4);
    fireEvent.click(treeIconWrapper.querySelector('svg')!);
    await waitFor(async () => {
      await delay(200);
    });
    classLengthTest(container, treeContent, 5);
  });
  test('should render when set expand', async () => {
    const { container } = render(<TreeSelectTest expanded={['1']} />);
    const selectWrapper = container.querySelector(wrapper)!;
    fireEvent.click(selectWrapper.querySelector(result)!)
    await waitFor(async () => {
      await delay(200);
    });
    const treeRoot = container.querySelector(root)!;
    const treeNodes = treeRoot.querySelectorAll(`:scope > ${node}`);
    expect(treeNodes.length).toBe(2);
    classLengthTest(treeRoot, children, 1);
  });
  test('should render when set getComponentRef', () => {
    const getComponentRef = jest.fn();
    render(<TreeSelectTest getComponentRef={getComponentRef} />);
    expect(getComponentRef.mock.calls.length).toBe(1);
  });
  test('should render when click single', async () => {
    const onChangeAddition = jest.fn();
    const { container } = render(<TreeSelectTest onChangeAddition={onChangeAddition} />);
    const selectWrapper = container.querySelector(wrapper)!;
    fireEvent.click(selectWrapper.querySelector(result)!)
    await waitFor(async () => {
      await delay(200);
    });
    const treeRoot = selectWrapper.querySelector(root)!;
    const treeNodes = treeRoot.querySelectorAll(`:scope > ${node}`);
    const treeResult = selectWrapper.querySelector(result)!;
    fireEvent.click(treeResult);
    await waitFor(async () => {
      await delay(200);
    });
    fireEvent.click(treeNodes[0].querySelector('svg')!);
    const treeChildren = treeNodes[0].querySelector(children)!;
    const treeChildrenNodes = treeChildren.querySelectorAll(node);
    fireEvent.click(treeChildrenNodes[1].querySelector(text)!);
    await waitFor(async () => {
      await delay(200);
    });
    textContentTest(treeResult, treeData?.[0]?.children?.[1]?.title);
    classLengthTest(treeResult, space, 0);
    fireEvent.mouseEnter(treeResult);
    await waitFor(async () => {
      await delay(200);
    });
    fireEvent.click(selectWrapper.querySelector(clearIcon)!);
    await waitFor(async () => {
      await delay(200);
    });
    classLengthTest(treeResult, space, 1);
    expect(onChangeAddition.mock.calls.length).toBe(2);
    fireEvent.mouseLeave(treeResult);
  });
  test('should render when click multiple', async () => {
    const { container } = render(<TreeSelectTest multiple />);
    const selectWrapper = container.querySelector(wrapper)!;
    fireEvent.click(selectWrapper.querySelector(result)!)
    await waitFor(async () => {
      await delay(200);
    });
    const treeRoot = selectWrapper.querySelector(root)!;
    const treeNodes = treeRoot.querySelectorAll(`:scope > ${node}`);
    const treeResult = selectWrapper.querySelector(result)!;
    fireEvent.click(treeResult);
    await waitFor(async () => {
      await delay(200);
    });
    fireEvent.click(treeNodes[0].querySelector('svg')!);
    const treeChildren = treeNodes[0].querySelector(children)!;
    const treeChildrenNodes = treeChildren.querySelectorAll(node);
    fireEvent.click(treeChildrenNodes[1].querySelector('input')!);
    fireEvent.click(treeNodes[1].querySelector('input')!);
    await waitFor(async () => {
      await delay(200);
    });
    const selectTags = treeResult.querySelectorAll(tag);
    expect(selectTags.length).toBe(3);
    fireEvent.click(selectTags[0].querySelector('svg')!);
    await waitFor(async () => {
      await delay(200);
    });
    expect(treeResult.querySelectorAll(tag).length).toBe(1);
  });
  test('should render when focus and blur', async () => {
    const { container } = render(<TreeSelectTest />);
    const selectWrapper = container.querySelector(wrapper)!;
    fireEvent.focus(selectWrapper);
    await waitFor(async () => {
      await delay(200);
    });
    classTest(selectWrapper, wrapperFocus);
    fireEvent.blur(selectWrapper);
    await waitFor(async () => {
      await delay(200);
    });
    // console.log('selectWrapper classList: >>', selectWrapper?.classList?.toString())
    classTest(selectWrapper, wrapperFocus, false);
  });
  test('should render when keyDown and tab', async () => {
    const onEnterExpand = jest.fn();
    const { container } = render(<TreeSelectTest onEnterExpand={onEnterExpand} open={undefined} />);
    const selectWrapper = container.querySelector(wrapper)!;
    fireEvent.keyDown(selectWrapper, { keyCode: 13 });
    fireEvent.click(selectWrapper.querySelector(result)!)
    await waitFor(async () => {
      await delay(200);
    });
    classTest(selectWrapper.querySelector(arrowIcon)!, arrowIconOpen);
    fireEvent.keyDown(selectWrapper, { keyCode: 9 });
    await waitFor(async () => {
      await delay(200);
    });
    const iconElement =   selectWrapper.querySelector(arrowIcon)!;
    // console.log('iconElement classList >>', iconElement.classList.toString())
    classTest(iconElement, arrowIconOpen, false);
    expect(onEnterExpand.mock.calls.length).toBe(1);
  });
  test('should call onChangeAddition with correct checked state in multiple mode', async () => {
    const onChangeAddition = jest.fn();
    const { container } = render(<TreeSelectTest multiple onChangeAddition={onChangeAddition} />);
    const selectWrapper = container.querySelector(wrapper)!;

    // 打开下拉框
    fireEvent.click(selectWrapper.querySelector(result)!);
    await waitFor(async () => {
      await delay(200);
    });

    // 展开第一个节点
    const treeRoot = selectWrapper.querySelector(root)!;
    const treeNodes = treeRoot.querySelectorAll(`:scope > ${node}`);
    fireEvent.click(treeNodes[0].querySelector('svg')!);

    // 选中第一个子节点
    const treeChildren = treeNodes[0].querySelector(children)!;
    const treeChildrenNodes = treeChildren.querySelectorAll(node);
    fireEvent.click(treeChildrenNodes[0].querySelector('input')!);
    await waitFor(async () => {
      await delay(200);
    });

    // 验证选中时的回调参数
    expect(onChangeAddition).toHaveBeenLastCalledWith(
      expect.objectContaining({
        checked: 1,
        current: expect.objectContaining({
          id: '1-1',
          title: 'node 1-1',
          children: expect.arrayContaining([
            expect.objectContaining({ id: '1-1-1', title: 'node 1-1-1' }),
            expect.objectContaining({ id: '1-1-2', title: 'node 1-1-2' })
          ])
        })
      })
    );

    // 取消选中
    fireEvent.click(treeChildrenNodes[0].querySelector('input')!);
    await waitFor(async () => {
      await delay(200);
    });

    // 验证取消选中时的回调参数
    expect(onChangeAddition).toHaveBeenLastCalledWith(
      expect.objectContaining({
        checked: 0,
        current: expect.objectContaining({
          id: '1-1',
          title: 'node 1-1',
          children: expect.arrayContaining([
            expect.objectContaining({ id: '1-1-1', title: 'node 1-1-1' }),
            expect.objectContaining({ id: '1-1-2', title: 'node 1-1-2' })
          ])
        })
      })
    );

    // 验证总共调用次数
    expect(onChangeAddition).toHaveBeenCalledTimes(2);
  });

  test('should render with renderOptionList', async () => {
    const customHeaderText = 'Custom Header';
    const customFooterText = 'Custom Footer';

    const { container } = render(
      <TreeSelectTest
        renderOptionList={(list) => (
          <div>
            <div data-testid="custom-header">{customHeaderText}</div>
            {list}
            <div data-testid="custom-footer">{customFooterText}</div>
          </div>
        )}
      />
    );

    const selectWrapper = container.querySelector(wrapper)!;

    // 打开下拉框
    fireEvent.click(selectWrapper.querySelector(result)!);
    await waitFor(async () => {
      await delay(200);
    });

    // 验证自定义 header 和 footer 是否渲染
    expect(screen.getByTestId('custom-header')).toBeInTheDocument();
    expect(screen.getByText(customHeaderText)).toBeInTheDocument();
    expect(screen.getByTestId('custom-footer')).toBeInTheDocument();
    expect(screen.getByText(customFooterText)).toBeInTheDocument();

    // 验证树形列表依然正常渲染
    const treeRoot = container.querySelector(root);
    expect(treeRoot).toBeInTheDocument();
    const treeNodes = treeRoot!.querySelectorAll(`:scope > ${node}`);
    expect(treeNodes.length).toBe(2);
  });

  test('should check on filtered data when checkOnFiltered is true', async () => {
    const onChange = jest.fn();
    const testData = [
      {
        id: '1',
        title: '1',
        children: [
          {
            id: '1-1',
            title: '1-1',
            children: [
              { id: '1-1-1', title: '1-1-1' },
              { id: '1-1-2', title: '1-1-2' },
            ],
          },
          { id: '1-2', title: '1-2' },
        ],
      },
      {
        id: '2',
        title: '2',
        children: [
          { id: '2-1', title: '2-1' },
          { id: '2-2', title: '2-2' },
        ],
      },
      { id: '3', title: '3', children: [{ id: '3-1', title: '3-1' }] },
    ];

    const { container } = render(
      <TreeSelect
        keygen="id"
        renderItem={(d: any) => `node ${d.title}`}
        data={testData}
        multiple
        mode={2}
        onChange={onChange}
        checkOnFiltered
        onFilter={(text: string) => (d: any) => `node ${d.title}`.indexOf(text) > -1}
        absolute={false}
      />
    );
    const selectWrapper = container.querySelector(wrapper)!;

    // 打开下拉框
    fireEvent.click(selectWrapper.querySelector(result)!);
    await waitFor(async () => {
      await delay(200);
    });

    // 输入筛选关键字 '1-1'，只会匹配到 node 1-1 及其子节点
    const input = selectWrapper.querySelector('input')!;
    fireEvent.change(input, { target: { value: '1-1' } });
    await waitFor(async () => {
      await delay(500);
    });

    // 在筛选结果中全选（应该只选中筛选后的节点）
    const treeRoot = container.querySelector(root)!;
    if (treeRoot) {
      const firstNode = treeRoot.querySelector(node);
      if (firstNode) {
        const checkbox = firstNode.querySelector('input[type="checkbox"]');
        if (checkbox) {
          fireEvent.click(checkbox);
          await waitFor(async () => {
            await delay(200);
          });

          // 验证 onChange 被调用
          expect(onChange).toHaveBeenCalled();
          const lastCall = onChange.mock.calls[onChange.mock.calls.length - 1];
          const selectedValues = lastCall[0];

          // 关键验证：选中的值应该只包含筛选后的节点（1-1, 1-1-1, 1-1-2）
          // 不应该包含 node 1, node 1-2, node 2, node 2-1, node 3, node 3-1
          expect(selectedValues).toBeDefined();
          expect(Array.isArray(selectedValues)).toBe(true);

          // 筛选 '1-1' 应该只匹配 1-1 及其子节点，mode=2 只返回叶子节点
          // 所以应该是 ['1-1-1', '1-1-2']
          expect(selectedValues).toEqual(['1-1-1', '1-1-2']);
        }
      }
    }
  });
});
