/**
 * cn - Semantic DOM
 *    -- 通过 `classNames` 和 `styles` 两个 prop 精准定制内部 DOM 节点（root / header / popup / popupHeader / cell / popupFooter）。
 *    -- 可用 key 列表见组件 Semantic DOM 章节。
 * en - Semantic DOM
 *    -- Use `classNames` and `styles` props to customize internal DOM nodes (root / header / popup / popupHeader / cell / popupFooter).
 *    -- See the Semantic DOM section for the full key list.
 */
import React from 'react';
import { DatePicker } from 'shineout';

export default () => {
  return (
    <DatePicker
      type='date'
      placeholder='Select date'
      styles={{
        root: { border: '2px solid #1890ff', borderRadius: 6 },
        header: { background: '#f0f7ff' },
        popup: { borderRadius: 4 },
        popupHeader: { background: '#fafafa' },
        cell: { borderRadius: 3 },
        popupFooter: { padding: 8 },
      }}
      showSelNow
    />
  );
};
