/**
 * cn - 性能
 *    -- 5000 个表单加校验
 * en - performance
 *    -- The size of the form element
 */
import React from 'react';
import { Form, Input, Rule } from 'shineout';

const arr = Array(5000).fill(0);

const rule = Rule();

const App: React.FC = () => {
  return (
    <>
      <Form
        onChange={(d) => {
          console.log('change', d);
        }}
        onSubmit={(d) => {
          console.log('submit', d);
        }}
      >
        {arr.map((_, i) => {
          return (
            <Form.Item label={`sku-${i}`} key={i}>
              <Input delay={0} title={`sku-${i}`} name={`name-${i}`} rules={[rule.required]} />
            </Form.Item>
          );
        })}
      </Form>
    </>
  );
};

export default App;
