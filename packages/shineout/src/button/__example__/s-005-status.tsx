/**
 * cn - 按钮状态
 *    -- 按钮状态分为危险，警告，成功 三种，可以与按钮类型同时生效，优先级高于按钮类型
 * en - Button status
 *    -- Button status is divided into danger, warning, and success. It can take effect at the same time as the button type, and the priority is higher than the button type.
 */

import { Button } from 'shineout';
export default () => {
  const buttonStyle = {
    margin: 0,
    width: 72,
  };

  const wrapperStyle = {
    gap: 24,
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
  };

  const buttonWrapperStyle = {
    gap: 24,
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
  };

  return (
    <div style={wrapperStyle}>
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
