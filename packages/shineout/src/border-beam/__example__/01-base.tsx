/**
 * cn - 基础用法
 *    -- 展示 BorderBeam 的默认配置
 * en - Basic
 *    -- Show the default BorderBeam settings
 */
import React from 'react';
import { BorderBeam } from 'shineout';

export default () => (
  <BorderBeam>
    <div
      style={{
        position: 'relative',
        width: 360,
        padding: 24,
        border: '1px solid var(--soui-neutral-border-1)',
        borderRadius: 8,
        background: 'var(--soui-neutral-fill-1)',
        color: 'var(--soui-neutral-text-5)',
      }}
    >
      <strong>Example panel</strong>
      <p style={{ margin: '8px 0 0', color: 'var(--soui-neutral-text-4)' }}>
        Supporting content for the default BorderBeam example.
      </p>
    </div>
  </BorderBeam>
);
