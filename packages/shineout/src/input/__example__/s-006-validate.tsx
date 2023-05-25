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
