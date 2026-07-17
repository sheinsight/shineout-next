/**
 * cn - 弹出层继承
 *    -- 声明式创建的 Modal 和 Drawer 默认继承外层水印
 * en - Popup inheritance
 *    -- Declarative Modal and Drawer content inherits the nearest watermark by default
 */
import React, { useState } from 'react';
import { Button, Drawer, Modal, Watermark } from 'shineout';

export default () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [container, setContainer] = useState<HTMLDivElement | null>(null);

  return (
    <div
      ref={setContainer}
      style={{ position: 'relative', height: 320, overflow: 'hidden', transform: 'translateZ(0)' }}
    >
      <Watermark content='Shineout' style={{ height: '100%' }}>
        <div style={{ height: '100%', padding: 24, background: '#fafafa' }}>
          <div style={{ display: 'flex', gap: 12 }}>
            <Button mode='outline' onClick={() => setModalVisible(true)}>
              Open Modal
            </Button>
            <Button mode='outline' onClick={() => setDrawerVisible(true)}>
              Open Drawer
            </Button>
          </div>
          <div style={{ marginTop: 24 }}>Popup inheritance</div>
          <Modal
            visible={modalVisible}
            title='Modal'
            width={440}
            container={container}
            onClose={() => setModalVisible(false)}
          >
            Modal content
          </Modal>
          <Drawer
            visible={drawerVisible}
            title='Drawer'
            width={420}
            container={container}
            onClose={() => setDrawerVisible(false)}
          >
            Drawer content
          </Drawer>
        </div>
      </Watermark>
    </div>
  );
};
