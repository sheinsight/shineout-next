/**
 * cn - Hooks
 *    -- 在Form组件外使用`Form.useForm`时，需要将`setForm`方法传给Form组件，在Form组件内的子组件内使用时无需传递
 * en - Hooks
 *    -- When using `Form.useForm` outside the Form component, you need to pass the `setForm` method to the Form component. When using it in a child component of the Form component, you don't need to pass it
 */

import React, { useState } from 'react';
import { Form, Input, Checkbox, Rule, Button, TYPE, Grid, Alert } from 'shineout';

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

const Sub: React.FC = () => {
  const form = Form.useFormInstance();

  const validateForm = () => {
    console.log('form in child: >>', form)
    form.validateFields(['password', 'age']);
  }

  return (
    <Button type="warning" onClick={validateForm}>use hook in children</Button>
  );
}

const FormComp: React.FC = () => {
  const [value, setValue] = useState<FormValue>(undefined);

  const [form, setForm] = Form.useForm<FormValue>();

  const validateForm = () => {
    console.log('form in parent: >>', form)
    form.validateFields(['email', 'name']);
  }

  return (
    <Form
      setForm={setForm}
      value={value}
      onChange={setValue}
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
            marginTop: 4,
          }}
          rules={[rules.required('At least select one favorite color'), rules.min(2), rules.max(3)]}
        />
      </Form.Item>

      <Form.Item label=''>
        <div>
          <Sub></Sub>
          <Button onClick={validateForm} type="danger">use hook in parent</Button>
        </div>
        <div style={{marginTop: 12}}>
          <Form.Button>Sumbit</Form.Button>
          <Form.Reset>Reset</Form.Reset>
        </div>
      </Form.Item>
    </Form>
  );
};

const App = () => (
  <Grid gutter={36} style={{padding: 36}}>
    <Grid>
      <Alert type="info" style={{ marginBottom: 12 }}>
        表单1
      </Alert>
      <FormComp />
    </Grid>
    <Grid>
      <Alert type="info" style={{ marginBottom: 12 }}>
        表单2
      </Alert>
      <FormComp />
    </Grid>
  </Grid>
)

export default App;
