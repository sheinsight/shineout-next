/**
 * cn - 校验
 *    -- 组件支持传入 rules 属性来配置校验规则。
 * en - validate
 *    -- The component supports passing the 'rules' attribute to configure validation rules.
 */

import React from 'react';
import { Input, Form } from 'shineout';

const App: React.FC = () => (
  <div>
    <Input
      popover
      rules={[
        (value, formValue, callback) => {
          if (!value) {
            callback(new Error('必填'));
          }
          callback(true);
        },
      ]}
    />
    <Form.Item label={'哈哈哈'}>
      <Input
        rules={[
          (value, formValue, callback) => {
            if (!value) {
              callback(new Error('必填'));
            }
            callback(true);
          },
        ]}
      />
    </Form.Item>
  </div>
);

export default App;
