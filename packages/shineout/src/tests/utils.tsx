import React from 'react';
import { render } from '@testing-library/react';

export function classTest(element: Element, className: string, bool: boolean = true) {
  expect(element?.classList.contains(className)).toBe(bool);
}

export function snapshotTest(component: JSX.Element, testName: string = '') {
  test(`should render correctly ${testName}`, () => {
    const { container } = render(component);
    expect(container.firstChild).toMatchSnapshot();
  });
}

export function attributesTest(element: Element, attr: string, content: string) {
  expect(element.getAttribute(attr)).toBe(content);
}

export function hasAttributesTest(element: Element, attr: string, bool: boolean = true) {
  expect(element.hasAttribute(attr)).toBe(bool);
}

// test component class after excludes in components
export function componentsClassTest(
  components: NodeListOf<Element>,
  bool: boolean,
  componentClassName: string,
  excludes: string[] = [],
) {
  components.forEach((component) => {
    if (excludes.length && excludes.includes(component.textContent!) === !bool) return;
    classTest(component, componentClassName, bool);
  });
}

export function textContentTest(element: Element, text: string | null | undefined) {
  expect(element.textContent).toBe(text);
}

// test component class content
export function classContentTest(element: Element, name: string, bool: boolean = true) {
  expect(element.getAttribute('class')?.includes(name)).toBe(bool);
}

export function styleTest(element: Element, style: string) {
  attributesTest(element, 'style', style);
}

export function styleContentTest(element: Element, name: string, bool: boolean = true) {
  expect(element.getAttribute('style')?.includes(name)).toBe(bool);
}

export interface StyleProps {
  [key: string]: string;
}
interface BaseTestProps {
  style?: StyleProps;
  className?: string;
  children?: React.ReactNode;
  data?: any;
}
export type ReactComponentType = React.ComponentType<BaseTestProps>;
export function baseTest(
  Component: ReactComponentType | JSX.Element,
  selector: string,
  styleV: StyleProps = { backgroundColor: 'red' },
  styleRender: string = 'background-color: red;',
  className = 'demo',
  data?: any,
) {
  test('should render when set style and className', () => {
    let renderedComponent: React.ReactNode;

    if (React.isValidElement(Component)) {
      // 如果传递的是 JSX 元素
      renderedComponent = React.cloneElement(Component);
    } else {
      // 如果传递的是 React 组件类型
      const ComponentType = Component as ReactComponentType;
      renderedComponent = <ComponentType style={styleV} className={className} data={data} />;
    }
    const { container } = render(renderedComponent);
    const component = container.querySelector(selector)!;
    classTest(component, className);
    styleTest(component, styleRender);
  });
}

export function childrenTest(Component: React.ComponentType<BaseTestProps>, selector: string) {
  test('should set children', () => {
    const testContent = 'Test Children';
    const children = <div className='test'>{testContent}</div>;
    const { container } = render(<Component>{children}</Component>);
    const component = container.querySelector(selector);
    expect(component).toBeTruthy();
    expect(component?.querySelectorAll('.test').length).toBe(1);
    expect(component?.querySelector('.test')?.textContent).toBe(testContent);
  });
}

export function inputValueTest(element: Element, value: string) {
  attributesTest(element, 'value', value);
}

export function displayTest(Component: React.FC, displayName: string) {
  test('should start with Shineout display', () => {
    expect(Component.displayName).toBe(displayName);
  });
}

export const delay: (time: number) => Promise<void> = (time) =>
  new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, time);
  });

type classNamesMapType = {
  [key: string]: string;
};

function convertCamelToDash(str: string): string {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

// Automatically generate corresponding className according to jss type
export const createClassName = (
  componentsName: string,
  originClasses: string[],
  originItemClasses: string[],
): classNamesMapType => {
  const prefix = `so-${componentsName}-`;
  const classNamesMap: classNamesMapType = {};
  const classes = [...originClasses, ...originItemClasses];
  classes.forEach((item) => {
    classNamesMap[item] = `${prefix}${convertCamelToDash(item)}`;
    if (!originItemClasses.includes(item)) classNamesMap[item] = `.${classNamesMap[item]}`;
  });
  return classNamesMap;
};
