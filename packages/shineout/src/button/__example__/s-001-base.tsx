/**
 * cn - 基本用法
 *    -- 按钮分为主要按钮、次要按钮、线框按钮、虚框按钮、文字按钮五种，主按钮在同一个操作区域最多出现一次
 * en - Base
 *    -- Button is divided into five types: primary, secondary, outline, dash, and text. The primary button can only appear once in the same operation area
 */

import { Button, setToken } from 'shineout';
export default () => {
  const buttonStyle = {
    margin: 0,
  };

  setToken({
    selector: 'body',
    token: {
      buttonFontSize: 'var(--px-12,12px)',
    },
  });

  return (
    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
      <Button type='primary' style={buttonStyle}>
        Primary
      </Button>

      <Button type='secondary' style={buttonStyle}>
        Secondary
      </Button>

      <Button type='secondary' mode='outline' style={buttonStyle}>
        Outline
      </Button>

      <Button type='secondary' mode='dashed' style={buttonStyle}>
        Dashed
      </Button>

      <Button type='primary' mode='text' style={buttonStyle}>
        Text
      </Button>
    </div>
  );
};
