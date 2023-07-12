/**
 * cn - 文字按钮
 *    --文字 Button 用法
 * en - Text
 *    --Text Button
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
          <Button jssStyle={jssStyle} text>
            Default
          </Button>
        </span>

        <span>
          <Button jssStyle={jssStyle} text type='primary'>
            Primary
          </Button>
        </span>
        <span>
          <Button jssStyle={jssStyle} text type='success'>
            Success
          </Button>
        </span>
        <span>
          <Button jssStyle={jssStyle} text type='danger'>
            Danger
          </Button>
        </span>
        <span>
          <Button jssStyle={jssStyle} text type='warning'>
            Warning
          </Button>
        </span>
        <span>
          <Button jssStyle={jssStyle} text type='secondary'>
            Secondary
          </Button>
        </span>
      </div>
    </div>
  );
};
