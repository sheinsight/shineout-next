import { act, render } from '@testing-library/react';

const renderImage: any = (Component: JSX.Element) => {
  const img: { onload?: () => void; onerror?: () => void } = {};
  window.Image = jest.fn().mockImplementation(() => img);
  const swapper = render(Component);
  act(() => {
    img.onload?.();
  });
  return swapper;
};

export const imageSnapshotTest = (component: JSX.Element, testName: string = '') => {
  test(`should render correctly ${testName}`, () => {
    const { container } = renderImage(component);
    expect(container.firstChild).toMatchSnapshot();
  });
};

export default renderImage;
