import React, { useState } from 'react';
import { render, fireEvent, cleanup, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Form, Input } from 'shineout';

afterEach(cleanup);

const createValue = () => ({
  name: 'a',
  user: { first: 'f', address: { city: 'c' } },
  list: [{ id: 1 }, { id: 2 }],
});

const getInputs = (container: HTMLElement) =>
  container.querySelectorAll('input') as NodeListOf<HTMLInputElement>;

const Fields = () => (
  <>
    <Input name='name' />
    <Input name='user.first' />
    <Input name='user.address.city' />
  </>
);

describe('Form[deepClone]', () => {
  test('默认 deepClone=true：onChange 返回的值与外部 value 不共享嵌套引用', () => {
    const origin = createValue();
    const onChange = jest.fn();
    const { container } = render(
      <Form value={origin} onChange={onChange}>
        <Fields />
      </Form>,
    );
    fireEvent.change(getInputs(container)[0], { target: { value: 'b' } });
    const next = onChange.mock.calls[0][0];
    expect(next.name).toBe('b');
    expect(next.user).toEqual(origin.user);
    expect(next.user).not.toBe(origin.user);
    expect(next.list).not.toBe(origin.list);
  });

  test('deepClone=false：结构共享，未修改的嵌套对象复用外部引用，且不修改外部 value', () => {
    const origin = createValue();
    const snapshot = JSON.parse(JSON.stringify(origin));
    const onChange = jest.fn();
    const { container } = render(
      <Form deepClone={false} value={origin} onChange={onChange}>
        <Fields />
      </Form>,
    );
    fireEvent.change(getInputs(container)[1], { target: { value: 'g' } });
    const next = onChange.mock.calls[0][0];
    expect(next).not.toBe(origin);
    expect(next.user.first).toBe('g');
    expect(next.user).not.toBe(origin.user);
    // 未修改的路径复用原引用
    expect(next.user.address).toBe(origin.user.address);
    expect(next.list).toBe(origin.list);
    // 外部 value 未被修改
    expect(origin).toEqual(snapshot);
  });

  test('deepClone=false：受控模式下不可变更新联动生效', () => {
    const App = () => {
      const [value, setValue] = useState<any>(createValue);
      return (
        <Form
          deepClone={false}
          value={value}
          onChange={(v: any) =>
            setValue({ ...v, user: { ...v.user, address: { ...v.user.address, city: v.name } } })
          }
        >
          <Fields />
        </Form>
      );
    };
    const { container } = render(<App />);
    const inputs = getInputs(container);
    fireEvent.change(inputs[0], { target: { value: 'linked' } });
    expect(inputs[0].value).toBe('linked');
    expect(inputs[2].value).toBe('linked');
  });

  test('deepClone=false：外部整体替换 value 后字段同步更新', () => {
    let setOuter: (v: any) => void = () => {};
    const App = () => {
      const [value, setValue] = useState<any>(createValue);
      setOuter = setValue;
      return (
        <Form deepClone={false} value={value} onChange={setValue}>
          <Fields />
        </Form>
      );
    };
    const { container } = render(<App />);
    const inputs = getInputs(container);
    act(() => {
      setOuter({ name: 'n2', user: { first: 'f2', address: { city: 'c2' } } });
    });
    expect(inputs[0].value).toBe('n2');
    expect(inputs[1].value).toBe('f2');
    expect(inputs[2].value).toBe('c2');
  });

  test('deepClone=false：外部直接修改嵌套字段后浅拷贝顶层 setValue，Input 同步渲染', () => {
    let outer: any;
    let setOuter: (v: any) => void = () => {};
    const App = () => {
      const [value, setValue] = useState<any>(createValue);
      outer = value;
      setOuter = setValue;
      return (
        <Form deepClone={false} value={value} onChange={setValue}>
          <Fields />
        </Form>
      );
    };
    const { container } = render(<App />);
    const inputs = getInputs(container);
    act(() => {
      outer.user.address.city = 'mutated';
      setOuter({ ...outer });
    });
    expect(inputs[2].value).toBe('mutated');
    // 后续修改其他字段，修改过的值不丢失
    fireEvent.change(inputs[0], { target: { value: 'b' } });
    expect(outer.user.address.city).toBe('mutated');
    expect(inputs[2].value).toBe('mutated');
  });

  test('deepClone=false：非受控模式下不修改 defaultValue，getValue 拿到最新值', () => {
    const origin = createValue();
    const snapshot = JSON.parse(JSON.stringify(origin));
    let form: any;
    const { container } = render(
      <Form deepClone={false} defaultValue={origin} formRef={(f: any) => (form = f)}>
        <Fields />
      </Form>,
    );
    fireEvent.change(getInputs(container)[2], { target: { value: 'c3' } });
    expect(origin).toEqual(snapshot);
    expect(form.getValue().user.address.city).toBe('c3');
    expect(form.getValue().list).toBe(origin.list);
  });

  test('deepClone=false：FieldSet 增删、Flow datum.set、formRef.set 均不修改外部 value', () => {
    const origin = createValue();
    const snapshot = JSON.parse(JSON.stringify(origin));
    const onChange = jest.fn();
    let form: any;
    let datum: any;
    const ops: any = {};
    render(
      <Form deepClone={false} value={origin} onChange={onChange} formRef={(f: any) => (form = f)}>
        <Form.FieldSet name='list'>
          {({ index, onRemove, onAppend, onChange: onItemChange }: any) => {
            if (index === 0) Object.assign(ops, { onRemove, onAppend, onItemChange });
            return <Input name='id' />;
          }}
        </Form.FieldSet>
        <Form.Flow>
          {(d: any) => {
            datum = d;
            return null;
          }}
        </Form.Flow>
      </Form>,
    );
    act(() => ops.onAppend({ id: 3 }));
    act(() => ops.onItemChange({ id: 9 }));
    act(() => ops.onRemove());
    act(() => datum.set('user.address.city', 'x'));
    act(() => form.set({ 'user.first': 'y' }));
    expect(origin).toEqual(snapshot);
    expect(onChange.mock.calls.length).toBe(5);
  });
});
