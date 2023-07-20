/**
 * cn - 按钮形状
 *    -- 按钮分为 方形、圆形、全圆角、矩形四种
 * en - Button shape
 *    -- Button is divided into square, circle, round, and rectangle.
 */

import { Button } from 'shineout';
export default () => {
  const buttonStyle = {
    margin: 0,
  };

  return (
    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
      <Button type='primary' shape='square' style={buttonStyle}>
        A
      </Button>
      <Button type='primary' shape='circle' style={buttonStyle}>
        A
      </Button>
      <Button type='primary' shape='round' style={buttonStyle}>
        Primary
      </Button>
      <Button type='primary' style={buttonStyle}>
        Primary
      </Button>
    </div>
  );
};
