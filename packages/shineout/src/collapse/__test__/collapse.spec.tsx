import React from 'react';
import { render, cleanup, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Collapse from '..';
import {
  attributesTest,
  baseTest,
  classTest,
  createClassName,
  delay,
  displayTest,
  snapshotTest,
  styleContentTest,
  styleTest,
  textContentTest,
} from '../../tests/utils';
import { classLengthTest } from '../../tests/structureTest';
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
const originItemClasses = ['borderLess'];
const { wrapper: collapseClassName, borderLess: collapseBorderLess } = createClassName(
  SO_PREFIX,
  originClasses,
  originItemClasses,
);

const SO_PREFIX_ITEM = 'collapseItem';
const originClassesByItem = [
  'wrapper',
  'header',
  'icon',
  'title',
  'content',
  'contentMain',
  'extra',
];
const originItemClassesByItem = ['region', 'activeTransform', 'disabled', 'borderLess'];
const {
  wrapper: collapseItemClassName,
  header,
  icon,
  title,
  content,
  contentMain,
  region,
  activeTransform,
  disabled,
  borderLess: collapseItemBorderLess,
  extra,
} = createClassName(SO_PREFIX_ITEM, originClassesByItem, originItemClassesByItem);

// style without delay
const defaultContentStyle = 'display: none;';
const defaultContentStyleActive = 'display: block; height: 0px; overflow: hidden;';

// simple style
const simpleDefaultContentStyle = 'display: none;';
const simpleDefaultContentStyleActive = 'display: block;';

const testClassName = 'test';
const testStyle = { color: 'red' };
const testStyleContent = 'color: red;';

const defultTitle = 'This is panel header ';
const defaultContent = 'test';
const CollapseItemTest = (props: any) => (
  <Collapse.Item keygen={props.id} title={`${defultTitle}${props.id}`} {...props}>
    {props.children || defaultContent}
  </Collapse.Item>
);
const CollapseTest = (props: any) => (
  <Collapse {...props}>{props.children as React.ReactElement}</Collapse>
);

beforeAll(() => {
  jest.useFakeTimers();
});
afterAll(() => {
  jest.runAllTimers();
});
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
    const { container } = render(
      <CollapseTest>
        <CollapseItemTest id='1' />
        <CollapseItemTest id='2' />
      </CollapseTest>,
    );
    const collapseWrapper = container.querySelector(collapseClassName)!;
    const collapseItemWrappers = collapseWrapper.querySelectorAll(collapseItemClassName);
    expect(collapseItemWrappers.length).toBe(2);
    collapseItemWrappers.forEach((item, index) => {
      const headerWrapper = item.querySelector(header)!;
      classTest(headerWrapper, region);
      attributesTest(headerWrapper, 'data-soui-disabled', 'false');
      const iconWrapper = headerWrapper.querySelector(icon)!;
      classTest(iconWrapper, activeTransform);
      classLengthTest(iconWrapper, 'svg', 1);
      const titleWrapper = headerWrapper.querySelector(title)!;
      textContentTest(titleWrapper, `${defultTitle}${index + 1}`);
      const contentWrapper = item.querySelector(content)!;
      attributesTest(contentWrapper, 'data-sheinx-animation-duration', 'fast');
      attributesTest(contentWrapper, 'data-sheinx-animation-type', 'collapse');
      styleTest(contentWrapper, defaultContentStyle);
      textContentTest(contentWrapper.querySelector(contentMain)!, defaultContent);
    });
  });
  test('should render default expand region', () => {
    const { container } = render(
      <CollapseTest>
        <CollapseItemTest id='1' />
        <CollapseItemTest id='2' />
      </CollapseTest>,
    );
    const collapseWrapper = container.querySelector(collapseClassName)!;
    const collapseItemWrappers = collapseWrapper.querySelectorAll(collapseItemClassName);
    fireEvent.click(collapseItemWrappers[0].querySelector(title)!);
    styleTest(collapseItemWrappers[0].querySelector(content)!, defaultContentStyleActive);
    fireEvent.click(collapseItemWrappers[1].querySelector(icon)!);
    styleTest(collapseItemWrappers[1].querySelector(content)!, defaultContentStyleActive);
  });
  test('should render when set triggerRegion is icon', () => {
    const { container } = render(
      <CollapseTest triggerRegion={'icon'}>
        <CollapseItemTest id='1' />
        <CollapseItemTest id='2' />
      </CollapseTest>,
    );
    const collapseWrapper = container.querySelector(collapseClassName)!;
    const collapseItemWrappers = collapseWrapper.querySelectorAll(collapseItemClassName);
    fireEvent.click(collapseItemWrappers[0].querySelector(title)!);
    styleTest(collapseItemWrappers[0].querySelector(content)!, defaultContentStyle);
    fireEvent.click(collapseItemWrappers[1].querySelector(icon)!);
    styleTest(collapseItemWrappers[1].querySelector(content)!, defaultContentStyleActive);
  });
  test('should render when set triggerRegion is disbaled', () => {
    const { container } = render(
      <CollapseTest triggerRegion={'disabled'}>
        <CollapseItemTest id='1' />
        <CollapseItemTest id='2' />
      </CollapseTest>,
    );
    const collapseWrapper = container.querySelector(collapseClassName)!;
    const collapseItemWrappers = collapseWrapper.querySelectorAll(collapseItemClassName);
    collapseItemWrappers.forEach((item) => {
      classTest(item, disabled);
    });
    fireEvent.click(collapseItemWrappers[0].querySelector(title)!);
    styleTest(collapseItemWrappers[0].querySelector(content)!, defaultContentStyle);
    fireEvent.click(collapseItemWrappers[1].querySelector(icon)!);
    styleTest(collapseItemWrappers[1].querySelector(content)!, defaultContentStyle);
  });
  test('should render when set disbaled in item', () => {
    const { container } = render(
      <CollapseTest>
        <CollapseItemTest id='1' disabled />
        <CollapseItemTest id='2' />
      </CollapseTest>,
    );
    const collapseWrapper = container.querySelector(collapseClassName)!;
    const collapseItemWrappers = collapseWrapper.querySelectorAll(collapseItemClassName);
    classTest(collapseItemWrappers[0], disabled);
    fireEvent.click(collapseItemWrappers[0].querySelector(title)!);
    styleTest(collapseItemWrappers[0].querySelector(content)!, defaultContentStyle);
    fireEvent.click(collapseItemWrappers[1].querySelector(icon)!);
    styleTest(collapseItemWrappers[1].querySelector(content)!, defaultContentStyleActive);
  });
  test('should render when set accordion', async () => {
    const { container } = render(
      <CollapseTest accordion>
        <CollapseItemTest id='1' />
        <CollapseItemTest id='2' />
      </CollapseTest>,
    );
    const collapseWrapper = container.querySelector(collapseClassName)!;
    const collapseItemWrappers = collapseWrapper.querySelectorAll(collapseItemClassName);
    fireEvent.click(collapseItemWrappers[0].querySelector(title)!);
    styleTest(collapseItemWrappers[0].querySelector(content)!, defaultContentStyleActive);
    fireEvent.click(collapseItemWrappers[1].querySelector(title)!);
    await waitFor(async () => {
      await delay(500);
    });
    styleContentTest(
      collapseItemWrappers[1].querySelector(content)!,
      simpleDefaultContentStyleActive,
    );
    styleContentTest(collapseItemWrappers[0].querySelector(content)!, simpleDefaultContentStyle);
  });
  test('should render when set border is false', () => {
    const { container } = render(
      <CollapseTest border={false}>
        <CollapseItemTest id='1' />
        <CollapseItemTest id='2' />
      </CollapseTest>,
    );
    const collapseWrapper = container.querySelector(collapseClassName)!;
    const collapseItemWrappers = collapseWrapper.querySelectorAll(collapseItemClassName);
    classTest(collapseWrapper, collapseBorderLess);
    collapseItemWrappers.forEach((item) => {
      classTest(item, collapseItemBorderLess);
    });
  });
  test('should render when set extra', () => {
    const extraContent = 'extraContent';
    const { container } = render(
      <CollapseTest>
        <CollapseItemTest id='1' extra={extraContent} />
        <CollapseItemTest id='2' />
      </CollapseTest>,
    );
    const collapseWrapper = container.querySelector(collapseClassName)!;
    const collapseItemWrappers = collapseWrapper.querySelectorAll(collapseItemClassName);
    textContentTest(collapseItemWrappers[0].querySelector(extra)!, extraContent);
  });
  test('should render when set extraPosition', () => {
    const extraContent = 'extraContent';
    const { container, rerender } = render(
      <CollapseTest extraPosition={'right'}>
        <CollapseItemTest id='1' extra={extraContent} />
        <CollapseItemTest id='2' />
      </CollapseTest>,
    );
    const collapseWrapper = container.querySelector(collapseClassName)!;
    const collapseItemWrappers = collapseWrapper.querySelectorAll(collapseItemClassName);
    const collapseHeaderWrappers = collapseItemWrappers[0].querySelector(header);
    classTest(collapseHeaderWrappers?.lastElementChild as Element, extra.split('.')[1]);
    rerender(
      <CollapseTest extraPosition={'left'}>
        <CollapseItemTest id='1' extra={extraContent} />
        <CollapseItemTest id='2' />
      </CollapseTest>,
    );
    const newCollapseHeaderWrappers = collapseItemWrappers[0].querySelector(header);
    classTest(
      newCollapseHeaderWrappers?.firstElementChild?.nextElementSibling as Element,
      extra.split('.')[1],
    );
  });
  test('should render when set defaultActive', () => {
    const { container } = render(
      <CollapseTest defaultActive={['1']}>
        <CollapseItemTest id='1' />
        <CollapseItemTest id='2' />
      </CollapseTest>,
    );
    const collapseWrapper = container.querySelector(collapseClassName)!;
    const collapseItemWrappers = collapseWrapper.querySelectorAll(collapseItemClassName);
    styleTest(collapseItemWrappers[0].querySelector(content)!, simpleDefaultContentStyleActive);
  });
  test('should render when set active and defaultActive at the same time', () => {
    const { container } = render(
      <CollapseTest defaultActive={['2']} active={['1']}>
        <CollapseItemTest id='1' />
        <CollapseItemTest id='2' />
      </CollapseTest>,
    );
    const collapseWrapper = container.querySelector(collapseClassName)!;
    const collapseItemWrappers = collapseWrapper.querySelectorAll(collapseItemClassName);
    styleTest(collapseItemWrappers[0].querySelector(content)!, simpleDefaultContentStyleActive);
    styleTest(collapseItemWrappers[1].querySelector(content)!, defaultContentStyle);
  });
  test('should render when set active and onChange', async () => {
    const App = () => {
      const [active, setActive] = React.useState(['1']);
      const onChange = (_: any, keys: string[]) => {
        setActive(keys);
      };
      return (
        <CollapseTest active={active} onChange={onChange}>
          <CollapseItemTest id='1' />
          <CollapseItemTest id='2' />
        </CollapseTest>
      );
    };
    const { container } = render(<App />);
    const collapseWrapper = container.querySelector(collapseClassName)!;
    const collapseItemWrappers = collapseWrapper.querySelectorAll(collapseItemClassName);
    styleTest(collapseItemWrappers[0].querySelector(content)!, simpleDefaultContentStyleActive);
    fireEvent.click(collapseItemWrappers[1].querySelector(icon)!);
    styleContentTest(
      collapseItemWrappers[1].querySelector(content)!,
      simpleDefaultContentStyleActive,
    );
    fireEvent.click(collapseItemWrappers[1].querySelector(icon)!);
    await waitFor(async () => {
      await delay(500);
    });
    styleContentTest(collapseItemWrappers[1].querySelector(content)!, simpleDefaultContentStyle);
  });
  test('should render when set expandIcon', () => {
    const { container } = render(
      <CollapseTest expandIcon={<div className='test'>test</div>}>
        <CollapseItemTest id='1' />
        <CollapseItemTest id='2' />
      </CollapseTest>,
    );
    const collapseWrapper = container.querySelector(collapseClassName)!;
    const collapseItemWrappers = collapseWrapper.querySelectorAll(collapseItemClassName);
    collapseItemWrappers.forEach((item) => {
      const iconWrapper = item.querySelector(icon)!;
      classLengthTest(iconWrapper, '.test', 1);
    });
  });
  test('should render when set expandIconPosition', () => {
    const { container, rerender } = render(
      <CollapseTest>
        <CollapseItemTest id='1' />
        <CollapseItemTest id='2' />
      </CollapseTest>,
    );
    const collapseWrapper = container.querySelector(collapseClassName)!;
    const collapseItemWrappers = collapseWrapper.querySelectorAll(collapseItemClassName);
    collapseItemWrappers.forEach((item) => {
      const headerWrapper = item.querySelector(header)!;
      classTest(headerWrapper.firstElementChild as Element, icon.split('.')[1]);
    });
    rerender(
      <CollapseTest expandIconPosition='right'>
        <CollapseItemTest id='1' />
        <CollapseItemTest id='2' />
      </CollapseTest>,
    );
    const newCollapseItemWrappers = collapseWrapper.querySelectorAll(collapseItemClassName);
    newCollapseItemWrappers.forEach((item) => {
      const headerWrapper = item.querySelector(header)!;
      classTest(headerWrapper.lastElementChild as Element, icon.split('.')[1]);
    });
  });
  test('should render when set showExpandIcon', () => {
    const { container } = render(
      <CollapseTest>
        <CollapseItemTest id='1' showExpandIcon={false} />
        <CollapseItemTest id='2' />
      </CollapseTest>,
    );
    const collapseWrapper = container.querySelector(collapseClassName)!;
    const collapseItemWrappers = collapseWrapper.querySelectorAll(collapseItemClassName);
    classLengthTest(collapseItemWrappers[0], icon, 0);
  });
  test('should render when set className and style in item', () => {
    const { container } = render(
      <CollapseTest>
        <CollapseItemTest id='1' className={testClassName} style={testStyle} />
        <CollapseItemTest id='2' />
      </CollapseTest>,
    );
    const collapseWrapper = container.querySelector(collapseClassName)!;
    const collapseItemWrappers = collapseWrapper.querySelectorAll(collapseItemClassName);
    classTest(collapseItemWrappers[0], testClassName);
    styleTest(collapseItemWrappers[0], testStyleContent);
  });
  test('should render when set contentStyle', () => {
    const { container } = render(
      <CollapseTest>
        <CollapseItemTest id='1' contentStyle={testStyle} />
        <CollapseItemTest id='2' />
      </CollapseTest>,
    );
    const collapseWrapper = container.querySelector(collapseClassName)!;
    const collapseItemWrappers = collapseWrapper.querySelectorAll(collapseItemClassName);
    styleTest(collapseItemWrappers[0].querySelector(contentMain)!, testStyleContent);
  });
  test('should render when have nested panels', () => {
    const { container } = render(
      <CollapseTest>
        <CollapseItemTest id='1'>
          <CollapseTest>
            <CollapseItemTest id='2' />
            <CollapseItemTest id='3' />
          </CollapseTest>
        </CollapseItemTest>
        <CollapseItemTest id='4' />
      </CollapseTest>,
    );
    const childrenCollapseWrapper = container.querySelector(
      `${contentMain} > ${collapseClassName}`,
    );
    expect(childrenCollapseWrapper).toBeInTheDocument();
  });
});