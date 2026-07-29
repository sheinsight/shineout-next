/**
 * cn - 流光尺寸
 *    -- 对比不同的可见流光段尺寸
 * en - Beam size
 *    -- Compare visible beam segment sizes
 */
import React from 'react';
import { BorderBeam } from 'shineout';

const sizes: Array<{ name: string; size?: number; description: string }> = [
  { name: 'Short beam', size: 56, description: 'The visible beam segment is 56px long.' },
  {
    name: 'Default beam',
    description: 'The visible beam segment uses the default 100px size.',
  },
  {
    name: 'Long beam',
    size: 160,
    description: 'The visible beam segment is 160px long.',
  },
];

export default () => (
  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
    {sizes.map(({ name, size, description }) => (
      <BorderBeam key={name} size={size}>
        <div
          style={{
            position: 'relative',
            width: 240,
            minHeight: 124,
            padding: 20,
            border: '1px solid var(--soui-neutral-border-1)',
            borderRadius: 8,
            background: 'var(--soui-neutral-fill-1)',
            color: 'var(--soui-neutral-text-5)',
          }}
        >
          <strong>{name}</strong>
          <span style={{ float: 'right', color: 'var(--soui-neutral-text-4)' }}>
            {size || 100}px
          </span>
          <p style={{ margin: '12px 0 0', color: 'var(--soui-neutral-text-4)' }}>{description}</p>
        </div>
      </BorderBeam>
    ))}
  </div>
);
