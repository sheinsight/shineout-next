/** @jest-environment node */

import React from 'react';
import { renderToString } from 'react-dom/server';
import { Watermark } from '../../../../base/src/watermark';

test('renders children on the server without accessing browser APIs', () => {
  const html = renderToString(
    <Watermark content='SERVER' className='server-watermark'>
      <span>report</span>
    </Watermark>,
  );

  expect(html).toContain('server-watermark');
  expect(html).toContain('<span>report</span>');
});
