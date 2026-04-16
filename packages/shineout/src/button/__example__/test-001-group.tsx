/**
 * cn - group
 *    -- 测试Button.Group组件
 * en - Group
 *    -- Test Button.Group component
 */

import React from 'react';
import { Button, Radio, Form } from 'shineout';
export default () => {
  const [buttonType, setButtonType] = React.useState('secondary');
  const [buttonMode, setButtonMode] = React.useState('默认(填充模式)');

  return (
    <div>
      <Form labelAlign='top' colon>
        <Form.Item label={<strong>type</strong>}>
          <Radio.Group
            keygen
            data={['secondary', 'primary', 'warning', 'danger', 'success']}
            value={buttonType}
            onChange={setButtonType}
            style={{ marginBottom: 16 }}
          />
        </Form.Item>
        <Form.Item label={<strong>mode</strong>}>
          <Radio.Group
            keygen
            data={['默认(填充模式)', 'outline', 'dashed', 'text']}
            value={buttonMode}
            onChange={setButtonMode}
            style={{ marginBottom: 16 }}
          />
        </Form.Item>
      </Form>
      <div style={{ marginTop: 'var(--soui-button-nearly-margin, 8px)' }}>
        <Button.Group
          type={buttonType as any}
          mode={buttonMode === '默认(填充模式)' ? undefined : buttonMode as any}
        >
          <Button>按钮1</Button>
          <Button>按钮2</Button>
          <Button>按钮3</Button>
          <Button>按钮4</Button>
          <Button>按钮5</Button>
        </Button.Group>
      </div>
    </div>
  );
};
