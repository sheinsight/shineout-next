/**
 * cn - 基础校验
 *    -- 通过 Rule 对象，可以使用内置的规则。规则详见 Rule
 * en - validate
 *    -- Use the built-in rules through the Rule object. See Rule for details
 */

import React, { useState, useCallback } from 'react';
import { Form, Input, Checkbox, Rule, Button, TYPE, DatePicker, Select } from 'shineout';

interface Value {
  age?: string;
  tel?: string;
  name?: string;
  IPv4?: string;
  email?: string;
  password?: string;
  colors?: string[];
}
type FormProps = TYPE.Form.Props<Value>;
type FormValue = FormProps['value'];
type FormRef = TYPE.Form.Ref<any>;
type RuleFunc = TYPE.Rule.ValidFunc;

const password = {
  func: (value: string, _formData: any, _cb: any, props: { message: string; title: string }) =>
    new Promise((resolve, reject) => {
      console.log('password', props);
      if (!/\d+/.test(value) || !/[a-z]+/i.test(value)) {
        reject(new Error(props.message.replace('{title}', props.title)));
      } else {
        resolve(true);
      }
    }),
};

const isExist: RuleFunc = (value, _, callback) => {
  if (value.indexOf('so') >= 0) callback(new Error(`"${value}" is existed.`));
  else callback(true);
};

const rules = Rule(
  // validate function package
  {
    password,
    isExist,
  },
  // language package
  {
    password: {
      message: '{title} at least has one numeral and one letter',
    },
  },
);

const App: React.FC = () => {
  const [ref, setRef] = useState<FormRef>();
  const [value, setValue] = useState<FormValue>(undefined);

  const validFields = useCallback(() => {
    if (ref && ref.validateFields) {
      ref.validateFields(['email', 'name']);
    }
  }, [ref]);

  console.log('form value: >>', value)
  return (
    <Form
      value={value}
      scrollToError={200}
      scrollParent={() => document.getElementById('layout')}
      onChange={setValue}
      formRef={(f) => setRef(f)}
      style={{ maxWidth: 500 }}
      onSubmit={(d) => console.log(d)}
    >
      <Form.Item required label='Email'>
        <Input name='email' title='Email' rules={[rules.required, rules.email]} clearable />
      </Form.Item>

      <Form.Item required label='Name'>
        <Input name='name' title='Name' rules={[rules.required, rules.isExist]} clearable />
      </Form.Item>

      <Form.Item
        required
        label='Password'
        tip='At least one letter, one numeral, and 6 - 20 characters.'
      >
        <Input
          name='password'
          title='Password'
          type='password'
          clearable
          rules={[rules.required, rules.range(6, 20), rules.password]}
        />
      </Form.Item>

      <Form.Item required label='Age' tip='between 18 and 60'>
        <Input
          name='age'
          title='Age'
          style={{ width: 100 }}
          type='integer'
          clearable
          rules={[rules.required, rules.integer, rules.range(18, 60)]}
        />
      </Form.Item>

      <Form.Item required label='Birthday'>
        <DatePicker
          name='birthday'
          range
          rules={[rules.required]}
          clearable
          clearToUndefined
        />
      </Form.Item>

      <Form.Item required label='Hobby'>
        <Select
          keygen
          multiple
          clearable
          name='hobby'
          rules={[rules.required]}
          data={['football', 'basketball', 'tennis', 'swimming', 'running']}
        />
      </Form.Item>

      <Form.Item required label='Tel'>
        <Input
          name='tel'
          title='Tel'
          rules={[rules.required, rules.regExp('^[\\d\\s ().-]+$')]}
          clearable
        />
      </Form.Item>

      <Form.Item required label='IPv4'>
        <Input name='IPv4' title='IP' rules={[rules.required, rules.ipv4]} clearable />
      </Form.Item>

      <Form.Item required label='Favorite Colors' tip='select your favorite colors'>
        <Checkbox.Group
          name='colors'
          keygen={(d) => d}
          data={['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet']}
          defaultValue={[]}
          renderItem={(d) => <div style={{ width: 40 }}>{d}</div>}
          style={{
            display: 'flex',
            gap: 12,
            flexWrap: 'wrap',
            justifyContent: 'space-between',
          }}
          rules={[rules.required('At least select one favorite color'), rules.min(2), rules.max(3)]}
        />
      </Form.Item>

      <Form.Item label='' style={{ marginTop: 32, marginBottom: 0 }}>
        <Form.Button>Sumbit</Form.Button>
        <Form.Reset>Reset</Form.Reset>
        <Button onClick={validFields} mode="outline">Validate Some Field</Button>
      </Form.Item>
    </Form>
  );
};

export default App;
