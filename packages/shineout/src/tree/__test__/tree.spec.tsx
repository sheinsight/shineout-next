import React from 'react';
import { render, cleanup, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Tree from '..';
import mountTest from '../../tests/mountTest';
import { classLengthTest } from '../../tests/structureTest';
import {
  attributesTest,
  baseTest,
  classTest,
  createClassName,
  displayTest,
  snapshotTest,
  styleTest,
  textContentTest,
} from '../../tests/utils';
import TreeBase from '../__example__/01-base';
import TreeSize from '../__example__/02-size';
import TreeLine from '../__example__/03-line';
import TreeExpand from '../__example__/04-expand';
import TreeDisabled from '../__example__/05-disabled';
import TreeOnChange from '../__example__/06-onchange';
import TreeLoader from '../__example__/07-loader';
import TreeDrag from '../__example__/08-drag';
import TreeDragStyle from '../__example__/09-drag-style';
import TreeHighlight from '../__example__/10-highlight';

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

const { wrapperDisabled } = createClassName('checkbox', [''], ['wrapperDisabled']);

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
          },
          {
            id: '0-0-1',
            children: [
              {
                id: '0-0-1-0',
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
          },
        ],
      },
    ],
  },
];

const getIdsLength = (data: any[]) => {
  let count = 0;

  data.forEach((item) => {
    if (item.id) {
      count++;
    }

    if (item.children) {
      count += getIdsLength(item.children);
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
  baseTest(TreeTest, treeClassName);
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
    });
  });
  // TODO: size
  // test('should render when set different size')
  test('should render when set line is false', () => {
    const { container } = render(<TreeTest line={false} />);
    const treeWrapper = container.querySelector(treeClassName)!;
    classTest(treeWrapper, noline);
  });
  test('should render checkbox when set onChange', () => {
    const { container } = render(<CheckboxTree />);
    const treeContentWapper = container.querySelector(contentClassName)!;
    classLengthTest(treeContentWapper, checkbox, 1);
  });
});
describe('Tree[Disabled]', () => {
  const isDisabled = (node: any) => {
    return node.id === '0-0';
  };
  const DisabledTree = (props: any) => {
    const [value, setValue] = React.useState([]);
    const renderItem = (node: any) => {
      return <span>{`node ${node.id}`}</span>;
    };
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
  // TODO: dragHoverExpand
});
describe('Tree[Active]', () => {
  test('should render when set active', () => {
    const { container } = render(<TreeTest highlight active={'0'} />);
    const treeWrapper = container.querySelector(treeClassName)!;
    const treeRootNode = treeWrapper.querySelector(nodeClassName)!;
    screen.debug();
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
