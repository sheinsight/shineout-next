import React from 'react';
import { render, cleanup, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Collapse from '..';
import { baseTest, createClassName, displayTest, snapshotTest } from '../../tests/utils';
import mountTest from '../../tests/mountTest';
import CollapseBase from '../__example__/01-base';
import CollapseAccordion from '../__example__/02-accordion';
import CollapseNestedPanels from '../__example__/03-nestedPanels';
import CollapseSimplePanel from '../__example__/04-simplePanel';
import CollapseCustomize from '../__example__/05-customize';
import CollapseExtra from '../__example__/06-extra';
import CollapseIcon from '../__example__/07-icon';

const SO_PREFIX = 'collapse';
const originClasses = ['wrapper'];
const originItemClasses = [''];
const { wrapper: collapseClassName } = createClassName(SO_PREFIX, originClasses, originItemClasses);

const defultTitle = 'This is panel header ';
const defaultContent = 'test';
const CollapseItemTest = (props: any) => (
  <Collapse.Item keygen={props.id} title={`${defultTitle}${props.id}`} {...props}>
    {defaultContent}
  </Collapse.Item>
);
const CollapseTest = (props: any) => (
  <Collapse {...props}>{props.children as React.ReactElement}</Collapse>
);

afterEach(cleanup);
mountTest(<Collapse />);

describe('Collapse[Base]', () => {
  displayTest(Collapse, 'ShineoutCollapse');
  baseTest(Collapse, collapseClassName);
  snapshotTest(<CollapseBase />);
  snapshotTest(<CollapseAccordion />, 'about accordion');
  snapshotTest(<CollapseNestedPanels />, 'about nested panels');
  snapshotTest(<CollapseSimplePanel />, 'about simple panel');
  snapshotTest(<CollapseCustomize />, 'about customize');
  snapshotTest(<CollapseExtra />, 'about extra');
  snapshotTest(<CollapseIcon />, 'about icon');
  test('should render default', () => {
    render(
      <CollapseTest>
        <CollapseItemTest id='1' />
        <CollapseItemTest id='2' />
      </CollapseTest>,
    );
    screen.debug();
  });
});
