/**
 * cn - 指定目标
 *    -- 设置 `container` 来指定 Modal 渲染的目标节点
 *    -- 设置 `containerClassName` 来指定目标节点的 className
 * en - Target
 *    -- set `container` to render target node
 */
import React, { useRef, useState } from 'react';
import { Modal, Button } from 'shineout';

const App: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const show = () => {
    setVisible(true);
  };

  const handleDismiss = () => {
    setVisible(false);
  };

  return (
    <div ref={wrapperRef}>
      <Button onClick={show} mode='outline'>
        click me
      </Button>
      <Modal
        container={wrapperRef.current || undefined}
        containerClassName="my-custom-modal-container"
        visible={visible}
        width={400}
        title='Modal Title'
        onClose={handleDismiss}
        footer={[
          <Button key='cancel' mode='outline' onClick={handleDismiss}>
            Cancel
          </Button>,
          <Button key='ok' type='primary' onClick={handleDismiss}>
            Ok
          </Button>,
        ]}
      >
        Modal mount after Button
      </Modal>
    </div>
  );
};

export default App;
