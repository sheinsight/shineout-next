/**
 * cn - 流光线宽
 *    -- 对比不同的流光线宽
 * en - Line width
 *    -- Compare beam line widths
 */
import React from 'react';
import { BorderBeam } from 'shineout';

const widths: Array<{ name: string; lineWidth?: number; description: string }> = [
  {
    name: 'Default line',
    description: 'The beam uses the default 1px line width.',
  },
  {
    name: 'Wide line',
    lineWidth: 2,
    description: 'The beam uses a 2px line width.',
  },
];

export default () => (
  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
    {widths.map(({ name, lineWidth, description }) => (
      <BorderBeam key={name} lineWidth={lineWidth}>
        <div
          style={{
            position: 'relative',
            width: 280,
            padding: 24,
            border: (lineWidth || 1) + 'px solid var(--soui-neutral-border-1)',
            borderRadius: 8,
            background: 'var(--soui-neutral-fill-1)',
            color: 'var(--soui-neutral-text-5)',
          }}
        >
          <strong>{name}</strong>
          <span style={{ float: 'right', color: 'var(--soui-neutral-text-4)' }}>
            {lineWidth || 1}px
          </span>
          <p style={{ margin: '12px 0 0', color: 'var(--soui-neutral-text-4)' }}>{description}</p>
        </div>
      </BorderBeam>
    ))}
  </div>
);
