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
