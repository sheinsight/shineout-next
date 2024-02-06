/**
 * cn - 垂直分割线
 *    -- 使用 mode="vertical" 设置为行内的垂直分割线
 * en - Vertical
 *    --Use type="vertical" make it vertical.
 */
import React from 'react';
import { Divider } from 'shineout';

const inlineStyle = {
  display: 'inline-block',
  lineHeight: '22px',
  fontSize: 14,
};

const App: React.FC = () => (
  <>
    <span style={inlineStyle}>Item 1</span>
    <Divider mode='vertical'>H</Divider>
    <span style={inlineStyle}>Item 2</span>
    <Divider mode='vertical' />
    <span style={inlineStyle}>Item 3</span>
  </>
);

export default App;
