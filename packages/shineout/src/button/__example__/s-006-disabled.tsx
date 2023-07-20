/**
 * cn - 禁用按钮
 *    -- 按钮的禁用状态
 * en - Disabled
 *    -- Button disabled state
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
        <Button type='primary' disabled style={buttonStyle}>
          Primary
        </Button>
        <Button type='primary' disabled mode='outline' style={buttonStyle}>
          Primary
        </Button>
        <Button type='primary' disabled mode='dash' style={buttonStyle}>
          Primary
        </Button>
        <Button type='primary' disabled mode='text' style={buttonStyle}>
          Primary
        </Button>
      </div>
      <div style={buttonWrapperStyle}>
        <Button type='danger' disabled style={buttonStyle}>
          Danger
        </Button>
        <Button type='danger' disabled mode='outline' style={buttonStyle}>
          Danger
        </Button>
        <Button type='danger' disabled mode='dash' style={buttonStyle}>
          Danger
        </Button>
        <Button type='danger' disabled mode='text' style={buttonStyle}>
          Danger
        </Button>
      </div>
      <div style={buttonWrapperStyle}>
        <Button type='warning' disabled style={buttonStyle}>
          Warning
        </Button>
        <Button type='warning' disabled mode='outline' style={buttonStyle}>
          Warning
        </Button>
        <Button type='warning' disabled mode='dash' style={buttonStyle}>
          Warning
        </Button>
        <Button type='warning' disabled mode='text' style={buttonStyle}>
          Warning
        </Button>
      </div>
      <div style={buttonWrapperStyle}>
        <Button type='success' disabled style={buttonStyle}>
          Success
        </Button>
        <Button type='success' disabled mode='outline' style={buttonStyle}>
          Success
        </Button>
        <Button type='success' disabled mode='dash' style={buttonStyle}>
          Success
        </Button>
        <Button type='success' disabled mode='text' style={buttonStyle}>
          Success
        </Button>
      </div>
    </div>
  );
};
