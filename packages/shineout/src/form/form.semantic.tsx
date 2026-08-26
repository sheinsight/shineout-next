/**
 * Form Semantic DOM 元数据。
 *
 * 文档站构建时通过 chunk 模板自动引入，渲染 Semantic tab。
 *
 * @see /docs/rfc/0001-semantic-dom.md
 */
import React from 'react';
import type { SemanticSchema } from '@sheinx/base';
import type { FormSemanticKey } from '@sheinx/base';
import { Form, Input } from 'shineout';

const FormSemanticDemo: React.FC = () => (
  <Form style={{ maxWidth: 400 }}>
    <Form.Item label='Name' tip='Please enter your real name' required>
      <Input name="name" placeholder='Enter your name' rules={[{ required: true, message: 'Name is required' }]} />
    </Form.Item>
    <Form.Item label='Email' tip='Please enter your email' required>
      <Input name="email" placeholder='Enter your email' rules={[{ required: true, message: 'Email is required' }]} />
    </Form.Item>
  </Form>
);

const formSemantic: SemanticSchema<FormSemanticKey> = {
  keys: [
    {
      key: 'root',
      cn: 'Form 最外层容器（<form> 元素）',
      en: 'Form outermost wrapper element (<form>)',
      version: '3.10.0',
      example: `<Form classNames={{ root: 'my-form' }} styles={{ root: { padding: 24 } }} />`,
    },
    {
      key: 'item',
      cn: 'Form.Item 最外层容器',
      en: 'Form.Item outermost wrapper element',
      version: '3.10.0',
      example: `<Form classNames={{ item: 'my-form-item' }} styles={{ item: { marginBottom: 24 } }} />`,
    },
    {
      key: 'label',
      cn: '标签区域',
      en: 'Label area',
      version: '3.10.0',
      example: `<Form classNames={{ label: 'my-label' }} styles={{ label: { fontWeight: 600 } }} />`,
    },
    {
      key: 'control',
      cn: '控件区域（包含表单元素、错误和提示）',
      en: 'Control area (contains form element, error, and tip)',
      version: '3.10.0',
      example: `<Form classNames={{ control: 'my-control' }} styles={{ control: { flex: 1 } }} />`,
    },
    {
      key: 'error',
      cn: '错误提示区域',
      en: 'Error message area',
      version: '3.10.0',
      example: `<Form classNames={{ error: 'my-error' }} styles={{ error: { color: 'red' } }} />`,
    },
    {
      key: 'tip',
      cn: '提示信息区域',
      en: 'Tip message area',
      version: '3.10.0',
      example: `<Form classNames={{ tip: 'my-tip' }} styles={{ tip: { fontSize: 12 } }} />`,
    },
  ],
  demo: FormSemanticDemo,
};

export default formSemantic;
