/**
 * cn - 动画时长
 *    -- 对比不同的动画循环时长
 * en - Duration
 *    -- Compare different loop durations
 */
import React from 'react';
import { BorderBeam } from 'shineout';

const durations = [
  {
    name: 'Fast loop',
    seconds: 3,
    description: 'The beam completes one loop every 3 seconds.',
  },
  {
    name: 'Default loop',
    seconds: 6,
    description: 'The beam completes one loop every 6 seconds.',
  },
  {
    name: 'Slow loop',
    seconds: 12,
    description: 'The beam completes one loop every 12 seconds.',
  },
];

export default () => (
  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
    {durations.map(({ name, seconds, description }) => (
      <BorderBeam key={name} duration={seconds}>
        <div
          style={{
            position: 'relative',
            width: 220,
            minHeight: 132,
            padding: 20,
            border: '1px solid var(--soui-neutral-border-1)',
            borderRadius: 8,
            background: 'var(--soui-neutral-fill-1)',
            color: 'var(--soui-neutral-text-5)',
          }}
        >
          <strong>{name}</strong>
          <span style={{ float: 'right', color: 'var(--soui-neutral-text-4)' }}>{seconds}s</span>
          <p style={{ margin: '12px 0 0', color: 'var(--soui-neutral-text-4)' }}>{description}</p>
        </div>
      </BorderBeam>
    ))}
  </div>
);
