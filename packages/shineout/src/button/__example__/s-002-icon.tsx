/**
 * cn - 图标按钮
 *    -- Button 可以嵌入图标
 * en - Button with icon
 *    -- Button can embed icons
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
      <Button type='primary' style={buttonStyle}>
        A Primary
      </Button>
      <Button type='primary' style={buttonStyle}>
        Primary A
      </Button>
    </div>
  );
};
