import React from 'react';
import { cleanup, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Table from '..';
import {
  baseTest,
  childrenTest,
  createClassName,
  displayTest,
  snapshotTest,
} from '../../tests/utils';
import mountTest from '../../tests/mountTest';
import TableBase from '../__example__/01-base';
import TableBorder from '../__example__/02-border';
import TableSize from '../__example__/03-size';

const SO_PREFIX = 'table';
const originClasses = ['wrapper'];
const originItemClasses = [''];
const { wrapper } = createClassName(SO_PREFIX, originClasses, originItemClasses);

afterEach(cleanup);
mountTest(<Table keygen={'id'} />);

describe('Table[Base]', () => {
  displayTest(Table as React.FC, 'ShineoutTable');
  baseTest(Table as React.FC, wrapper);
  childrenTest(Table as React.FC, wrapper);
  snapshotTest(<TableBase />);
  snapshotTest(<TableBorder />, 'about border');
  snapshotTest(<TableSize />, 'about size');
  test('should render when set children is div', () => {
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    const testContent = 'Test Children';
    const children = <div className='test'>{testContent}</div>;
    const { container } = render(<Table keygen={'id'}>{children}</Table>);
    const component = container.querySelector(wrapper);
    expect(component).toBeTruthy();
    expect(component?.querySelectorAll('.test').length).toBe(1);
    expect(component?.querySelector('.test')?.textContent).toBe(testContent);
    expect(
      JSON.stringify(errorSpy.mock.calls).indexOf('Warning: validateDOMNesting(...):'),
    ).toBeTruthy();
  });
  test('should render when set children is td', () => {
    const errorSpyTr = jest.spyOn(console, 'error').mockImplementation(() => {});
    const testTrContent = (
      <tbody>
        <tr>
          <td>test</td>
        </tr>
      </tbody>
    );
    render(<Table keygen={'id'}>{testTrContent}</Table>);
    expect(errorSpyTr).not.toHaveBeenCalledWith();
  });
  test('should render default', () => {
    render(<TableBase />);
  });
});
