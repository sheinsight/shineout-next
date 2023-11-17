import React from 'react';
import { render, cleanup, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Tree from '..';
import mountTest from '../../tests/mountTest';
// import { classLengthTest } from '../../tests/structureTest'
import { baseTest, createClassName, displayTest } from '../../tests/utils';

const SO_PREFIX = 'tree';
const originClasses = ['tree', 'line', 'children', 'node', 'leaf', 'icon'];
const originItemClasses = [''];
const { tree: treeWrapper } = createClassName(SO_PREFIX, originClasses, originItemClasses);

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
afterEach(cleanup);
mountTest(<TreeTest />);

describe('Tree[Base]', () => {
  displayTest(Tree as React.FC, 'ShineoutTree');
  baseTest(TreeTest, treeWrapper);
  test('should render default', () => {
    render(<TreeTest className={'demo'} style={{ color: 'red' }} />);
    screen.debug();
  });
});
