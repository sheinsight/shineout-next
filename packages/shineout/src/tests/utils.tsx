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

interface StyleProps {
  [key: string]: string;
}
interface BaseTestProps {
  style?: StyleProps;
  className?: string;
  children?: JSX.Element;
}
type ReactComponentType = React.ComponentType<BaseTestProps>;
export function baseTest(
  Component: ReactComponentType,
  selector: string,
  style: StyleProps = { backgroundColor: 'red' },
  styleRender: string = 'background-color: red;',
  className = 'demo',
) {
  test('should render when set style and className', () => {
    const { container } = render(
      React.isValidElement(Component) ? (
        Component
      ) : (
        <Component style={style} className={className} />
      ),
    );
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
