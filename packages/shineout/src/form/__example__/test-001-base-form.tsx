/**
 * cn - 调试用基础 Form
 *    -- 调试用的，在这个例子基础上随便改吧
 * en - Test Form
 *    -- Test Form
 */
import { useEffect } from 'react';
import { Form, Input } from 'shineout';
import { proxy, useSnapshot } from 'valtio';

const state = {
  form: {
    a: {
      product_name_attribute_list: [],
    },
  },
};

const proxyState = proxy(state);

const dispatch = {
  setForm: (form: any) => {
    proxyState.form = form;
  },
  append: (item: any) => {
    const nextForm = {
      a: {
        product_name_attribute_list: [...proxyState.form.a.product_name_attribute_list],
      },
    };
    nextForm.a.product_name_attribute_list.push(item);
    proxyState.form = nextForm;
    console.log('append');
  },
};

const ComponentB1 = () => {
  useEffect(() => {
    dispatch.append({
      'b-1': 3,
      'b-2': 4,
    });
    console.log('B1 mounted');
  }, []);

  return (
    <Form.Item label='B1'>
      <Form.FieldSet name='a.product_name_attribute_list'>
        {({}) => {
          return (
            <div>
              <Input name='b-1'></Input>
              <Input name='b-2'></Input>
            </div>
          );
        }}
      </Form.FieldSet>
    </Form.Item>
  );
};

const ComponentB2 = () => {
  useEffect(() => {
    console.log('B2 mounted');
  }, []);

  return (
    <Form.Item label='B2'>
      <Form.FieldSet name='a.spec_info_list' defaultValue={[{ 'b-1': 3, 'b-2': 4 }]}>
        {({}) => {
          return (
            <div>
              <Input name='b-1'></Input>
              <Input name='b-2'></Input>
            </div>
          );
        }}
      </Form.FieldSet>
    </Form.Item>
  );
};

const ComponentB = () => {
  return (
    <div>
      <ComponentB1></ComponentB1>
      <ComponentB2></ComponentB2>
    </div>
  );
};

const ComponentA = () => {
  return (
    <Form.Item label='Component A'>
      <Form.Field name='a'>
        <ComponentB></ComponentB>
      </Form.Field>
    </Form.Item>
  );
};

export default () => {
  const state = useSnapshot(proxyState);

  const handleSubmit = (v) => {
    console.log('submit', v);
  };

  const handleChange = (v) => {
    dispatch.setForm(v);
  };

  const handleReset = () => {};
  return (
    <div>
      <Form
        value={state.form}
        onChange={handleChange}
        onReset={handleReset}
        onSubmit={handleSubmit}
      >
        <ComponentA></ComponentA>

        <Form.Item label='' style={{ marginTop: 32, marginBottom: 0 }}>
          <Form.Submit>Submit</Form.Submit>
          <Form.Reset>Reset</Form.Reset>
        </Form.Item>
      </Form>
    </div>
  );
};
