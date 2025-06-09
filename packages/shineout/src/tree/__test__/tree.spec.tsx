import React from 'react';
import { render, cleanup, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Tree from '..';
import { Button } from 'shineout';
import mountTest from '../../tests/mountTest';
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
import TreeBase from '../__example__/01-base';
import TreeSize from '../__example__/15-size';
import TreeLine from '../__example__/03-line';
import TreeExpand from '../__example__/04-01-expand';
import TreeDisabled from '../__example__/05-disabled';
import TreeOnChange from '../__example__/06-onchange';
import TreeLoader from '../__example__/07-loader';
import TreeDrag from '../__example__/08-drag';
import TreeDragStyle from '../__example__/09-drag-style';
import TreeHighlight from '../__example__/12-highlight';
import TreeHighlightControl from '../__example__/13-highlight-control';

const SO_PREFIX = 'tree';
const originClasses = [
  'tree',
  'root',
  'children',
  'node',
  'icon',
  'contentWrapper',
  'iconWrapper',
  'content',
  'text',
  'children',
  'checkbox',
];
const originItemClasses = ['line', 'childnode', 'leaf', 'noline'];
const {
  tree: treeClassName,
  line,
  root,
  node: nodeClassName,
  contentWrapper,
  iconWrapper: iconWrapperClassName,
  childnode,
  icon,
  content: contentClassName,
  text,
  children: childrenClassName,
  leaf,
  noline,
  checkbox,
} = createClassName(SO_PREFIX, originClasses, originItemClasses);

const { wrapperDisabled, wrapperChecked, wrapperIndeterminate } = createClassName(
  'checkbox',
  [''],
  ['wrapperDisabled', 'wrapperChecked', 'wrapperIndeterminate'],
);

const originCopyNodeStyle =
  'position: absolute; z-index: 99999; top: -1000px; left: -1000px; width: 0px; background: rgb(255, 255, 255); box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);';

const renderItem = (node: any) => {
  return <span>{`node ${node.id}`}</span>;
};

const data = [
  {
    id: '0',
    children: [
      {
        id: '0-0',
        children: [
          {
            id: '0-0-0',
            children: []
          },
          {
            id: '0-0-1',
            children: [
              {
                id: '0-0-1-0',
                children: []
              },
            ],
          },
        ],
      },
      {
        id: '0-1',
        children: [
          {
            id: '0-1-0',
            children: []
          },
        ],
      },
    ],
  },
];

const getIdsLength = (datas: any[], attr = 'children') => {
  let count = 0;
  if (!datas || !datas.length) return count;
  datas.forEach((item) => {
    if (item.id) {
      count++;
    }

    if (item[attr]) {
      count += getIdsLength(item[attr], attr);
    }
  });

  return count;
};

const TreeTest = (props: any) => (
  <Tree data={data} keygen={'id'} renderItem={renderItem} {...props} />
);
const CheckboxTree = (props: any) => {
  const [value, setValue] = React.useState([]);
  const handleChange = (v: any) => {
    setValue(v);
  };
  return <TreeTest onChange={handleChange} value={value} {...props} />;
};

afterEach(cleanup);
mountTest(<TreeTest />);

describe('Tree[Base]', () => {
  displayTest(Tree as React.FC, 'ShineoutTree');
  test('should render when set style and className', () => {
    const { container } = render(<TreeTest className='test' style={{ color: 'black' }} />);
    const treeWrapper = container.querySelector(treeClassName)!;
    classTest(treeWrapper, 'test');
    styleTest(treeWrapper, 'color: black;');
  })
  snapshotTest(<TreeBase />);
  snapshotTest(<TreeSize />, 'about size');
  snapshotTest(<TreeLine />, 'about line');
  snapshotTest(<TreeExpand />, 'about expand');
  snapshotTest(<TreeDisabled />, 'about disabled');
  snapshotTest(<TreeOnChange />, 'about onChange');
  snapshotTest(<TreeLoader />, 'about loader');
  snapshotTest(<TreeDrag />, 'about drag');
  snapshotTest(<TreeDragStyle />, 'about drag style');
  snapshotTest(<TreeHighlight />, 'about highlight');
  snapshotTest(<TreeHighlightControl />, 'about highlight control');

  test('should render default', () => {
    const { container } = render(<TreeTest />);
    const treeWrapper = container.querySelector(treeClassName)!;
    classTest(treeWrapper, line);
    styleTest(treeWrapper.querySelector(root)!, 'display: block;');
    const node = treeWrapper.querySelector(nodeClassName)!;
    const treeContentWapper = node.querySelector(contentWrapper)!;
    classTest(treeContentWapper, childnode);
    const treeIconWrapper = treeContentWapper.querySelector(iconWrapperClassName)!;
    attributesTest(treeIconWrapper, 'data-expanded', 'false');
    attributesTest(treeIconWrapper, 'data-icon', 'false');
    const iconWrapper = treeIconWrapper.querySelector(icon)!;
    classLengthTest(iconWrapper, 'svg', 1);
    const treeContent = treeContentWapper.querySelector(contentClassName)!;
    textContentTest(treeContent.querySelector(text)!, 'node 0');
    fireEvent.click(iconWrapper);
    attributesTest(treeIconWrapper, 'data-expanded', 'true');
    const treeChildren = node.querySelector(childrenClassName)!;
    const treeChildrenNode = treeChildren.querySelectorAll(nodeClassName)!;
    expect(treeChildrenNode.length).toBe(2);
    treeChildrenNode.forEach((item, index) => {
      textContentTest(
        item.querySelector(contentClassName)!.querySelector(text)!,
        `node 0-${index}`,
      );
    });
    fireEvent.click(treeChildrenNode[0].querySelector(icon)!);
    const treeGrandChildrenNode = treeChildrenNode[0]
      .querySelector(childrenClassName)
      ?.querySelectorAll(nodeClassName) as NodeListOf<Element>;
    treeGrandChildrenNode.forEach((item, index) => {
      textContentTest(
        item.querySelector(contentClassName)!.querySelector(text)!,
        `node 0-0-${index}`,
      );
      if (index === 1) return;
      classTest(item, leaf);
      classLengthTest(item, iconWrapperClassName, 0);
      fireEvent.click(iconWrapper);
      attributesTest(treeIconWrapper, 'data-expanded', 'false');
    });
  });
  // TODO: size
  // test('should render when set different size')
  test('should render when set line is false', () => {
    const { container } = render(<TreeTest line={false} />);
    const treeWrapper = container.querySelector(treeClassName)!;
    classTest(treeWrapper, noline);
  });
  test('should render when set childrenClass is string', () => {
    const { container } = render(<TreeTest childrenClass='test' defaultExpandAll />);
    const treeChildrens = container.querySelectorAll(childrenClassName)!;
    treeChildrens.forEach((item) => {
      classTest(item, 'test');
    });
  });
  test('should render when set childrenClass is function', () => {
    const { container } = render(
      <TreeTest childrenClass={(node: any) => (node.id === '0-0' ? 'test' : 'test2')} />,
    );
    const treeChildrens = container.querySelectorAll(childrenClassName)!;
    treeChildrens.forEach((item) => {
      if (item.querySelector(text)?.textContent !== `node 0-0`) return;
      classTest(item, 'test');
    });
  });
  test('should render when set iconClass', () => {
    const { container } = render(<TreeTest iconClass='test' defaultExpandAll />);
    const treeIcons = container.querySelectorAll(icon)!;
    treeIcons.forEach((item) => {
      classTest(item, 'test');
    });
  });
  test('should render when set leafClass', () => {
    const { container } = render(<TreeTest leafClass='test' defaultExpandAll />);
    const treeLeafs = container.querySelectorAll(`.${leaf}`)!;
    treeLeafs.forEach((item) => {
      classTest(item, 'test');
    });
  });
  test('should render when set nodeClass', () => {
    const { container } = render(<TreeTest nodeClass='test' defaultExpandAll />);
    const treeNodes = container.querySelectorAll(nodeClassName)!;
    treeNodes.forEach((item) => {
      classTest(item, 'test');
    });
  });
  test('should render when set childrenKey', () => {
    const newData = [
      {
        id: '0',
        item: [
          {
            id: '0-0',
            item: [
              {
                id: '0-0-0',
              },
              {
                id: '0-0-1',
                item: [
                  {
                    id: '0-0-1-0',
                  },
                ],
              },
            ],
          },
          {
            id: '0-1',
            item: [
              {
                id: '0-1-0',
              },
            ],
          },
        ],
      },
    ];
    const { container } = render(
      <Tree
        data={newData}
        keygen={'id'}
        renderItem={renderItem}
        childrenKey='item'
        defaultExpandAll
      />,
    );
    const treeWrapper = container.querySelector(treeClassName)!;
    const treeRootNodeAll = treeWrapper.querySelectorAll(nodeClassName)!;
    expect(treeRootNodeAll.length).toBe(getIdsLength(newData, 'item'));
  });
  test('should render when set renderItem is string', () => {
    const { container } = render(<TreeTest renderItem='id' />);
    textContentTest(container.querySelector(text)!, data[0].id);
  });
  test('should render when set keygen is function', () => {
    const { container } = render(
      <TreeTest keygen={(node: any) => `A${node.id}`} active='A0' highlight />,
    );
    attributesTest(container.querySelector(contentClassName)!, 'data-active', 'true');
  });
  test('should render when set loader', async () => {
    // todo 发现这个地方会随机报错
    // const { container } = render(<TreeLoader />);
    // const treeWrapper = container.querySelector(treeClassName)!;
    // const treeRootNode = treeWrapper.querySelectorAll(nodeClassName);
    // classTest(treeRootNode[1], leaf);
    // fireEvent.click(treeRootNode[1].querySelector(icon)!);
    // await waitFor(
    //   async () => {
    //     await delay(500);
    //   },
    //   { timeout: 2000 },
    // );
    // classLengthTest(treeRootNode[1], icon, 0);
    // await waitFor(
    //   async () => {
    //     await delay(1500);
    //   },
    //   { timeout: 2000 },
    // );
    // classTest(treeRootNode[1], leaf, false)
  });
});
describe('Tree[Disabled]', () => {
  const isDisabled = (node: any) => {
    return node.id === '0-0';
  };
  const DisabledTree = (props: any) => {
    const [value, setValue] = React.useState([]);
    const handleChange = (keys: any) => {
      setValue(keys);
    };
    return (
      <div>
        <Tree
          line={false}
          value={value}
          data={data}
          keygen='id'
          mode={0}
          defaultExpanded={['0']}
          onChange={handleChange}
          renderItem={renderItem}
          {...props}
        ></Tree>
      </div>
    );
  };
  test('should render when set disabled is boolean', () => {
    const { container } = render(<DisabledTree disabled />);
    const treeWrapper = container.querySelector(treeClassName)!;
    const treeNodes = treeWrapper.querySelectorAll(nodeClassName)!;
    treeNodes.forEach((item) => {
      classTest(item.querySelector(checkbox)!, wrapperDisabled);
    });
  });
  test('should render when set disabled is function', () => {
    const { container } = render(<DisabledTree disabled={isDisabled} />);
    const treeWrapper = container.querySelector(treeClassName)!;
    const treeNodes = treeWrapper.querySelectorAll(nodeClassName)!;
    treeNodes.forEach((item) => {
      if (item.querySelector(text)?.textContent !== `node 0-0`) return;
      classTest(item.querySelector(checkbox)!, wrapperDisabled);
    });
  });
});
describe('Tree[Expand]', () => {
  test('should render when expanded is control', async () => {
    const { getByText } = render(<TreeExpand />);
    await waitFor(async () => {
      await delay(100);
    });
    const buttonExpand = getByText('Expand all');
    const buttonCollapse = getByText('Collapse all');
    fireEvent.click(buttonExpand);
    await waitFor(async () => {
      await delay(500);
    });
    fireEvent.click(buttonCollapse);
    await waitFor(async () => {
      await delay(500);
    });
    // TODO: can`t collapse
  });
  test('should render when set defaultExpanded', async () => {
    const { container } = render(<TreeTest defaultExpanded={['0']} />);
    const treeWrapper = container.querySelector(treeClassName)!;
    const treeNodes = treeWrapper.querySelectorAll(nodeClassName)[0];
    attributesTest(treeNodes.querySelector(iconWrapperClassName)!, 'data-expanded', 'true');
  });
  // can`t expand when set defaultExpanded in deep children
  test('should render when set defaultExpanded in deep children', async () => {
    const { container } = render(<TreeTest defaultExpanded={['0-0']} />);
    const treeWrapper = container.querySelector(treeClassName)!;
    const treeNodes = treeWrapper.querySelectorAll(nodeClassName)[0];
    attributesTest(treeNodes.querySelector(iconWrapperClassName)!, 'data-expanded', 'false');
  });
  test('should render when set expanded and onExpand', async () => {
    const TreeExpand = () => {
      const [expanded, setExpanded] = React.useState([]);
      const handleExpand = (keys: any) => {
        setExpanded(keys);
      };
      return <TreeTest expanded={expanded} onExpand={handleExpand} />;
    };
    const { container } = render(<TreeExpand />);
    const treeWrapper = container.querySelector(treeClassName)!;
    const treeRootNode = treeWrapper.querySelector(nodeClassName)!;
    const treeRootNodeIcon = treeRootNode.querySelector(icon)!;
    fireEvent.click(treeRootNodeIcon);
    attributesTest(treeRootNode.querySelector(iconWrapperClassName)!, 'data-expanded', 'true');
    fireEvent.click(treeRootNodeIcon);
    attributesTest(treeRootNode.querySelector(iconWrapperClassName)!, 'data-expanded', 'false');
  });
  test('should render when set doubleClickExpand', () => {
    const { container } = render(<TreeTest doubleClickExpand />);
    const treeWrapper = container.querySelector(treeClassName)!;
    const treeRootNode = treeWrapper.querySelector(nodeClassName)!;
    attributesTest(treeRootNode.querySelector(iconWrapperClassName)!, 'data-expanded', 'false');
    fireEvent.dblClick(treeRootNode.querySelector(text)!);
    attributesTest(treeRootNode.querySelector(iconWrapperClassName)!, 'data-expanded', 'true');
  });
  test('should render when set defaultExpandAll', () => {
    const { container } = render(<TreeTest defaultExpandAll />);
    const treeWrapper = container.querySelector(treeClassName)!;
    const treeRootNodeAll = treeWrapper.querySelectorAll(nodeClassName)!;
    expect(treeRootNodeAll.length).toBe(getIdsLength(data));
  });
  test('should render when set expandIcons', () => {
    const { container } = render(
      <TreeTest expandIcons={[() => <span>+</span>, () => <span>-</span>]} />,
    );
    const treeWrapper = container.querySelector(treeClassName)!;
    const treeRootNode = treeWrapper.querySelector(nodeClassName)!;
    const treeRootNodeIcon = treeRootNode.querySelector(icon)!;
    textContentTest(treeRootNodeIcon, '+');
    fireEvent.click(treeRootNodeIcon);
    textContentTest(treeRootNodeIcon, '-');
  });
  test('should render when set parentClickExpand', () => {
    const { container } = render(<TreeTest parentClickExpand />);
    const treeWrapper = container.querySelector(treeClassName)!;
    const treeRootNode = treeWrapper.querySelector(nodeClassName)!;
    attributesTest(treeRootNode.querySelector(iconWrapperClassName)!, 'data-expanded', 'false');
    fireEvent.click(treeRootNode.querySelector(text)!);
    attributesTest(treeRootNode.querySelector(iconWrapperClassName)!, 'data-expanded', 'true');
  });
  test('should render when set onExpand', () => {
    const expandFn = jest.fn();
    const { container } = render(<TreeTest parentClickExpand onExpand={expandFn} />);
    const treeWrapper = container.querySelector(treeClassName)!;
    const treeRootNode = treeWrapper.querySelector(nodeClassName)!;
    fireEvent.click(treeRootNode.querySelector(text)!);
    expect(expandFn.mock.calls.length).toBe(1);
  });
  test('should render when set onClick', () => {
    const clickFn = jest.fn();
    const { container } = render(<TreeTest onClick={clickFn} />);
    const treeWrapper = container.querySelector(treeClassName)!;
    const treeRootNode = treeWrapper.querySelector(nodeClassName)!;
    fireEvent.click(treeRootNode.querySelector(text)!);
    expect(clickFn.mock.calls.length).toBe(1);
  });
  test('should render when set onClick when set parentClickExpand', () => {
    const clickFn = jest.fn();
    const { container } = render(<TreeTest onClick={clickFn} parentClickExpand />);
    const treeWrapper = container.querySelector(treeClassName)!;
    const treeRootNode = treeWrapper.querySelector(nodeClassName)!;
    fireEvent.click(treeRootNode.querySelector(text)!);
    expect(clickFn.mock.calls.length).toBe(0);
  });
  test('should render when click icon that expand default', () => {
    const { container } = render(<TreeTest expanded={['0']} />);
    const treeWrapper = container.querySelector(treeClassName)!;
    const treeRootNodeAll = treeWrapper.querySelectorAll(nodeClassName)!;
    attributesTest(
      treeRootNodeAll[0].querySelector(iconWrapperClassName)!,
      'data-expanded',
      'true',
    );
    fireEvent.click(treeRootNodeAll[0].querySelector(icon)!);
    attributesTest(
      treeRootNodeAll[0].querySelector(iconWrapperClassName)!,
      'data-expanded',
      'false',
    );
  });
});
describe('Tree[Active]', () => {
  test('should render when set active', () => {
    const { container } = render(<TreeTest highlight active={'0'} />);
    const treeWrapper = container.querySelector(treeClassName)!;
    const treeRootNode = treeWrapper.querySelector(nodeClassName)!;
    attributesTest(treeRootNode.querySelector(contentClassName)!, 'data-active', 'true');
  });
  test('should render when set highlight', () => {
    const { container } = render(<TreeTest highlight />);
    const treeWrapper = container.querySelector(treeClassName)!;
    const treeRootNode = treeWrapper.querySelector(nodeClassName)!;
    fireEvent.click(treeRootNode.querySelector(text)!);
    attributesTest(treeRootNode.querySelector(contentClassName)!, 'data-active', 'true');
  });
});
describe('Tree[Checkbox]', () => {
  const ModeTree = (props: any) => {
    const [value, setValue] = React.useState([]);
    const handleChange = (v: any) => {
      setValue(v);
    };
    return (
      <div>
        <div className='show'>{value.join(' ')}</div>
        <TreeTest
          defaultExpandAll
          value={value}
          onChange={handleChange}
          renderItem='id'
          {...props}
        />
      </div>
    );
  };
  const modeTestMain = (container: HTMLElement) => {
    const treeContents = container.querySelectorAll(contentClassName);
    const getText = (n: number) => treeContents[n].querySelector(text)?.textContent;
    const show = container.querySelector('.show')!;
    return {
      treeContents,
      getText,
      show,
    };
  };
  test('should render checkbox when set onChange', () => {
    const { container } = render(<CheckboxTree />);
    const treeContentWapper = container.querySelector(contentClassName)!;
    classLengthTest(treeContentWapper, checkbox, 1);
    // TODO: should test checkbox onchang event
  });
  // Return fully selected node when set mode is 0
  test('should render when set mode is 0', () => {
    const { container } = render(<ModeTree mode={0} />);
    const { treeContents, getText, show } = modeTestMain(container);
    fireEvent.click(treeContents[3].querySelector(checkbox)!);
    textContentTest(show, `${getText(4)} ${getText(3)}`);
    classTest(treeContents[0].querySelector(checkbox)!, wrapperIndeterminate);
    classTest(treeContents[1].querySelector(checkbox)!, wrapperIndeterminate);
    classTest(treeContents[3].querySelector(checkbox)!, wrapperChecked);
    classTest(treeContents[4].querySelector(checkbox)!, wrapperChecked);
    fireEvent.click(treeContents[2].querySelector(checkbox)!);
    textContentTest(show, `${getText(2)} ${getText(4)} ${getText(3)} ${getText(1)}`);
    classTest(treeContents[1].querySelector(checkbox)!, wrapperChecked);
  });
  // Return fully and half selected node when set mode is 1
  test('should render when set mode is 1', () => {
    const { container } = render(<ModeTree mode={1} />);
    const { treeContents, getText, show } = modeTestMain(container);
    fireEvent.click(treeContents[3].querySelector(checkbox)!);
    textContentTest(show, `${getText(4)} ${getText(3)} ${getText(1)} ${getText(0)}`);
  });
  // Return leaf node when set mode is 2
  test('should render when set mode is 2', () => {
    const { container } = render(<ModeTree mode={2} />);
    const { treeContents, getText, show } = modeTestMain(container);
    fireEvent.click(treeContents[1].querySelector(checkbox)!);
    textContentTest(show, `${getText(2)} ${getText(4)}`);
    classTest(treeContents[0].querySelector(checkbox)!, wrapperIndeterminate);
    classTest(treeContents[1].querySelector(checkbox)!, wrapperChecked);
    classTest(treeContents[2].querySelector(checkbox)!, wrapperChecked);
    classTest(treeContents[3].querySelector(checkbox)!, wrapperChecked);
    classTest(treeContents[4].querySelector(checkbox)!, wrapperChecked);
    fireEvent.click(treeContents[2].querySelector(checkbox)!);
    classTest(treeContents[1].querySelector(checkbox)!, wrapperIndeterminate);
  });
  // Return fully select parent node when set mode is 3
  test('should render when set mode is 3', () => {
    const { container } = render(<ModeTree mode={3} />);
    const { treeContents, getText, show } = modeTestMain(container);
    fireEvent.click(treeContents[1].querySelector(checkbox)!);
    textContentTest(show, `${getText(1)}`);
    classTest(treeContents[0].querySelector(checkbox)!, wrapperIndeterminate);
    classTest(treeContents[1].querySelector(checkbox)!, wrapperChecked);
    classTest(treeContents[2].querySelector(checkbox)!, wrapperChecked);
    classTest(treeContents[3].querySelector(checkbox)!, wrapperChecked);
    classTest(treeContents[4].querySelector(checkbox)!, wrapperChecked);
    fireEvent.click(treeContents[5].querySelector(checkbox)!);
    textContentTest(show, `${getText(0)}`);
  });
  // Return only select node when set mode is 4
  test('should render when set mode is 4', () => {
    const { container } = render(<ModeTree mode={4} />);
    const { treeContents, getText, show } = modeTestMain(container);
    fireEvent.click(treeContents[1].querySelector(checkbox)!);
    textContentTest(show, `${getText(1)}`);
    fireEvent.click(treeContents[2].querySelector(checkbox)!);
    textContentTest(show, `${getText(2)} ${getText(1)}`);
  });
  test('should render when set defaultValue', () => {
    const changeFn = jest.fn();
    const { container } = render(
      <TreeTest defaultValue={['0-0']} defaultExpandAll onChange={changeFn} mode={4} />,
    );
    const treeWrapper = container.querySelector(treeClassName)!;
    const treeRootNodeAll = treeWrapper.querySelectorAll(nodeClassName)!;
    treeRootNodeAll.forEach((item) => {
      if (item.querySelector(text)?.textContent !== `node 0-0`) return;
      classTest(item.querySelector(checkbox)!, wrapperChecked);
    });
  });
  test('should render when set value and defaultValue at the same time', () => {
    const changeFn = jest.fn();
    const { container } = render(
      <TreeTest
        defaultValue={['0-0']}
        value={['0']}
        defaultExpandAll
        onChange={changeFn}
        mode={4}
      />,
    );
    const treeWrapper = container.querySelector(treeClassName)!;
    const treeRootNodeAll = treeWrapper.querySelectorAll(nodeClassName)!;
    treeRootNodeAll.forEach((item) => {
      if (item.querySelector(text)?.textContent === `node 0`) return;
      classTest(item.querySelector(checkbox)!, wrapperChecked, false);
    });
    classTest(treeRootNodeAll[0].querySelector(checkbox)!, wrapperChecked);
  });
});
describe('Tree[Drag]', () => {
  class MockDataTransfer {
    dropEffect = '';
    effectAllowed = '';
    files: any[] = [];
    items: any[] = [];
    types: any[] = [];
    setData() {}
    getData() {
      return '';
    }
    clearData() {}
    setDragImage() {}
  }
  test('should render when set onDrop', async () => {
    const dropFn = jest.fn();
    const { container } = render(<TreeTest onDrop={dropFn} defaultExpandAll />);
    const treeWrapper = container.querySelector(treeClassName)!;
    const treeRootNodeAll = treeWrapper.querySelectorAll(nodeClassName)!;
    treeRootNodeAll.forEach((item) => {
      attributesTest(item, 'draggable', 'true');
    });
    expect(document.querySelectorAll(contentClassName).length).toBe(7);
    const firstNode = treeRootNodeAll[1];
    fireEvent.dragStart(firstNode, {
      dataTransfer: new MockDataTransfer(),
    });
    const elements = document.querySelectorAll(contentClassName)!;
    expect(elements.length).toBe(8);
    styleTest(elements[elements.length - 1], originCopyNodeStyle);
    textContentTest(elements[elements.length - 1], 'node 0-0');
    await waitFor(async () => {
      await delay(100);
    });
    treeRootNodeAll.forEach((item) => {
      if (item.textContent !== 'node 0-0') return;
      styleTest(item, 'display: none;');
    });

    fireEvent.dragOver(firstNode.querySelector(contentClassName)!, {
      clientY: 20,
      target: {
        getBoundingClientRect: () => ({
          height: 20,
        }),
      },
    });
    fireEvent.dragEnd(firstNode);

    treeRootNodeAll.forEach((item) => {
      if (item.textContent !== 'node 0-0') return;
      styleTest(item, '');
    });
    expect(document.querySelectorAll(contentClassName).length).toBe(7);
    expect(dropFn.mock.calls.length).toBe(1);
  });
  test('should render when set onDragStart/onDragEnd/onDragOver/onDragLeave', () => {
    const dropFn = jest.fn();
    const dragStartFn = jest.fn();
    const dragEndFn = jest.fn();
    const dragLeaveFn = jest.fn();
    const dragOver = jest.fn();
    const { container } = render(
      <TreeTest
        onDragStart={dragStartFn}
        onDragEnd={dragEndFn}
        onDragLeave={dragLeaveFn}
        onDragOver={dragOver}
        onDrop={dropFn}
        defaultExpandAll
      />,
    );
    const treeWrapper = container.querySelector(treeClassName)!;

    const treeRootNodeAll = treeWrapper.querySelectorAll(nodeClassName)!;
    const firstNode = treeRootNodeAll[0];
    const dataTransfer = new MockDataTransfer();
    fireEvent.dragStart(firstNode, {
      dataTransfer,
    });
    fireEvent.dragOver(firstNode.querySelector(contentWrapper)!, {
      clientY: 20,
      dataTransfer,
      target: {
        getBoundingClientRect: () => ({
          top: 50,
          bottom: 70,
        }),
      },
    });
    fireEvent.dragEnd(firstNode, { dataTransfer });
    fireEvent.dragLeave(firstNode, { dataTransfer });
    expect(dropFn.mock.calls.length).toBe(1);
    expect(dragStartFn.mock.calls.length).toBe(1);
    expect(dragEndFn.mock.calls.length).toBe(1);
    expect(dragOver.mock.calls.length).toBe(1);
    expect(dragLeaveFn.mock.calls.length).toBe(1);
  });
  test('should render when set dragImageStyle', () => {
    const dropFn = jest.fn();
    const { container } = render(
      <TreeTest dragImageStyle={{ color: 'red' }} defaultExpandAll onDrop={dropFn} />,
    );
    const treeWrapper = container.querySelector(treeClassName)!;
    const treeRootNodeAll = treeWrapper.querySelectorAll(nodeClassName)!;
    const firstNode = treeRootNodeAll[1];
    fireEvent.dragStart(firstNode, {
      dataTransfer: new MockDataTransfer(),
    });
    const elements = document.querySelectorAll(contentClassName)!;
    styleTest(elements[elements.length - 1], `${originCopyNodeStyle} color: red;`);
  });
});
describe('Tree[Data]', () => {
  const TreeData = (props: any) => {
    const [item, setItem] = React.useState(data);
    const handleItem = () => {
      setItem([
        {
          id: '1',
          children: [
            {
              id: '1-0',
              children: [
                {
                  id: '1-0-0',
                  children: []
                },
                {
                  id: '1-0-1',
                  children: [
                    {
                      id: '1-0-1-0',
                      children: []
                    },
                  ],
                },
              ],
            },
            {
              id: '1-1',
              children: [
                {
                  id: '1-1-0',
                  children: []
                },
              ],
            },
          ],
        },
      ]);
    };
    return (
      <div>
        <Button onClick={handleItem}>changeItem</Button>
        <TreeTest data={item} {...props} />
      </div>
    );
  };
  test('should render when data is control', () => {
    const { container } = render(<TreeData />);
    const treeWrapper = container.querySelector(treeClassName)!;
    const treeRootNodeAll = treeWrapper.querySelectorAll(nodeClassName)!;
    const buttonItem = container.querySelector('button')!;
    textContentTest(treeRootNodeAll[0].querySelector(text)!, 'node 0');
    fireEvent.click(buttonItem);
    textContentTest(treeWrapper.querySelectorAll(nodeClassName)[0].querySelector(text)!, 'node 1');
  });
  // TODO: dataUpdate
  // test('should render when set dataUpdate is false and data is control', () => {
  //   const { container } = render(<TreeData dataUpdate={false} />);
  //   const treeWrapper = container.querySelector(treeClassName)!;
  //   const treeRootNodeAll = treeWrapper.querySelectorAll(nodeClassName)!;
  //   const buttonItem = container.querySelector('button')!;
  //   textContentTest(treeRootNodeAll[0].querySelector(text)!, 'node 0');
  //   fireEvent.click(buttonItem);
  //   textContentTest(treeWrapper.querySelectorAll(nodeClassName)[0].querySelector(text)!, 'node 0');
  // })
});
// dataUpdate/dragHoverExpand/dragImageSelector/dragSibling
