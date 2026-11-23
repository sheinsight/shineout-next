import React from 'react';
import { render, fireEvent, waitFor, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import InputNumber from '..';
import { Form } from 'shineout';
import InputNumberBase from '../__example__/01-base';

afterEach(cleanup);

describe('InputNumber[base]', () => {
  test('should render example', () => {
    const { container } = render(<InputNumberBase />);
    expect(container.querySelector('input')?.value).toBe('8');
  });
});

describe('InputNumber[allowNull]', () => {
  test('should keep empty on blur and not refill min by default', async () => {
    const onChange = jest.fn();
    const { container } = render(<InputNumber min={5} max={10} onChange={onChange} />);
    const input = container.querySelector('input') as HTMLInputElement;
    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: '8' } });
    fireEvent.change(input, { target: { value: '' } });
    fireEvent.blur(input);
    await waitFor(() => expect(input.value).toBe(''));
    expect(onChange).toHaveBeenLastCalledWith(null);
  });

  test('should refill min on blur when allowNull is false', async () => {
    const { container } = render(<InputNumber allowNull={false} min={5} max={10} value={8} onChange={() => {}} />);
    const input = container.querySelector('input') as HTMLInputElement;
    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: '' } });
    fireEvent.blur(input);
    await waitFor(() => expect(input.value).toBe('5'));
  });

  test('should clamp out of range value on blur', async () => {
    const { container } = render(<InputNumber min={5} max={10} />);
    const input = container.querySelector('input') as HTMLInputElement;
    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: '15' } });
    fireEvent.blur(input);
    await waitFor(() => expect(input.value).toBe('10'));
    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: '1' } });
    fireEvent.blur(input);
    await waitFor(() => expect(input.value).toBe('5'));
  });
});

describe('InputNumber[Form]', () => {
  test('should fail required rule when cleared', async () => {
    const onError = jest.fn();
    const { container } = render(
      <Form value={{ n: 8 }}>
        <InputNumber name='n' min={5} max={10} rules={[{ required: true, message: 'required' }]} onError={onError} />
      </Form>,
    );
    const input = container.querySelector('input') as HTMLInputElement;
    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: '' } });
    fireEvent.blur(input);
    await waitFor(() => expect(onError).toHaveBeenCalled());
    const errors = onError.mock.calls.map((c) => c[0]).filter(Boolean);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[errors.length - 1].message).toBe('required');
    expect(input.value).toBe('');
  });
});
