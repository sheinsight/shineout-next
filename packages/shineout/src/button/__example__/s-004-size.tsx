/**
 * cn - 按钮尺寸
 *    -- 按钮分为小、中、大三种尺寸，推荐及默认为尺寸「中」，可在不同场景及不同业务需求选择适合尺寸
 * en - Button size
 *    -- Button is divided into small, medium, and large. The recommended and default size is medium. You can choose the appropriate size in different scenarios and different business needs
 */

import { Button } from 'shineout';
export default () => {
  const buttonStyle = {
    margin: 0,
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap' }}>
      <Button type='primary' size='small' style={buttonStyle}>
        Primary
      </Button>
      <Button type='primary' style={buttonStyle}>
        Primary
      </Button>
      <Button type='primary' size='large' style={buttonStyle}>
        Primary
      </Button>
    </div>
  );
};
