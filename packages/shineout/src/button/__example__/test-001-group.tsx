/**
 * cn - group
 *    -- 测试Button.Group组件
 * en - Group
 *    -- Test Button.Group component
 */

import React from 'react';
import { Button, Radio } from 'shineout';
export default () => {
  const [buttonType, setButtonType] = React.useState('primary');
  const [buttonMode, setButtonMode] = React.useState('outline');

  return (
    <div>
      <div>
        <Radio.Group
          keygen
          data={['primary', 'secondary', 'warning', 'danger', 'success', 'default']}
          value={buttonType}
          onChange={setButtonType}
          style={{ marginBottom: 16 }}
        />
        <Radio.Group
          keygen
          data={['outline', 'dashed', 'text']}
          value={buttonMode}
          onChange={setButtonMode}
          style={{ marginBottom: 16 }}
        />
      </div>
      <div>
        <Button type={buttonType} mode={buttonMode}>
          按钮
        </Button>
      </div>
      <div>
        <Button.Group
          type={buttonType}
          style={{ marginLeft: 'var(--soui-button-nearly-margin, 8px)' }}
        >
          <Button>按钮1</Button>
          <Button>按钮2</Button>
          <Button>按钮3</Button>
        </Button.Group>
        <Button.Group
          type={buttonType}
          mode={buttonMode}
          style={{ marginLeft: 'var(--soui-button-nearly-margin, 8px)' }}
        >
          <Button>按钮1</Button>
          <Button>按钮2</Button>
          <Button>按钮3</Button>
        </Button.Group>

        <Button.Group
          mode='outline'
          style={{ marginLeft: 'var(--soui-button-nearly-margin, 8px)' }}
        >
          <Button>按钮1</Button>
          <Button>按钮2</Button>
          <Button>按钮3</Button>
        </Button.Group>
{/*
        <Button.Group
          type={buttonType}
          mode={buttonMode}
          style={{ marginLeft: 'var(--soui-button-nearly-margin, 8px)' }}
        >
          <Button>按钮1</Button>
          <Button>按钮2</Button>
          <Button>按钮3</Button>
        </Button.Group>

        <Button.Group
          type={buttonType}
          mode={buttonMode}
          style={{ marginLeft: 'var(--soui-button-nearly-margin, 8px)' }}
        >
          <Button>按钮1</Button>
          <Button>按钮2</Button>
          <Button>按钮3</Button>
        </Button.Group> */}
      </div>
    </div>
  );
};
