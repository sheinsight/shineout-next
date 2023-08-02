import { render } from '@testing-library/react';

interface attributeProps {
  attribute: string;
  num: number;
}
export default function structureTest(Component: JSX.Element, attributes: attributeProps[]) {
  test('should render when not set attribute', () => {
    const { container } = render(Component);
    attributes.forEach((value) => {
      expect(container.querySelectorAll(value.attribute).length).toBe(value.num);
    });
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
