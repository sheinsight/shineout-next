/**
 * cn - 裁剪容器
 *    -- 将 outset 设为 0，使流光保持在裁剪容器内部
 * en - Clipped container
 *    -- Set outset to 0 to keep the beam inside a clipped container
 */
import React from 'react';
import { BorderBeam } from 'shineout';

export default () => (
  <BorderBeam outset={0}>
    <div
      style={{
        position: 'relative',
        overflow: 'hidden',
        width: 360,
        padding: 24,
        border: '1px solid var(--soui-neutral-border-1)',
        borderRadius: 8,
        background: 'var(--soui-neutral-fill-1)',
      }}
    >
      <strong>Clipped panel</strong>
      <p style={{ margin: '8px 0 0', color: 'var(--soui-neutral-text-4)' }}>
        The beam remains inside this overflow-hidden container.
      </p>
    </div>
  </BorderBeam>
);
