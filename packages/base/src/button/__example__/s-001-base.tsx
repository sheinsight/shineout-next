/**
 * cn - 基本用法
 *    --基础 Button 用法
 * en - Base
 *    --Base Button
 */

import React from 'react';
import { Button } from '@sheinx/base';
import { useButtonStyle } from '@sheinx/shineout-style';
import Icon from '../../icons';

export default () => {
  const jssStyle = useButtonStyle();
  const handleClick = () => {
    console.log(233);
  };
  return (
    <div>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <span>
          <Button jssStyle={jssStyle} type='primary' onClick={handleClick}>
            填充按钮
            <span style={{ fontSize: 12, width: 12, height: 12, display: 'inline-block' }}>
              {Icon.Close}
            </span>
          </Button>
        </span>
        <span>
          <Button jssStyle={jssStyle} type='success'>
            填充按钮
          </Button>
        </span>
        <span>
          <Button jssStyle={jssStyle} type='danger'>
            填充按钮
          </Button>
        </span>
        <span>
          <Button jssStyle={jssStyle} type='warning'>
            填充按钮
          </Button>
        </span>
        <span>
          <Button jssStyle={jssStyle} type='secondary'>
            填充按钮
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

      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 20 }}>
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
