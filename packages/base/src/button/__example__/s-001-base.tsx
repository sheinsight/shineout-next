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

  const randerDropdown = (type: any, style?: any) => {
    return (
      <div style={{ display: 'inline-block' }} className='so-dropdown'>
        <Button
          jssStyle={jssStyle}
          type={type}
          outline={style === 'outline' ? true : undefined}
          text={style === 'text' ? true : undefined}
        >
          <span style={{ width: 10, height: 10, display: 'inline-block' }}>{Icon.Close}</span>
        </Button>
      </div>
    );
  };
  return (
    <div>
      <div>
        <ButtonGroup jssStyle={jssGroupStyle} type='danger' style={{ marginTop: 10 }}>
          <Button jssStyle={jssStyle} disabled>
            填充按钮
          </Button>
          <Button jssStyle={jssStyle}>填充按钮</Button>
          <Button jssStyle={jssStyle}>填充按钮</Button>
          <Button jssStyle={jssStyle}>填充按钮</Button>
          {randerDropdown('danger')}
        </ButtonGroup>

        <ButtonGroup jssStyle={jssGroupStyle} type='secondary' style={{ marginTop: 10 }}>
          <Button jssStyle={jssStyle}>填充按钮</Button>
          <Button jssStyle={jssStyle} type='primary'>
            填充按钮
          </Button>
          <Button jssStyle={jssStyle} disabled>
            填充按钮
          </Button>
          <Button jssStyle={jssStyle}>填充按钮</Button>
          {randerDropdown('secondary')}
        </ButtonGroup>

        <ButtonGroup jssStyle={jssGroupStyle} type='primary' style={{ marginTop: 10 }}>
          <Button jssStyle={jssStyle}>填充按钮</Button>
          <Button jssStyle={jssStyle}>填充按钮</Button>
          <Button jssStyle={jssStyle}>填充按钮</Button>
          <Button jssStyle={jssStyle}>填充按钮</Button>
          {randerDropdown('primary')}
        </ButtonGroup>

        <ButtonGroup jssStyle={jssGroupStyle} type='success' style={{ marginTop: 10 }}>
          <Button jssStyle={jssStyle}>填充按钮</Button>
          <Button jssStyle={jssStyle}>填充按钮</Button>
          <Button jssStyle={jssStyle}>填充按钮</Button>
          <Button jssStyle={jssStyle}>填充按钮</Button>
          {randerDropdown('success')}
        </ButtonGroup>

        <ButtonGroup jssStyle={jssGroupStyle} type='warning' style={{ marginTop: 10 }}>
          <Button jssStyle={jssStyle}>填充按钮</Button>
          <Button jssStyle={jssStyle}>填充按钮</Button>
          <Button jssStyle={jssStyle}>填充按钮</Button>
          <Button jssStyle={jssStyle}>填充按钮</Button>
          {randerDropdown('warning')}
        </ButtonGroup>
        {/* outline */}
        <ButtonGroup jssStyle={jssGroupStyle} type='danger' outline style={{ marginTop: 10 }}>
          <Button jssStyle={jssStyle}>填充按钮</Button>
          <Button jssStyle={jssStyle}>填充按钮</Button>
          <Button jssStyle={jssStyle}>填充按钮</Button>
          <Button jssStyle={jssStyle}>填充按钮</Button>
          {randerDropdown('danger', 'outline')}
        </ButtonGroup>

        <ButtonGroup jssStyle={jssGroupStyle} type='secondary' outline style={{ marginTop: 10 }}>
          <Button jssStyle={jssStyle}>填充按钮</Button>
          <Button jssStyle={jssStyle}>填充按钮</Button>
          <Button jssStyle={jssStyle}>填充按钮</Button>
          <Button jssStyle={jssStyle}>填充按钮</Button>
          {randerDropdown('secondary', 'outline')}
        </ButtonGroup>

        <ButtonGroup jssStyle={jssGroupStyle} type='primary' outline style={{ marginTop: 10 }}>
          <Button jssStyle={jssStyle}>填充按钮</Button>
          <Button jssStyle={jssStyle}>填充按钮</Button>
          <Button jssStyle={jssStyle}>填充按钮</Button>
          <Button jssStyle={jssStyle}>填充按钮</Button>
          {randerDropdown('primary', 'outline')}
        </ButtonGroup>

        <ButtonGroup jssStyle={jssGroupStyle} type='warning' outline style={{ marginTop: 10 }}>
          <Button jssStyle={jssStyle}>填充按钮</Button>
          <Button jssStyle={jssStyle}>填充按钮</Button>
          <Button jssStyle={jssStyle}>填充按钮</Button>
          <Button jssStyle={jssStyle}>填充按钮</Button>
          {randerDropdown('warning', 'outline')}
        </ButtonGroup>

        {/* text */}

        <ButtonGroup jssStyle={jssGroupStyle} type='danger' text style={{ marginTop: 10 }}>
          <Button jssStyle={jssStyle}>填充按钮</Button>
          <Button jssStyle={jssStyle}>填充按钮</Button>
          <Button jssStyle={jssStyle}>填充按钮</Button>
          <Button jssStyle={jssStyle}>填充按钮</Button>
          {randerDropdown('danger', 'text')}
        </ButtonGroup>

        <ButtonGroup jssStyle={jssGroupStyle} type='secondary' text style={{ marginTop: 10 }}>
          <Button jssStyle={jssStyle}>填充按钮</Button>
          <Button jssStyle={jssStyle}>填充按钮</Button>
          <Button jssStyle={jssStyle}>填充按钮</Button>
          <Button jssStyle={jssStyle}>填充按钮</Button>
          {randerDropdown('secondary', 'text')}
        </ButtonGroup>

        <ButtonGroup jssStyle={jssGroupStyle} type='primary' text style={{ marginTop: 10 }}>
          <Button jssStyle={jssStyle}>填充按钮</Button>
          <Button jssStyle={jssStyle}>填充按钮</Button>
          <Button jssStyle={jssStyle}>填充按钮</Button>
          <Button jssStyle={jssStyle}>填充按钮</Button>
          {randerDropdown('primary', 'text')}
        </ButtonGroup>

        <ButtonGroup jssStyle={jssGroupStyle} type='warning' text style={{ marginTop: 10 }}>
          <Button jssStyle={jssStyle}>填充按钮</Button>
          <Button jssStyle={jssStyle}>填充按钮</Button>
          <Button jssStyle={jssStyle}>填充按钮</Button>
          <Button jssStyle={jssStyle}>填充按钮</Button>
          {randerDropdown('warning', 'text')}
        </ButtonGroup>
      </div>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 20 }}>
        <span>
          <Button jssStyle={jssStyle} type='primary' onClick={handleClick}>
            PRIMARY
          </Button>
        </span>
        <span>
          <Button jssStyle={jssStyle} type='success'>
            SUCCESS
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
            PRIMARY
          </Button>
        </span>
        <span>
          <Button jssStyle={jssStyle} type='success' outline>
            SUCCESS
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
            PRIMARY
          </Button>
        </span>
        <span>
          <Button jssStyle={jssStyle} type='success' dash>
            SUCCESS
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
            PRIMARY
          </Button>
        </span>
        <span>
          <Button jssStyle={jssStyle} type='success' text>
            SUCCESS
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
            PRIMARY
          </Button>
        </span>
        <span>
          <Button jssStyle={jssStyle} type='success'>
            SUCCESS
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
          <Button jssStyle={jssStyle} type='primary' shape='circle' size='small'>
            A
          </Button>
          <Button jssStyle={jssStyle} type='primary' shape='circle'>
            A
          </Button>
          <Button jssStyle={jssStyle} type='primary' shape='circle' size='large'>
            A
          </Button>

          <Button jssStyle={jssStyle} type='primary' shape='circle' outline size='small'>
            A
          </Button>
          <Button jssStyle={jssStyle} type='primary' shape='circle' outline>
            A
          </Button>
          <Button jssStyle={jssStyle} type='primary' shape='circle' outline size='large'>
            A
          </Button>

          <Button jssStyle={jssStyle} type='primary' shape='circle' dash size='small'>
            A
          </Button>
          <Button jssStyle={jssStyle} type='primary' shape='circle' dash>
            A
          </Button>
          <Button jssStyle={jssStyle} type='primary' shape='circle' dash size='large'>
            A
          </Button>
        </span>
      </div>

      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 20 }}>
        <span>
          <Button jssStyle={jssStyle} type='primary' shape='square' size='small'>
            A
          </Button>
          <Button jssStyle={jssStyle} type='primary' shape='square'>
            A
          </Button>
          <Button jssStyle={jssStyle} type='primary' shape='square' size='large'>
            A
          </Button>

          <Button jssStyle={jssStyle} type='primary' shape='square' outline size='small'>
            A
          </Button>
          <Button jssStyle={jssStyle} type='primary' shape='square' outline>
            A
          </Button>
          <Button jssStyle={jssStyle} type='primary' shape='square' outline size='large'>
            A
          </Button>

          <Button jssStyle={jssStyle} type='primary' shape='square' dash size='small'>
            A
          </Button>
          <Button jssStyle={jssStyle} type='primary' shape='square' dash>
            A
          </Button>
          <Button jssStyle={jssStyle} type='primary' shape='square' dash size='large'>
            A
          </Button>
        </span>
      </div>
    </div>
  );
};
