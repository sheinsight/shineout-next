/**
 * cn - 按钮形状
 *    -- 按钮分为 方形、圆形、全圆角、矩形四种
 * en - Button shape
 *    -- Button is divided into square, circle, round, and rectangle.
 */

import { Button } from 'shineout';
import { Icon01 } from './icon';

export default () => {
  const buttonStyle = {
    margin: 0,
  };

  const iconWarpperStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  };

  return (
    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
      <Button type='primary' shape='square' style={buttonStyle}>
        <span style={iconWarpperStyle}>
          <Icon01></Icon01>
        </span>
      </Button>
      <Button type='primary' shape='circle' style={buttonStyle}>
        <span style={iconWarpperStyle}>
          <Icon01></Icon01>
        </span>
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
