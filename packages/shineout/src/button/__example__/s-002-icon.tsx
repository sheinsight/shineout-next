/**
 * cn - 图标按钮
 *    -- Button 可以嵌入图标
 * en - Button with icon
 *    -- Button can embed icons
 */

import { Button } from 'shineout';
import { Icon01 } from './static/icon';

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
      <Button type='primary' style={buttonStyle}>
        <span style={iconWarpperStyle}>
          <Icon01></Icon01> Primary
        </span>
      </Button>
      <Button type='primary' style={buttonStyle}>
        <span style={iconWarpperStyle}>
          Primary <Icon01></Icon01>
        </span>
      </Button>
    </div>
  );
};
