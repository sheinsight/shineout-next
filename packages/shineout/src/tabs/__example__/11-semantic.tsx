/**
 * cn - Semantic DOM
 *    -- 通过 `classNames` 和 `styles` 两个 prop 精准定制内部 DOM 节点（root / header / tab / panel / extra / ink / prev / next / collapsible / inner）。
 *    -- 可用 key 列表见组件 Semantic DOM 章节。
 * en - Semantic DOM
 *    -- Use `classNames` and `styles` props to customize internal DOM nodes (root / header / tab / panel / extra / ink / prev / next / collapsible / inner).
 *    -- See the Semantic DOM section for the full key list.
 */
import React from 'react';
import { Tabs } from 'shineout';

export default () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* line shape with ink + extra */}
      <Tabs
        defaultActive={0}
        shape='line'
        extra='Extra'
        styles={{
          header: { background: '#fafafa' },
          tab: { fontWeight: 500 },
          panel: { padding: 16 },
          extra: { color: '#1890ff' },
          ink: { background: '#1890ff', height: 3 },
        }}
      >
        <Tabs.Panel tab='Tab 1'>Content of Tab 1</Tabs.Panel>
        <Tabs.Panel tab='Tab 2'>Content of Tab 2</Tabs.Panel>
        <Tabs.Panel tab='Tab 3'>Content of Tab 3</Tabs.Panel>
      </Tabs>

      {/* line shape — inner slot demo */}
      <Tabs
        defaultActive={0}
        shape='line'
        styles={{
          inner: { padding: '4px 12px', background: '#f0f5ff', borderRadius: 4 },
        }}
      >
        <Tabs.Panel tab='Line A'>Line shape with inner styling</Tabs.Panel>
        <Tabs.Panel tab='Line B'>Inner slot applies to lineInner wrapper</Tabs.Panel>
      </Tabs>

      {/* fill shape — inner slot demo */}
      <Tabs
        defaultActive={0}
        shape='fill'
        styles={{
          inner: { padding: '6px 16px', background: '#f6ffed', borderRadius: 4 },
        }}
      >
        <Tabs.Panel tab='Fill A'>Fill shape with inner styling</Tabs.Panel>
        <Tabs.Panel tab='Fill B'>Inner slot applies to fillInner wrapper</Tabs.Panel>
      </Tabs>

      {/* scroll + collapsible */}
      <Tabs
        defaultActive={0}
        shape='card'
        collapsible
        styles={{
          prev: { color: '#1890ff' },
          next: { color: '#1890ff' },
          collapsible: { color: '#52c41a' },
        }}
      >
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
};
