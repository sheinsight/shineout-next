/**
 * cn - 标签冒号
 *    -- 设置 `Form` 的 `colon` 属性，开启所有label的冒号显示。
 *    -- 也可单独设置 `Form.Item` 的 `colon` 属性，优先级高于 `Form` 的 `colon` 属性。
 *    -- `colon` 的格式也可以是自定义的ReactNode。
 * en - Label colon
 *    -- Set the colon property of Form to enable the colon display of all labels.
 *    -- You can also set the colon property of FormItem separately, which has higher priority than the colon property of Form.
 *    -- The format of `colon` can also be a custom ReactNode.
 */

import { useState } from 'react';
import { Form, Input, Switch, Textarea } from 'shineout';

export default () => {
  const [colonVisible, setColonVisible] = useState(true);
  return (
    <Form labelWidth={120} style={{ maxWidth: 500 }} colon={colonVisible}>
      <Form.Item label='Show Colon'>
        <Switch value={colonVisible} onChange={setColonVisible} content={['ON', 'OFF']} />
      </Form.Item>
      <Form.Item label='Your Email'>
        <Input name='email' clearable />
      </Form.Item>
      <Form.Item label='Password'>
        <Input name='password' type='password' clearable />
      </Form.Item>
      <Form.Item label='Your Address'>
        <Textarea name='address' />
      </Form.Item>
    </Form>
  );
};
