import React from 'react';
import { render, fireEvent } from '@testing-library/react';

export type componentProps = React.HTMLAttributes<any> & {
  onClick: () => void;
  disabled: boolean;
  children: React.ReactNode;
};

export default function disabledTest(
  Component: React.FC<componentProps>,
  containerName: string,
  content: string,
) {
  const clickFn = jest.fn();
  const { container } = render(
    <Component onClick={clickFn} disabled>
      Checkbox
    </Component>,
  );
  const temp = container.querySelector(containerName)!;
  fireEvent.click(temp);
  expect(temp.classList.contains(content)).toBeFalsy();
  expect(clickFn.mock.calls.length).toBe(0);
}
