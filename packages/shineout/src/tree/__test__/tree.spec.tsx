import React from 'react';
import { render, cleanup, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Tree from '..';
import mountTest from '../../tests/mountTest';
import { classLengthTest } from '../../tests/structureTest';
import {
  attributesTest,
  baseTest,
  classTest,
  createClassName,
  delay,
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

const TreeTest = (props: any) => (
  <Tree
    data={data}
    keygen={'id'}
    renderItem={(node: any) => <span>{`node ${node.id}`}</span>}
    {...props}
  />
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
  const DisabledTree = () => {
    const [value, setValue] = React.useState([]);
    const renderItem = (node: any) => {
      return <span>{`node ${node.id}`}</span>;
    };
    const isDisabled = (node: any) => {
      return node.id === '0-0';
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
          disabled={isDisabled}
          renderItem={renderItem}
        ></Tree>
      </div>
    );
  };
  test('should render when set disabled is function', () => {
    render(<DisabledTree />);
    // const treeWrapper = container.querySelector(treeClassName)!
    screen.debug();
    // classTest(treeWrapper, 'disabled')
  });
});
describe('Tree[Expand]', () => {
  test('should render when set expanded and onExpand', async () => {
    const { container } = render(<TreeExpand />);
    const buttons = container.querySelectorAll('button');
    const treeNode = container.querySelectorAll(nodeClassName);
    fireEvent.click(treeNode[0].querySelector(icon)!);
    attributesTest(treeNode[0].querySelector(iconWrapperClassName)!, 'data-expanded', 'true');
    fireEvent.click(buttons[1]);
    await waitFor(async () => {
      await delay(500);
    });
    screen.debug();
  });
});
