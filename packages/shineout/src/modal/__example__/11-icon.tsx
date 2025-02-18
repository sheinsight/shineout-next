/**
 * cn - 附带图标
 *    -- 使用 type 属性来指定标题附带的图标
 * en - Icon
 *    -- use type display type icon
 */
import React, { useState } from 'react';
import { Modal, Button, Radio, TYPE } from 'shineout';

type ModalProps = TYPE.Modal.Props;
type ModalType = ModalProps['type'];

const typeList: ModalType[] = ['info', 'success', 'warning', 'error'];

const App: React.FC = () => {
  const [type, setType] = useState<ModalType>('success');
  const [visible, setVisible] = useState(false);

  const handleOk = () => {
    setVisible(false);
    console.log('clicked ok!');
  };

  const handleCancel = () => {
    setVisible(false);
    console.log('clicked cancel');
  };

  const show = () => setVisible(true);

  const footer = () => [
    <Button key='cancel' mode="outline" onClick={handleCancel}>
      Cancel
    </Button>,

    <Button key='ok' type='primary' onClick={handleOk}>
      Ok
    </Button>,
  ];

  return (
    <div>
      <Radio.Group
        style={{ marginBottom: 24 }}
        data={typeList}
        value={type}
        keygen
        onChange={setType}
      />

      <Button mode='outline' onClick={show}>
        click me
      </Button>

      <Modal
        type={type}
        width={500}
        visible={visible}
        footer={footer()}
        onClose={handleCancel}
        title={`Modal Title with ${type} Icon`}
      >
        <span>Modal type: </span>
        <b>{type}</b>
      </Modal>
    </div>
  );
};
export default App;
