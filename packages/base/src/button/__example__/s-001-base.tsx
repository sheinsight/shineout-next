/**
 * cn - 基本用法
 *    --基础 Button 用法
 * en - Base
 *    --Base Button
 */

import React from 'react';
import { Button, ButtonGroup } from '@sheinx/base';
import { useButtonStyle, useButtonGroupStyle } from '@sheinx/shineout-style';
import Icon from '../../icons';

export default () => {
  const jssStyle = useButtonStyle();
  const jssGroupStyle = useButtonGroupStyle();

  const handleClick = () => {
    console.log(233);
  };

  const randerDropdown = () => {
    return (
      <div style={{ display: 'inline-block' }} className='so-dropdown'>
        <Button jssStyle={jssStyle} type='danger' disabled outline>
          <span style={{ width: 10, height: 10, display: 'inline-block' }}>{Icon.Close}</span>
        </Button>
      </div>
    );
  };
  return (
    <div>
      <div>
        <ButtonGroup jssStyle={jssGroupStyle} size='small'>
          <Button jssStyle={jssStyle} type='danger'>
            APTX
          </Button>
          <Button jssStyle={jssStyle} type='secondary'>
            SHEIN
          </Button>
          <Button jssStyle={jssStyle} type='secondary'>
            SHEIN
          </Button>
          <Button jssStyle={jssStyle} type='primary'>
            4869
          </Button>
        </ButtonGroup>
        {/* <ButtonGroup jssStyle={jssGroupStyle} dash type='success' style={{ marginTop: 10 }}>
          <Button jssStyle={jssStyle}>增加库存</Button>
          <Button jssStyle={jssStyle}>减少库存</Button>
        </ButtonGroup> */}

        <ButtonGroup jssStyle={jssGroupStyle} type='danger' outline style={{ marginTop: 10 }}>
          <Button jssStyle={jssStyle} disabled>
            填充按钮
          </Button>
          {randerDropdown()}
        </ButtonGroup>
      </div>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 20 }}>
        <span>
          <Button jssStyle={jssStyle} type='primary' onClick={handleClick}>
            填充按钮
            <span style={{ width: 10, height: 10, display: 'inline-block', marginLeft: 4 }}>
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
