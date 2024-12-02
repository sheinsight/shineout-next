/**
 * cn - 调试用基础 Form
 *    -- 调试用的，在这个例子基础上随便改吧
 * en - Test Form
 *    -- Test Form
 */
import { useEffect, useState } from 'react';
import { Form, Input } from 'shineout';

export default () => {
  const [value, setValue] = useState({
    a: {
      b1: [],
    },
  });

  const handleSubmit = (v) => {
    console.log('submit', v);
  };

  const handleChange = (v) => {
    console.log('onChange');
    setValue(v);
  };

  const handleReset = () => {};

  return (
    <div>
      <Form value={value} onChange={handleChange} onReset={handleReset} onSubmit={handleSubmit}>
        <Form.Item label='' style={{ marginTop: 32, marginBottom: 0 }}>
          <Form.Submit>Submit</Form.Submit>
          <Form.Reset>Reset</Form.Reset>
        </Form.Item>
      </Form>
    </div>
  );
};
