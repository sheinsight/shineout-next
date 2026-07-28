import React from 'react';
import { render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import BorderBeam from '..';
import { BorderBeam as RootBorderBeam, TYPE } from '../../index';
import { displayTest } from '../../tests/utils';

displayTest(BorderBeam, 'ShineoutBorderBeam');

test('exports the styled component and TYPE namespace', async () => {
  const props: TYPE.BorderBeam.Props = {
    duration: 3,
    lineWidth: 2,
    className: 'custom-public-beam',
  };
  const { container } = render(
    <BorderBeam {...props}>
      <div className='public-host' style={{ position: 'relative' }}>
        public
      </div>
    </BorderBeam>,
  );

  expect(RootBorderBeam).toBe(BorderBeam);
  await waitFor(() => expect(container.querySelector('.soui-border-beam')).toBeTruthy());
  const effect = container.querySelector<HTMLElement>('.soui-border-beam')!;
  expect(effect).toHaveClass('soui-border-beam-beam', 'custom-public-beam');
  expect(getComputedStyle(effect).position).toBe('absolute');
  expect(getComputedStyle(effect).pointerEvents).toBe('none');
});
