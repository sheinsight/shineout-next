/**
 * cn - 性能
 *    -- 5000 个表单加校验
 * en - performance
 *    -- The size of the form element
 */
import React, { useState } from 'react';
import { Form, Input } from 'shineout';
import { Rule } from '@sheinx/hooks';
const rules = Rule();
const arr = Array(5000).fill(0);

const App: React.FC = () => {
  const [value, setValue] = useState<any>({});
  return (
    <>
      <button
        type='button'
        onClick={() => {
          setValue({ 'name-1': '123' });
        }}
      >
        123
      </button>
      <Form
        value={value}
        onChange={(d) => {
          console.log('change', d);
          setValue(d);
        }}
        onSubmit={(d) => {
          console.log('submit', d);
        }}
      >
        {arr.map((_, i) => {
          return (
            <Form.Item label={`sku-${i}`} key={i}>
              <Input delay={300} title={`sku-${i}`} name={`name-${i}`} rules={[rules.required]} />
            </Form.Item>
          );
        })}
      </Form>
    </>
  );
};

export default App;
