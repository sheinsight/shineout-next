/**
 * cn - 按钮状态
 *    -- 按钮状态分为危险、警告、成功三种，可以与按钮类型同时生效，优先级高于按钮类型
 * en - Button status
 *    -- Button status is divided into danger, warning, and success. It can take effect at the same time as the button type, and the priority is higher than the button type
 */

import { Button } from 'shineout';

const buttonStyle = {
  margin: 0,
  width: 72,
} as React.CSSProperties;

const wrapperStyle = {
  gap: 24,
  display: 'flex',
  flexWrap: 'wrap',
  flexDirection: 'column',
} as React.CSSProperties;

const buttonWrapperStyle = {
  gap: 24,
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
} as React.CSSProperties;
export default () => {
  return (
    <div style={wrapperStyle}>
      <div style={buttonWrapperStyle}>
        <Button type='default' style={buttonStyle}>
          Danger
        </Button>
        <Button type='default' mode='outline' style={buttonStyle}>
          Danger
        </Button>
        <Button type='default' mode='dashed' style={buttonStyle}>
          Danger
        </Button>
        <Button type='default' mode='text' style={buttonStyle}>
          Danger
        </Button>
      </div>
      <div style={buttonWrapperStyle}>
        <Button type='primary' style={buttonStyle}>
          Danger
        </Button>
        <Button type='primary' mode='outline' style={buttonStyle}>
          Danger
        </Button>
        <Button type='primary' mode='dashed' style={buttonStyle}>
          Danger
        </Button>
        <Button type='primary' mode='text' style={buttonStyle}>
          Danger
        </Button>
      </div>
      <div style={buttonWrapperStyle}>
        <Button type='danger' style={buttonStyle}>
          Danger
        </Button>
        <Button type='danger' mode='outline' style={buttonStyle}>
          Danger
        </Button>
        <Button type='danger' mode='dashed' style={buttonStyle}>
          Danger
        </Button>
        <Button type='danger' mode='text' style={buttonStyle}>
          Danger
        </Button>
      </div>
      <div style={buttonWrapperStyle}>
        <Button type='warning' style={buttonStyle}>
          Warning
        </Button>
        <Button type='warning' mode='outline' style={buttonStyle}>
          Warning
        </Button>
        <Button type='warning' mode='dashed' style={buttonStyle}>
          Warning
        </Button>
        <Button type='warning' mode='text' style={buttonStyle}>
          Warning
        </Button>
      </div>
      <div style={buttonWrapperStyle}>
        <Button type='success' style={buttonStyle}>
          Success
        </Button>
        <Button type='success' mode='outline' style={buttonStyle}>
          Success
        </Button>
        <Button type='success' mode='dashed' style={buttonStyle}>
          Success
        </Button>
        <Button type='success' mode='text' style={buttonStyle}>
          Success
        </Button>
      </div>
    </div>
  );
};
