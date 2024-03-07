/**
 * cn - 服务端校验
 *    -- 通过给 Form 设置 `error`，实现后端校验数据展示
 *    -- 在表单值被改变后，对应后端校验数据会被清空
 *    -- 前端校验优先级大于后端校验
 * en - Back-end validation
 *    -- By setting an `error` on the Form, the back-end validation data is presented. After the form value is changed, the corresponding back-end validation data is cleared
 *    -- front-end validation priority is greater than back-end validation
 */
import React, { useState } from 'react';
import { Form, Input, Rule } from 'shineout';

const rules = Rule();

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<{ [key: string]: string }>({});

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setError({ email: 'The email has been registered' });
    }, 1000);
  };

  return (
    <Form disabled={loading} error={error} style={{ maxWidth: 500 }} onSubmit={handleSubmit}>
      <Form.Item required label='Email'>
        <Input name='email' title='Email' rules={[rules.required, rules.email]} clearable />
      </Form.Item>

      <Form.Item required label='Name'>
        <Input name='name' title='Name' rules={[rules.required]} clearable />
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
          rules={[rules.required, rules.range(6, 20)]}
        />
      </Form.Item>

      <Form.Item label='' style={{ marginTop: 32, marginBottom: 0 }}>
        <Form.Button loading={loading}>Sumbit</Form.Button>
        <Form.Reset>Reset</Form.Reset>
      </Form.Item>
    </Form>
  );
};

export default App;
