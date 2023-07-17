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
          <Button jssStyle={jssStyle} type='primary' size='large'>
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

      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 20 }}>
        <span>
          <Button jssStyle={jssStyle} type='primary' outline>
            Primary
          </Button>
        </span>
        <span>
          <Button jssStyle={jssStyle} type='success' outline>
            Success
          </Button>
        </span>
        <span>
          <Button jssStyle={jssStyle} type='danger' outline>
            Danger
          </Button>
        </span>
        <span>
          <Button jssStyle={jssStyle} type='warning' outline>
            Warning
          </Button>
        </span>
        <span>
          <Button jssStyle={jssStyle} type='secondary' outline>
            Secondary
          </Button>
        </span>
      </div>

      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 20 }}>
        <span>
          <Button jssStyle={jssStyle} type='primary' dash>
            Primary
          </Button>
        </span>
        <span>
          <Button jssStyle={jssStyle} type='success' dash>
            Success
          </Button>
        </span>
        <span>
          <Button jssStyle={jssStyle} type='danger' dash>
            Danger
          </Button>
        </span>
        <span>
          <Button jssStyle={jssStyle} type='warning' dash>
            Warning
          </Button>
        </span>
        <span>
          <Button jssStyle={jssStyle} type='secondary' dash>
            Secondary
          </Button>
        </span>
      </div>

      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 20 }}>
        <span>
          <Button jssStyle={jssStyle} type='primary' text>
            Primary
          </Button>
        </span>
        <span>
          <Button jssStyle={jssStyle} type='success' text>
            Success
          </Button>
        </span>
        <span>
          <Button jssStyle={jssStyle} type='danger' text>
            Danger
          </Button>
        </span>
        <span>
          <Button jssStyle={jssStyle} type='warning' text>
            Warning
          </Button>
        </span>
        <span>
          <Button jssStyle={jssStyle} type='secondary' text>
            Secondary
          </Button>
        </span>
      </div>
    </div>
  );
};
