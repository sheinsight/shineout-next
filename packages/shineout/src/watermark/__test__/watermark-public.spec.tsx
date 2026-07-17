import React from 'react';
import { cleanup, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Watermark from '..';
import mountTest from '../../tests/mountTest';
import { classTest, displayTest, styleTest } from '../../tests/utils';

afterEach(cleanup);
mountTest(<Watermark />);

describe('Watermark public component', () => {
  displayTest(Watermark, 'ShineoutWatermark');

  test('injects its style hook and forwards className, style, and children', () => {
    const { container } = render(
      <Watermark className='custom-watermark' style={{ height: 120 }}>
        <span>Protected report</span>
      </Watermark>,
    );
    const root = container.firstElementChild as HTMLElement;

    classTest(root, 'soui-watermark');
    classTest(root, 'custom-watermark');
    styleTest(root, 'height: 120px;');
    expect(root).toHaveTextContent('Protected report');
    expect(getComputedStyle(root).position).toBe('relative');
    expect(getComputedStyle(root).overflow).toBe('hidden');
  });
});
