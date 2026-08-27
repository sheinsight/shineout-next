/**
 * Steps Semantic DOM 元数据。
 *
 * 文档站构建时通过 chunk 模板自动引入，渲染 Semantic tab。
 *
 * @see /docs/rfc/0001-semantic-dom.md
 */
import React from 'react';
import type { SemanticSchema } from '@sheinx/base';
import type { StepsSemanticKey } from '@sheinx/base';
import { Steps } from 'shineout';

const StepsSemanticDemo: React.FC = () => (
  <Steps current={1} type="default">
    <Steps.Step title="Completed" description="This is a description" />
    <Steps.Step title="In Progress" description="This is a description" />
    <Steps.Step title="Waiting" description="This is a description" />
  </Steps>
);

const stepsSemantic: SemanticSchema<StepsSemanticKey> = {
  keys: [
    {
      key: 'root',
      cn: 'Steps 最外层容器',
      en: 'Steps outermost wrapper element',
      version: '3.10.0',
      example: `<Steps
  classNames={{ root: 'my-steps' }}
  styles={{ root: { gap: 8 } }}
/>`,
    },
    {
      key: 'step',
      cn: '单个步骤的外层容器',
      en: 'Outermost wrapper of a single step',
      version: '3.10.0',
      example: `<Steps.Step
  classNames={{ step: 'my-step' }}
  styles={{ step: { padding: 8 } }}
/>`,
    },
    {
      key: 'tail',
      cn: '步骤之间的连接线（default / dot 类型）',
      en: 'Connector line between steps (default / dot type)',
      version: '3.10.0',
      example: `<Steps.Step
  classNames={{ tail: 'my-tail' }}
  styles={{ tail: { borderColor: '#1890ff' } }}
/>`,
    },
    {
      key: 'icon',
      cn: '图标/数字区域（default / dot 类型）',
      en: 'Icon or number indicator area (default / dot type)',
      version: '3.10.0',
      example: `<Steps.Step
  classNames={{ icon: 'my-icon' }}
  styles={{ icon: { background: '#1890ff' } }}
/>`,
    },
    {
      key: 'title',
      cn: '标题文字',
      en: 'Title text',
      version: '3.10.0',
      example: `<Steps.Step
  title="Step Title"
  classNames={{ title: 'my-title' }}
  styles={{ title: { fontSize: 16 } }}
/>`,
    },
    {
      key: 'description',
      cn: '描述文字',
      en: 'Description text',
      version: '3.10.0',
      example: `<Steps.Step
  description="Step description"
  classNames={{ description: 'my-desc' }}
  styles={{ description: { color: '#999' } }}
/>`,
    },
    {
      key: 'content',
      cn: '内容容器（包裹 title + description）',
      en: 'Content container wrapping title and description',
      version: '3.10.0',
      example: `<Steps.Step
  classNames={{ content: 'my-content' }}
  styles={{ content: { textAlign: 'left' } }}
/>`,
    },
  ],
  demo: StepsSemanticDemo,
};

export default stepsSemantic;
