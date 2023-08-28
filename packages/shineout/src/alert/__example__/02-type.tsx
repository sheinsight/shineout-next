/**
 * cn - 不同类型
 *    -- 通过设置 `type` 属性切换不同的提示框类型，支持 4 种不同的类型：`success`、`info`、`warning`、`danger`
 * en - Type
 *    -- Set the `type` property to switch between different types of alert boxes. Support 4 different types: `success`, `info`, `warning`, `danger`
 */
import React from 'react';
import { Alert } from 'shineout';

export default () => {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 32 }}>
      <Alert icon type='info'>
        This is informative text.
      </Alert>
      <Alert icon type='success'>
        This is success text.
      </Alert>
      <Alert icon type='warning'>
        This is warning text.
      </Alert>
      <Alert icon type='danger'>
        This is danger text.
      </Alert>
    </div>
  );
};
