/**
 * cn - Group的校验
 *    -- 配置 `status` 属性可以展示错误状态
 * en - Front and rear tags
 *    -- Use the built-in group component to add tags before and after
 */

import React from 'react';
import { Input, Form, Rule } from 'shineout';

const rules = Rule();

const style: React.CSSProperties = { width: 300 };

const App: React.FC = () => (
  <Form>
    <Form.Item label='URL' inline>
      <Form.Field name='email' rules={[rules.required, rules.url('url is invalid')]}>
        {({ value, error, onChange }) => (
          <Input.Group style={style} status={error ? 'error' : undefined}>
            <b>http://</b>
            <Input value={value} onChange={onChange} placeholder='please enter url' />
          </Input.Group>
        )}
      </Form.Field>
    </Form.Item>
  </Form>
);

export default App;
