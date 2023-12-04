import { render } from '@testing-library/react';

export function classLengthTest(container: Element | Document, name: string, nums: number) {
  expect(container.querySelectorAll(name).length).toBe(nums);
}

interface attributeProps {
  attribute: string;
  num: number;
}

export function structureTestInContainer(container: Element, attributes: attributeProps[]) {
  attributes.forEach((value) => {
    classLengthTest(container, value.attribute, value.num);
  });
}

export default function structureTest(Component: JSX.Element, attributes: attributeProps[]) {
  test('should render when not set attribute', () => {
    const { container } = render(Component);
    structureTestInContainer(container, attributes);
  });
}

interface inputAttributeProps {
  attribute: string;
  value: string;
}

export function inputTest(Component: JSX.Element, attributes: inputAttributeProps[]) {
  const { container } = render(Component);
  attributes.forEach((value) => {
    expect(container.querySelector('input')?.getAttribute(value.attribute)).toBe(value.value);
  });
}
