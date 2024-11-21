/**
 * cn - 基本用法
 *    -- 表单内置了类似双向绑定的机制，根据表单元素的 name 属性自动下发、收集数据
 * en - Basic usage
 *    -- The form has built-in two-way binding mechanism, which automatically issues and collects data based on the name attribute of the form element
 */

import { useState } from 'react';
import { Form, Input, Table, Button, Rule } from 'shineout';

export default () => {
  const [form, setForm] = useState({
    rules: [],
  });

  const rules = Rule({
    isSame: (value, form, callback, props) => {
      const { code } = value;
      const sameIndex = form.rules.findIndex((item) => {
        return item.code === code;
      });
      console.log('sameIndex', sameIndex);
      callback(true);
    },
  });

  const columns = [
    {
      title: 'code',
      render: (d, i) => {
        return (
          <Form.FieldSet name={`rules[${i}]`} rules={[rules.isSame]}>
            <Input name='code'></Input>
          </Form.FieldSet>
        );
      },
    },
    {
      title: 'hash',
      render: (d, i) => {
        return (
          <Form.FieldSet name={`rules[${i}]`}>
            <Input name='hash'></Input>
          </Form.FieldSet>
        );
      },
    },
  ];

  const handleAppend = () => {
    const nextItem = {
      code: '',
      hash: '',
    };

    const nextForm = {
      rules: [...form.rules, nextItem],
    };
    setForm(nextForm);
  };
  return (
    <div>
      <Button onClick={handleAppend}> add </Button>
      <Form
        value={form}
        onSubmit={(v) => {
          console.log('form submit', v);
        }}
        onChange={setForm}
        onReset={() => {
          console.log('form reset');
        }}
      >
        <Form.Item label='Address'>
          <Table data={form.rules} keygen={(d, i) => i} columns={columns}></Table>
        </Form.Item>

        <Form.Item label='' style={{ marginTop: 32, marginBottom: 0 }}>
          <Form.Submit>Submit</Form.Submit>
          <Form.Reset>Reset</Form.Reset>
        </Form.Item>
      </Form>
    </div>
  );
};
