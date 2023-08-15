/**
 * cn - 对容器使用
 *    -- Spin 可以当作容器使用，只需将它包裹在外层即可。
 * en - Wrapper
 *    -- Spin can be used as a container, just wrap it in the outer layer.
 */
import React from 'react';
import { Spin } from 'shineout';

export default () => {
  return (
    <Spin size={20} tip='loading...' name='ring' mode='vertical'>
      <div
        style={{
          width: '100%',
          fontWeight: 300,
          border: '1px solid #E8EBF0',
          padding: 16,
          boxSizing: 'border-box',
        }}
      >
        <p>Title</p>
        <p style={{ fontSize: 14 }}>
          All regions and relevant departments must attach great importance to and compact their
          responsibilities, strengthen monitoring, forecasting and early warning, strengthen
          inspection and duty, pay close attention to key areas of flood control, implement detailed
          flood control measures, and fully protect the people
        </p>
      </div>
    </Spin>
  );
};
