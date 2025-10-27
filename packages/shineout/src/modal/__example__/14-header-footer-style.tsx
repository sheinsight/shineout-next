/**
 * cn - 自定义样式
 *    -- 设置 `headerStyle` 和 `footerStyle` 来扩展头部和底部样式
 * en - Custom Style
 *    -- Set `headerStyle` and `footerStyle` to extend the header and footer styles
 */
import React, { useState } from 'react';
import { Modal, Button } from 'shineout';

const App: React.FC = () => {
  const [content, setContent] = useState(1);
  const [visible, setVisible] = useState(false);

  const show = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setVisible(false);
    setContent(content + 1);
    console.log('clicked ok!');
  };

  const handleCancel = () => {
    setVisible(false);
    setContent(content + 1);
    console.log('clicked cancel');
  };

  return (
    <div>
      <Button onClick={show} mode='outline'>
        click me
      </Button>
      <Modal
        width={400}
        visible={visible}
        title='Modal Title'
        position='right'
        onClose={handleCancel}
        headerStyle={{ background: 'none', borderBottom: '1px solid #F4F5F8' }}
        footerStyle={{ borderTop: '1px solid #F4F5F8' }}
        footer={[
          <Button key='cancel' mode='outline' onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key='ok' type='primary' onClick={handleOk}>
            Ok
          </Button>,
        ]}
      >
        {`you are visited ${content}`}
      </Modal>
    </div>
  );
};

export default App;