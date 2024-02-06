/**
 * cn -
 *    -- 通过配置 `name` ，可以设置不同的动画效果, 通过配置 `size` 可以设置动画大小
 * en -
 *    -- Set different animation effects by configuring `name`, and set animation size by configuring `size`.
 */
import React from 'react';
import { Spin } from 'shineout';

export default () => {
  const names1 = [
    // 'default',
    'chasing-dots',
    'cube-grid',
    'double-bounce',
    'fading-circle',
    'four-dots',
    'plane',
  ];

  const names2 = ['pulse', 'ring', 'scale-circle', 'three-bounce', 'wave', 'chasing-ring'];

  const renderTip = (name: string) => {
    return (
      <span style={{ fontSize: 12, lineHeight: 'calc(1em + 8px)', display: 'inline-block' }}>
        {name}
      </span>
    );
  };
  return (
    <div style={{ width: '100%', overflow: 'auto' }}>
      <div style={{ display: 'flex', flexWrap: 'nowrap', gap: 65, marginBottom: 32 }}>
        {names1.map((name, index) => (
          <div key={index} style={{ width: '16%' }}>
            <Spin name={name as any} size={16} tip={renderTip(name)} />
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', flexWrap: 'nowrap', gap: 65 }}>
        {names2.map((name, index) => (
          <div key={index} style={{ width: '16%' }}>
            <Spin key={index} name={name as any} size={16} tip={renderTip(name)} />
          </div>
        ))}
      </div>
    </div>
  );
};
