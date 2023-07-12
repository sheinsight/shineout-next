/**
 * cn - 禁用
 *    -- 禁用状态
 * en - Disabled
 *    -- Disabled state
 */

import React from 'react';
import { Button } from '@sheinx/base';
import { useButtonStyle } from '@sheinx/shineout-style';

export default () => {
  const jssStyle = useButtonStyle();

  return (
    <div>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 20 }}>
        <span>
          <Button jssStyle={jssStyle} disabled>
            Default
          </Button>
        </span>

        <span>
          <Button jssStyle={jssStyle} disabled type='primary'>
            Primary
          </Button>
        </span>
        <span>
          <Button jssStyle={jssStyle} disabled type='success'>
            Success
          </Button>
        </span>
        <span>
          <Button jssStyle={jssStyle} disabled type='danger'>
            Danger
          </Button>
        </span>
        <span>
          <Button jssStyle={jssStyle} disabled type='warning'>
            Warning
          </Button>
        </span>
        <span>
          <Button jssStyle={jssStyle} disabled type='secondary'>
            Secondary
          </Button>
        </span>
      </div>

      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <span>
          <Button jssStyle={jssStyle} disabled text>
            Default
          </Button>
        </span>

        <span>
          <Button jssStyle={jssStyle} disabled text type='primary'>
            Primary
          </Button>
        </span>
        <span>
          <Button jssStyle={jssStyle} disabled text type='success'>
            Success
          </Button>
        </span>
        <span>
          <Button jssStyle={jssStyle} disabled text type='danger'>
            Danger
          </Button>
        </span>
        <span>
          <Button jssStyle={jssStyle} disabled text type='warning'>
            Warning
          </Button>
        </span>
        <span>
          <Button jssStyle={jssStyle} disabled text type='secondary'>
            Secondary
          </Button>
        </span>
      </div>
    </div>
  );
};
