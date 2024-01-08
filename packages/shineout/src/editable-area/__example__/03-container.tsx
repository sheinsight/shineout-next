/**
 * cn - 自定义容器
 *    -- 在内滚容器中使用此组件，可使用 getPopupContainer 指定渲染的目标容器，使之随之滚动
 * en - Custom container
 *    -- use getPopupContainer return target container
 */
import React from 'react';
import { EditableArea } from 'shineout';

const App: React.FC = () => {
  const container = (): HTMLElement => document.querySelector('#popup-target')!;
  return (
    <div
      id='popup-target'
      style={{ height: 100, overflow: 'auto', position: 'relative', padding: 10, marginLeft: -10 }}
    >
      <div style={{ height: 50 }} />

      <EditableArea
        bordered
        width={300}
        maxHeight={100}
        placeholder='scroll in container'
        getPopupContainer={container}
      />

      <div style={{ height: 140 }} />
    </div>
  );
};

export default App;
