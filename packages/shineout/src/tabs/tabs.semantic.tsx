/**
 * Tabs Semantic DOM 元数据。
 *
 * 文档站构建时通过 chunk 模板自动引入，渲染 Semantic tab。
 *
 * @see /docs/rfc/0001-semantic-dom.md
 */
import React from 'react';
import type { SemanticSchema } from '@sheinx/base';
import type { TabsSemanticKey } from '@sheinx/base';
import { Tabs } from 'shineout';

const TabsSemanticDemo: React.FC = () => (
  <div style={{ width: 400 }}>
  <Tabs defaultActive={0} shape='line' extra='Extra' collapsible>
    <Tabs.Panel tab='Tab 1'>Content 1</Tabs.Panel>
    <Tabs.Panel tab='Tab 2'>Content 2</Tabs.Panel>
    <Tabs.Panel tab='Tab 3'>Content 3</Tabs.Panel>
    <Tabs.Panel tab='Tab 4'>Content 4</Tabs.Panel>
    <Tabs.Panel tab='Tab 5'>Content 5</Tabs.Panel>
    <Tabs.Panel tab='Tab 6'>Content 6</Tabs.Panel>
    <Tabs.Panel tab='Tab 7'>Content 7</Tabs.Panel>
    <Tabs.Panel tab='Tab 8'>Content 8</Tabs.Panel>
    <Tabs.Panel tab='Tab 9'>Content 9</Tabs.Panel>
    <Tabs.Panel tab='Tab 10'>Content 10</Tabs.Panel>
  </Tabs>
  </div>
);

const tabsSemantic: SemanticSchema<TabsSemanticKey> = {
  keys: [
    {
      key: 'root',
      cn: 'Tabs 最外层容器',
      en: 'Tabs outermost wrapper element',
      version: '3.10.0',
      example: `<Tabs
  classNames={{ root: 'my-tabs' }}
  styles={{ root: { borderRadius: 8 } }}
/>`,
    },
    {
      key: 'header',
      cn: '标签栏区域',
      en: 'Tab bar header area',
      version: '3.10.0',
      example: `<Tabs
  classNames={{ header: 'my-header' }}
  styles={{ header: { padding: '0 16px' } }}
/>`,
    },
    {
      key: 'tab',
      cn: '每个标签项',
      en: 'Each tab item',
      version: '3.10.0',
      example: `<Tabs
  classNames={{ tab: 'my-tab' }}
  styles={{ tab: { fontWeight: 500 } }}
/>`,
    },
    {
      key: 'panel',
      cn: '内容面板区域',
      en: 'Content panel area',
      version: '3.10.0',
      example: `<Tabs
  classNames={{ panel: 'my-panel' }}
  styles={{ panel: { padding: 16 } }}
/>`,
    },
    {
      key: 'extra',
      cn: '额外内容区',
      en: 'Extra content area',
      version: '3.10.0',
      example: `<Tabs
  classNames={{ extra: 'my-extra' }}
  styles={{ extra: { color: '#999' } }}
/>`,
    },
    {
      key: 'ink',
      cn: '指示条（line/dash 形态）',
      en: 'Ink bar indicator (line/dash shape)',
      version: '3.10.0',
      example: `<Tabs
  classNames={{ ink: 'my-ink' }}
  styles={{ ink: { background: '#1890ff' } }}
/>`,
    },
    {
      key: 'prev',
      cn: '前滚动按钮',
      en: 'Previous scroll button',
      version: '3.10.0',
      example: `<Tabs
  classNames={{ prev: 'my-prev' }}
  styles={{ prev: { color: '#1890ff' } }}
/>`,
    },
    {
      key: 'next',
      cn: '后滚动按钮',
      en: 'Next scroll button',
      version: '3.10.0',
      example: `<Tabs
  classNames={{ next: 'my-next' }}
  styles={{ next: { color: '#1890ff' } }}
/>`,
    },
    {
      key: 'collapsible',
      cn: '折叠按钮',
      en: 'Collapsible button',
      version: '3.10.0',
      example: `<Tabs
  classNames={{ collapsible: 'my-collapsible' }}
  styles={{ collapsible: { color: '#52c41a' } }}
/>`,
    },
  ],
  demo: TabsSemanticDemo,
};

export default tabsSemantic;
