/**
 * cn - 基本用法
 *    --基础 Button 用法
 * en - Base
 *    --Base Button
 */

import React from 'react';
import { Button } from '@sheinx/base';
import { useButtonStyle } from '@sheinx/shineout-style';

export default () => {
  const jssStyle = useButtonStyle();

  return (
    <div>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <span>
          <Button jssStyle={jssStyle} onClick={(e) => console.log(e)}>
            Default
          </Button>
        </span>

        <span>
          <Button jssStyle={jssStyle} type='primary'>
            Primary
          </Button>
        </span>
        <span>
          <Button jssStyle={jssStyle} type='success'>
            Success
          </Button>
        </span>
        <span>
          <Button jssStyle={jssStyle} type='danger'>
            Danger
          </Button>
        </span>
        <span>
          <Button jssStyle={jssStyle} type='warning'>
            Warning
          </Button>
        </span>
        <span>
          <Button jssStyle={jssStyle} type='secondary'>
            Secondary
          </Button>
        </span>
      </div>
    </div>
  );
};
