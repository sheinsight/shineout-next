/**
 * cn - 底部信息
 *    -- 设置 `renderFooter` 可自定义底部信息
 * en - RenderFooter
 *    -- render textarea `footer`
 */
import React from 'react';
import { Textarea } from 'shineout';

function renderFooter(text: string = '') {
  const style: React.CSSProperties = {
    color: text.length > 20 ? 'var(--danger-6,#CC3D3A)' : 'inherit',
  };
  return (
    <div style={{ textAlign: 'end', color: 'var(--neutral-text-2, #b3b7c1)' }}>
      <span style={style}>{text.length}</span> / 20
    </div>
  );
}

const App: React.FC = () => (
  <Textarea rows={3} renderFooter={renderFooter} placeholder='input something' />
);

export default App;
