/**
 * cn - 遮罩
 *    -- 通过 `mask` 属性控制遮罩的显示。设置 `mask={false}` 隐藏遮罩，设置 `mask={{ blur: true }}` 显示模糊遮罩
 * en - Mask
 *    -- Use the `mask` prop to control the mask display. Set `mask={false}` to hide the mask, set `mask={{ blur: true }}` to show a blurred mask
 */
import React, { useState } from 'react';
import { Modal, Button } from 'shineout';

const App: React.FC = () => {
  const [visible1, setVisible2] = useState(false);
  const [visible2, setVisible1] = useState(false);

  const info1 = () => {
    Modal.info({
      title: 'This is a info message',
      content: 'this is some information that user must know',
      mask: { blur: true },
    });
  };

  const info2 = () => {
    Modal.info({
      title: 'This is a success message',
      content: 'this is some information that user successful operation',
      mask: false,
    });
  };

  return (
    <div style={{ display: 'flex', gap: '16px' }}>
      <Button mode='outline' onClick={() => setVisible1(true)}>
        mask blur
      </Button>
      <Button mode='outline' onClick={() => setVisible2(true)}>
        mask=false
      </Button>
      <Modal
        title='Modal with blur mask'
        visible={visible2}
        onClose={() => setVisible1(false)}
        mask={{ blur: true }}
        footer={<Button type="primary" onClick={() => setVisible1(false)}>Close</Button>}
      >
        This modal has a blurred mask
      </Modal>
      <Modal
        title='Modal without mask'
        visible={visible1}
        onClose={() => setVisible2(false)}
        mask={false}
        footer={<Button type="primary" onClick={() => setVisible2(false)}>Close</Button>}
      >
        This modal has no mask
      </Modal>

      <Button type='primary' onClick={info1}>
        info (blur)
      </Button>
      <Button type='primary' onClick={info2}>
        info (no mask)
      </Button>
    </div>
  );
};

export default App;
