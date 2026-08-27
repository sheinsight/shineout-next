/**
 * cn - Semantic DOM
 *    -- 通过 `classNames` 和 `styles` 两个 prop 精准定制内部 DOM 节点。
 *    -- Form 支持 key: `root` / `item` / `label` / `control` / `error` / `tip`（统一设置所有 Form.Item）。
 *    -- Form.Item 也支持独立的 `classNames` / `styles`（key: `item` / `label` / `control` / `error` / `tip`），优先级高于 Form 传递的。
 * en - Semantic DOM
 *    -- Use `classNames` and `styles` props to customize internal DOM nodes.
 *    -- Form supports keys: `root` / `item` / `label` / `control` / `error` / `tip` (applies to all Form.Items).
 *    -- Form.Item also supports its own `classNames` / `styles` (keys: `item` / `label` / `control` / `error` / `tip`), which take priority over Form-level settings.
 */
import React from 'react';
import { Form, Input } from 'shineout';

export default () => {
  return (
    <Form
      styles={{
        root: { border: '2px solid #1890ff', borderRadius: 8, padding: 24 },
        label: { fontWeight: 600, color: '#1890ff' },
        tip: { color: '#999', fontSize: 12 },
      }}
    >
      <Form.Item label='Name' tip='Please enter your real name' required>
        <Input placeholder='Enter your name' />
      </Form.Item>
      <Form.Item
        label='Email'
        tip='We will not share your email'
        styles={{
          label: { color: '#52c41a' },
        }}
      >
        <Input placeholder='Enter your email' />
      </Form.Item>
    </Form>
  );
};
