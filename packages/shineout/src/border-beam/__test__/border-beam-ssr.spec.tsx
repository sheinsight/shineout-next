/** @jest-environment node */

import React from 'react';
import { renderToString } from 'react-dom/server';
import BorderBeam from '../../../../base/src/border-beam';

test('renders only the original child on the server', () => {
  const html = renderToString(
    <BorderBeam>
      <div className='server-host'>server content</div>
    </BorderBeam>,
  );
  expect(html).toContain('server-host');
  expect(html).toContain('server content');
  expect(html).not.toContain('soui-border-beam');
});
