import { Checkbox, Form, Input, Rule } from 'shineout-v3';
import { colors } from '../_shared/data';

const rules = Rule();

export default function Demo() {
  return (
    <Form style={{ maxWidth: 500 }} onSubmit={() => {}} throttle={0}>
      <Form.Item required label='Email'>
        <Input name='email' title='Email' rules={[rules.required('email is required'), rules.email]} clearable />
      </Form.Item>
      <Form.Item required label='Name'>
        <Input name='name' title='Name' rules={[rules.required('name is required')]} clearable />
      </Form.Item>
      <Form.Item required label='Password' tip='At least one letter, one numeral, and 6 - 20 characters.'>
        <Input name='password' title='Password' type='password' clearable rules={[rules.required('password is required'), rules.range(6, 20)]} />
      </Form.Item>
      <Form.Item required label='Age' tip='between 18 and 60'>
        <Input name='age' title='Age' style={{ width: 100 }} type='integer' clearable rules={[rules.required('age is required'), rules.integer, rules.range(18, 60)]} />
      </Form.Item>
      <Form.Item required label='Tel'>
        <Input name='tel' title='Tel' rules={[rules.required('tel is required'), rules.regExp('^[\\d\\s ().-]+$')]} clearable />
      </Form.Item>
      <Form.Item required label='IPv4'>
        <Input name='IPv4' title='IP' rules={[rules.required('ip is required'), rules.ipv4]} clearable />
      </Form.Item>
      <Form.Item required label='Favorite Colors' tip='select your favorite colors'>
        <Checkbox.Group
          name='colors'
          keygen={(d) => d}
          data={colors}
          defaultValue={[]}
          rules={[rules.required('colors is required'), rules.min(2), rules.max(3)]}
        />
      </Form.Item>
      <Form.Item label='' style={{ marginTop: 32, marginBottom: 0 }}>
        <span data-bench='submit'><Form.Button>Submit</Form.Button></span>
        <span data-bench='reset'><Form.Reset>Reset</Form.Reset></span>
      </Form.Item>
    </Form>
  );
}
