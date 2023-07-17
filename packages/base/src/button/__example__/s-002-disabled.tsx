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
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
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

      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 20 }}>
        <span>
          <Button jssStyle={jssStyle} disabled type='primary' outline>
            Primary
          </Button>
        </span>
        <span>
          <Button jssStyle={jssStyle} disabled type='success' outline>
            Success
          </Button>
        </span>
        <span>
          <Button jssStyle={jssStyle} disabled type='danger' outline>
            Danger
          </Button>
        </span>
        <span>
          <Button jssStyle={jssStyle} disabled type='warning' outline>
            Warning
          </Button>
        </span>
        <span>
          <Button jssStyle={jssStyle} disabled type='secondary' outline>
            Secondary
          </Button>
        </span>
      </div>

      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 20 }}>
        <span>
          <Button jssStyle={jssStyle} disabled type='primary' dash>
            Primary
          </Button>
        </span>
        <span>
          <Button jssStyle={jssStyle} disabled type='success' dash>
            Success
          </Button>
        </span>
        <span>
          <Button jssStyle={jssStyle} disabled type='danger' dash>
            Danger
          </Button>
        </span>
        <span>
          <Button jssStyle={jssStyle} disabled type='warning' dash>
            Warning
          </Button>
        </span>
        <span>
          <Button jssStyle={jssStyle} disabled type='secondary' dash>
            Secondary
          </Button>
        </span>
      </div>
    </div>
  );
};
