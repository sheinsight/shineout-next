/**
 * cn -
 *    -- 通过配置 `name` ，可以设置不同的动画效果, 通过配置 `size` 可以设置动画大小。
 * en -
 *    -- Set different animation effects by configuring `name`, and set animation size by configuring `size`.
 */
import React from 'react';
import { Spin } from 'shineout';

export default () => {
  const names = [
    'default',
    'chasing-dots',
    'cube-grid',
    'double-bounce',
    'fading-circle',
    'four-dots',
    'plane',
    'pulse',
    'ring',
    'scale-circle',
    'three-bounce',
    'wave',
    'chasing-ring',
  ];

  const renderTip = (name: string) => {
    return <span style={{ fontSize: 12, fontWeight: 300 }}>{name}</span>;
  };
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 65 }}>
      {names.map((name, index) => (
        <Spin key={index} name={name as any} size={16} tip={renderTip(name)} />
      ))}
    </div>
  );
};
