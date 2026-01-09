/**
 * cn - 校验时机
 *    -- 默认是当字段值变化时触发校验，通过设置 `validateTrigger` 为 `change-blur`，可以在字段失焦时也触发校验
 *    -- 适用于不同的用户体验需求：`change` 提供即时反馈，`change-blur` 提供最全面的校验体验，推荐使用以获得更好的用户体验
 *    -- 可在 `Form.Field` 组件上单独设置覆盖此全局配置
 * en - Validate Trigger
 *    -- By default, validation is triggered when the field value changes. By setting `validateTrigger` to `change-blur`, validation can also be triggered when the field loses focus.
 *    -- Suitable for different user experience requirements: `change` provides immediate feedback, while `change-blur` offers the most comprehensive validation experience and is recommended for better UX.
 *    -- This can be individually set on the `Form.Field` component to override this global configuration.
 */

import React, { useState } from 'react';
import { Form, Input, Checkbox, Rule, TYPE, DatePicker, Select } from 'shineout';

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
  const [value, setValue] = useState<FormValue>(undefined);

  console.log('form value: >>', value);
  return (
    <Form
      value={value}
      onChange={setValue}
      style={{ maxWidth: 500 }}
      onSubmit={(d) => console.log(d)}
      validateTrigger='change-blur'
    >
      <Form.Item required label='Email'>
        <Form.Field
          name='email'
          validateTrigger='change-blur'
          rules={[rules.required, rules.email]}
        >
          <Input title='Email' clearable />
        </Form.Field>
      </Form.Item>

      <Form.Item required label='Name' tip="trigger validate only on 'change'">
        <Form.Field name='name' validateTrigger='change' rules={[rules.required, rules.isExist]}>
          <Input title='Name' clearable />
        </Form.Field>
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
        <DatePicker name='birthday' range rules={[rules.required]} clearable clearToUndefined />
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
      </Form.Item>
    </Form>
  );
};

export default App;
