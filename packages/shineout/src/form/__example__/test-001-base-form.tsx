/**
 * cn - 调试用基础 Form
 *    -- 调试用的，在这个例子基础上随便改吧
 * en - Test Form
 *    -- Test Form
 */
import { useEffect } from 'react';
import { Form, Input } from 'shineout';
import { proxy } from 'valtio';
import { useSnapshot } from 'valtio';

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
    console.log('nextForm', nextForm);
  },
};

const ComponentB = () => {
  useEffect(() => {
    console.log('B mounted');
    dispatch.append({
      'b-1': 1,
      'b-2': 2,
    });
  }, []);

  return (
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

  useEffect(() => {
    // dispatch.append({
    //   'b-1': 1,
    //   'b-2': 2,
    // });
  }, []);

  return (
    <div>
      <Form
        value={state.form}
        onChange={handleChange}
        onReset={handleReset}
        onSubmit={handleSubmit}
      >
        <ComponentA></ComponentA>
        <Form.Item label='C'>
          <Input name='c'></Input>
        </Form.Item>

        <Form.Item label='' style={{ marginTop: 32, marginBottom: 0 }}>
          <Form.Submit>Submit</Form.Submit>
          <Form.Reset>Reset</Form.Reset>
        </Form.Item>
      </Form>
    </div>
  );
};
