/**
 * cn - 自定义颜色
 *    -- 配置单色或多停靠点渐变
 * en - Custom color
 *    -- Configure a solid color or multiple gradient stops
 */
import React from 'react';
import { BorderBeam, TYPE } from 'shineout';

type Gradient = TYPE.BorderBeam.Gradient;

const presets: Array<{
  name: string;
  usage: string;
  description: string;
  color: Gradient;
}> = [
  {
    name: 'Blue, cyan, and green',
    usage: 'Gradient colors',
    description: '#1677ff, #36cfc9, and #95de64.',
    color: [
      { color: '#1677ff', percent: 0 },
      { color: '#36cfc9', percent: 52 },
      { color: '#95de64', percent: 100 },
    ],
  },
  {
    name: 'Orange, red, and pink',
    usage: 'Gradient colors',
    description: '#ff7a45, #ff4d4f, and #ff85c0.',
    color: [
      { color: '#ff7a45', percent: 0 },
      { color: '#ff4d4f', percent: 49 },
      { color: '#ff85c0', percent: 100 },
    ],
  },
  {
    name: 'Violet, cyan, and light cyan',
    usage: 'Gradient colors',
    description: '#7c3aed, #06b6d4, and #67e8f9.',
    color: [
      { color: '#7c3aed', percent: 0 },
      { color: '#06b6d4', percent: 57 },
      { color: '#67e8f9', percent: 100 },
    ],
  },
  {
    name: 'Green, lime, and yellow',
    usage: 'Gradient colors',
    description: '#22c55e, #a3e635, and #facc15.',
    color: [
      { color: '#22c55e', percent: 0 },
      { color: '#a3e635', percent: 54 },
      { color: '#facc15', percent: 100 },
    ],
  },
  {
    name: 'Orange, coral, and yellow',
    usage: 'Gradient colors',
    description: '#fa541c, #ff7875, and #ffd666.',
    color: [
      { color: '#fa541c', percent: 0 },
      { color: '#ff7875', percent: 46 },
      { color: '#ffd666', percent: 100 },
    ],
  },
  {
    name: 'Blue, violet, and pink',
    usage: 'Gradient colors',
    description: '#2f54eb, #722ed1, and #ff85c0.',
    color: [
      { color: '#2f54eb', percent: 0 },
      { color: '#722ed1', percent: 44 },
      { color: '#ff85c0', percent: 100 },
    ],
  },
];

const panelStyle: React.CSSProperties = {
  position: 'relative',
  width: 248,
  minHeight: 148,
  padding: 20,
  border: '1px solid var(--soui-neutral-border-1)',
  borderRadius: 8,
  background: 'var(--soui-neutral-fill-1)',
  color: 'var(--soui-neutral-text-5)',
};

export default () => (
  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
    {presets.map(({ name, usage, description, color }) => (
      <BorderBeam key={name} color={color}>
        <div style={panelStyle}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <strong>{name}</strong>
            <span style={{ color: 'var(--soui-neutral-text-4)', fontSize: 12 }}>{usage}</span>
          </div>
          <p style={{ margin: '12px 0', color: 'var(--soui-neutral-text-4)' }}>{description}</p>
          <div style={{ display: 'flex', gap: 8 }}>
            {color.map((item) => (
              <span
                key={item.color + '-' + item.percent}
                title={item.color}
                style={{
                  width: 18,
                  height: 18,
                  borderRadius: 3,
                  background: item.color,
                  border: '1px solid var(--soui-neutral-border-1)',
                }}
              />
            ))}
          </div>
        </div>
      </BorderBeam>
    ))}
  </div>
);
