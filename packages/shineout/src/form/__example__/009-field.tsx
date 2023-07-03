/**
 * cn - 字段
 *    -- 支持 value 和 onChange 的组件可以放在 Form.Field 中。
 *    -- children 为 ReactElement时，必须支持 value 和 onChange 属性
 *    -- children 为 Function 时，返回一个或一组 ReactElement，在函数内部自行处理 value 和 onChange
 * en - Field
 *    -- Components that support value property and onChange property can be put in a Form.Field .
 *    -- When the children property is a ReactElement, the value and onChange property must be provided.
 *    -- When the children property is a function, return one or one group of ReactElement.
 */
import React from 'react';
import { Form } from 'shineout';

function Input(props: any) {
  const { value = '', status, onChange } = props;
  const style = { border: `solid 1px ${status === 'error' ? 'red' : '#ccc'}`, outline: 'none' };
  return (
    <input
      {...props}
      style={style}
      value={value}
      onChange={(e) => {
        onChange(e.target.value);
      }}
    />
  );
}

const App: React.FC = () => (
  <Form style={{ maxWidth: 500 }} onSubmit={(d) => console.log(d)}>
    <Form.Item required label='Email'>
      <Form.Field
        name='email'
        defaultValue='test@email.com'
        rules={[
          (value, _, callback) => {
            if (!value) {
              callback(new Error('email is required'));
            }
            // 校验email 类型
            if (value && !/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(value)) {
              callback(new Error('email is not valid'));
            }
            callback(true);
          },
        ]}
      >
        {({ value, onChange, status }) => (
          <Input value={value || ''} status={status} onChange={onChange} type='text' />
        )}
      </Form.Field>
    </Form.Item>

    <Form.Item label='Password' tip='Use at least one letter, one numeral, and seven characters.'>
      <Form.Field name='password'>
        <Input type='password' />
      </Form.Field>
    </Form.Item>

    <Form.Item label=''>
      <button type='submit'>Submit</button>
    </Form.Item>
  </Form>
);

export default App;
