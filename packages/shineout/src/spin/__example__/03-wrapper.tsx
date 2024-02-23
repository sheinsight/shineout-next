/**
 * cn - 对容器使用
 *    -- Spin 可以当作容器使用，只需将它包裹在外层即可
 * en - Wrapper
 *    -- Spin can be used as a container, just wrap it in the outer layer.
 */
import React from 'react';
import { Spin } from 'shineout';

export default () => {
  return (
    <Spin
      size={20}
      tip={<span style={{ fontSize: 14 }}>loading...</span>}
      name='ring'
      mode='vertical'
    >
      <div
        style={{
          width: '100%',
          fontWeight: 300,
          border: '1px solid #E8EBF0',
          padding: 16,
          boxSizing: 'border-box',
        }}
      >
        <p
          style={{
            width: '20%',
            height: 18,
            background: '#E8EBF0',
            borderRadius: 2,
            marginBottom: 16,
          }}
        ></p>
        <p
          style={{
            width: '100%',
            height: 18,
            borderRadius: 2,
            background: '#E8EBF0',
            marginBottom: 16,
          }}
        ></p>
        <p style={{ width: '100%', height: 18, borderRadius: 2, background: '#E8EBF0' }}></p>
      </div>
    </Spin>
  );
};
