import { render, cleanup, screen, fireEvent } from '@testing-library/react';
import Checkbox from '..';
import { Form } from 'shineout';
import mountTest from '../../tests/mountTest';
import CheckboxRawgroup from '../__example__/004-rawgroup';
import CheckboxGroup from '../__example__/005-group';
import CheckboxBlock from '../__example__/006-block';
import CheckboxDisabled from '../__example__/007-disabled-1';
import CheckboxDisabledByFunc from '../__example__/007-disabled-2';
import React, { useState } from 'react';

const SO_PREFIX = 'checkbox';
const dataRender = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet'];
afterEach(cleanup);
describe('CheckboxGroup[Base]', () => {
  mountTest(Checkbox.Group);
  test('should render correctly by CheckboxRawgroup', () => {
    const { container } = render(<CheckboxRawgroup />);
    expect(container.firstChild).toMatchSnapshot();
  });
  test('should render structor in CheckboxRawgroup', () => {
    const data = [
      { id: 1, color: 'red' },
      { id: 2, color: 'cyan' },
      { id: 3, color: 'blue' },
      { id: 4, color: 'green' },
      { id: 5, color: 'yellow' },
      { id: 6, color: 'orange' },
      { id: 7, color: 'violet' },
    ];
    const { container } = render(<CheckboxRawgroup />);
    const checkboxs = container.querySelectorAll(`.${SO_PREFIX}-wrapper-0-2-1`);
    expect(checkboxs.length).toBe(data.length);
    checkboxs.forEach((checkbox, index) => {
      expect(checkbox.textContent).toBe(data[index].color);
      if (![3, 5].includes(index + 1)) return;
      expect(checkbox.classList.contains(`${SO_PREFIX}-wrapperChecked-0-2-3`)).toBeTruthy();
    });
    fireEvent.click(checkboxs[0]);
    expect(checkboxs[0].classList.contains(`${SO_PREFIX}-wrapperChecked-0-2-3`)).toBeTruthy();
    fireEvent.click(checkboxs[2]);
    expect(checkboxs[2].classList.contains(`${SO_PREFIX}-wrapperChecked-0-2-3`)).toBeFalsy();
    screen.debug();
  });
  test('should render correctly by CheckboxGroup', () => {
    const { container } = render(<CheckboxGroup />);
    expect(container.firstChild).toMatchSnapshot();
  });
  test('should render structor in CheckboxGroup', () => {
    const { container } = render(<CheckboxGroup />);
    const checkboxs = container.querySelectorAll(`.${SO_PREFIX}-wrapper-0-2-1`);
    expect(checkboxs.length).toBe(dataRender.length);
    checkboxs.forEach((checkbox, index) => {
      expect(screen.getByText(dataRender[index]).getAttribute('style')).toBe(
        `border-bottom: 1px solid ${dataRender[index]};`,
      );
      if (!['blue', 'cyan'].includes(dataRender[index])) return;
      expect(checkbox.classList.contains(`${SO_PREFIX}-wrapperChecked-0-2-3`)).toBeTruthy();
    });
  });
  test('should render correctly by CheckboxBlock', () => {
    const { container } = render(<CheckboxBlock />);
    expect(container.firstChild).toMatchSnapshot();
  });
  test('should render when set block', () => {
    const { container } = render(
      <Checkbox.Group
        keygen={(c: any) => c}
        data={dataRender}
        defaultValue={['blue', 'cyan']}
        block
        style={{ marginTop: 32, display: 'inline-block' }}
      />,
    );
    expect(
      container
        .querySelector(`.${SO_PREFIX}-group-0-2-9`)
        ?.classList.contains(`${SO_PREFIX}-groupBlock-0-2-10`),
    ).toBeTruthy();
  });
  test('should render when set className and style', () => {
    const { container } = render(
      <Checkbox.Group
        data={dataRender}
        className='demo'
        style={{ marginTop: 32, display: 'inline-block' }}
      />,
    );
    const checkboxGroup = container.querySelector(`.${SO_PREFIX}-group-0-2-9`);
    expect(checkboxGroup?.classList.contains('demo')).toBeTruthy();
    expect(checkboxGroup?.getAttribute('style')).toBe('margin-top: 32px; display: inline-block;');
  });
});
describe('CheckboxGroup[Disabled]', () => {
  test('should render correctly by disabled-A', () => {
    const { container } = render(<CheckboxDisabled />);
    expect(container.firstChild).toMatchSnapshot();
  });
  test('should render correctly by disabled-B', () => {
    const { container } = render(<CheckboxDisabledByFunc />);
    expect(container.firstChild).toMatchSnapshot();
  });
  test('should render when set disabled', () => {
    const { container } = render(<CheckboxDisabled />);
    container.querySelectorAll(`.${SO_PREFIX}-wrapper-0-2-1`).forEach((checkbox) => {
      expect(checkbox.classList.contains(`${SO_PREFIX}-wrapperDisabled-0-2-5`)).toBeTruthy();
    });
  });
  test('should render when set disabled by function', () => {
    const { container } = render(<CheckboxDisabledByFunc />);
    screen.debug();
    container.querySelectorAll(`.${SO_PREFIX}-wrapper-0-2-1`).forEach((checkbox) => {
      if (checkbox.textContent !== 'yellow') return;
      expect(checkbox.classList.contains(`${SO_PREFIX}-wrapperDisabled-0-2-5`)).toBeTruthy();
      fireEvent.click(checkbox);
      expect(checkbox.classList.contains(`${SO_PREFIX}-wrapperChecked-0-2-3`)).toBeFalsy();
    });
  });
  test('should render when set disabled in form and checkboxGroup', () => {
    const changeFn = jest.fn();
    const { container } = render(
      <Form disabled={true}>
        <Checkbox.Group data={dataRender} disabled={false} onChange={changeFn} />
      </Form>,
    );
    fireEvent.click(container.querySelectorAll(`.${SO_PREFIX}-wrapper-0-2-1`)[0]);
    expect(changeFn.mock.calls.length).toBe(0);
  });
});
describe('Checkbox[Format]', () => {
  // TODO: 未完
  test('should render when set format', () => {
    const RenderDemo = () => {
      const [selected, setSelected] = useState(['red']);
      return (
        <>
          <Checkbox.Group
            data={dataRender}
            value={selected}
            onChange={setSelected}
            formate={(e: any) => e + '!'}
          />
          <div className='render'>{selected}</div>
        </>
      );
    };
    const { container } = render(<RenderDemo />);
    fireEvent.click(container.querySelectorAll(`.${SO_PREFIX}-wrapper-0-2-1`)[2]);
    screen.debug();
  });
});
