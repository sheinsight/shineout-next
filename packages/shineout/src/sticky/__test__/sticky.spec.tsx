import { render, cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Sticky, Alert } from 'shineout';
import React from 'react';
import { displayTest, styleTest } from '../../tests/utils';

afterEach(cleanup);

const StickyTest = (props: any, style: React.CSSProperties) => (
  <div id='sticky_element' style={style}>
    <Sticky {...props}>
      <Alert>
        <h3>Some content.</h3>
        Sticky 20px to top.
      </Alert>
    </Sticky>
  </div>
);

describe('Sticky[Base]', () => {
  displayTest(Sticky, 'ShineoutSticky');
  test('should render default', () => {
    Object.defineProperty(HTMLElement.prototype, 'height', { configurable: true, value: 100 });
    const { container } = render(<StickyTest top={20} />);
    const stickyElement = container.querySelector('#sticky_element');
    expect(stickyElement).toBeInTheDocument();
    const stickyParent = stickyElement?.parentElement;
    const extraSticky = stickyParent?.nextElementSibling;
    styleTest(extraSticky!, 'position: relative;');
  });
  test('should render when set parent style', () => {
    render(
      <div id='sticky_element' style={{ height: 400, overflow: 'auto' }}>
        <div style={{ height: 1600 }}>
          <div style={{ height: 600 }}></div>
          <Sticky top={0} bottom={0} target='#sticky_element'>
            <Alert style={{ marginBottom: 0 }} type='info'>
              Sticky to element
            </Alert>
          </Sticky>
        </div>
      </div>,
    );
    fireEvent.scroll(window, { target: { scrollY: -700 } });
  });
});
describe('Sticky[Css]', () => {
  test('should render when set css', () => {
    const { container } = render(<StickyTest css />);
    const stickyElement = container.querySelector('#sticky_element');
    styleTest(stickyElement?.firstElementChild as Element, 'z-index: 900; position: sticky;');
  });
});
