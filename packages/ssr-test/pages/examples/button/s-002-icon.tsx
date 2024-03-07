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

  return (
    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
      <Button type='primary' style={buttonStyle}>
        <Icon01 style={{ marginRight: 4 }}></Icon01>
        Primary
      </Button>
      <Button type='primary' style={buttonStyle}>
        Primary
        <Icon01 style={{ marginLeft: 4 }}></Icon01>
      </Button>
      <Button type='primary' shape='square' style={buttonStyle}>
        <Icon01></Icon01>
      </Button>
    </div>
  );
};
