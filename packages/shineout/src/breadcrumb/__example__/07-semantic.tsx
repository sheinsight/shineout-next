/**
 * cn - Semantic DOM
 *    -- 通过 `classNames` 和 `styles` 两个 prop 精准定制内部 DOM 节点（root / item / separator / content / dropdown / dropdownItem）。
 *    -- 可用 key 列表见组件 Semantic DOM 章节。
 * en - Semantic DOM
 *    -- Use `classNames` and `styles` props to customize internal DOM nodes (root / item / separator / content / dropdown / dropdownItem).
 *    -- See the Semantic DOM section for the full key list.
 */
import React from 'react';
import { Breadcrumb } from 'shineout';

const data = [
  { title: 'Home', url: '#' },
  [
    { title: 'Products', url: '#' },
    { title: 'Services', url: '#' },
    { title: 'Solutions', url: '#' },
  ],
  { title: 'Category', url: '#' },
  { title: 'Detail' },
];

const longData = [
  { title: 'Home', url: '#' },
  { title: 'Products', url: '#' },
  { title: 'Category', url: '#' },
  { title: 'SubCategory', url: '#' },
  { title: 'Detail' },
];

export default () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* classNames + styles */}
      <Breadcrumb
        data={data}
        classNames={{ root: 'my-breadcrumb', dropdown: 'my-dropdown', dropdownItem: 'my-dropdown-item' }}
        styles={{
          content: { color: '#1890ff' },
          separator: { margin: '0 8px', color: '#999' },
        }}
      />

      {/* styles */}
      <Breadcrumb
        data={data}
        styles={{
          root: { padding: '8px 16px', background: '#f5f5f5', borderRadius: 4 },
          item: { fontSize: 14 },
          content: { fontWeight: 500 },
          dropdown: { border: '1px solid #e8e8e8', borderRadius: 8 },
          dropdownItem: { padding: '4px 12px', color: '#333' },
        }}
      />

      {/* max: semantic styles apply to both outer and popover inner breadcrumb */}
      <Breadcrumb
        data={longData}
        max={3}
        styles={{
          root: { padding: '8px 16px', background: '#f0f7ff', borderRadius: 4 },
          content: { color: '#1890ff', fontWeight: 500 },
          separator: { color: '#bbb' },
        }}
      />
    </div>
  );
};
