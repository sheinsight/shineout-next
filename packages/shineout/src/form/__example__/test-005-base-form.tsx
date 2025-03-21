/**
 * cn - Form嵌套提交
 *    -- 调试用的，在这个例子基础上随便改吧
 * en - Test Form
 *    -- Test Form
 */
import React from 'react';
import { Form, Input, Switch, Button, Modal } from 'shineout';

export default () => {
  const [parentForm, setParentForm] = React.useState({
    parent1: '1',
    parent2: '2',
    showChild: true,
  });
  const [childForm, setChildForm] = React.useState({ child1: '1' });

  const [modalVisible, setModalVisible] = React.useState(false);

  return (
    <div>
      <Button
        onClick={() => {
          setModalVisible(true);
        }}
      >
        打开Modal
      </Button>
      <Modal
        title='嵌套Form提交'
        visible={modalVisible}
        footer={
          <>
            <Modal.Submit type='primary' data-apmclick='mindmap-用例列表的用例抽屉提交'>
              保存
            </Modal.Submit>
            <Button
              onClick={() => {
                setModalVisible(false);
              }}
            >
              取消
            </Button>
          </>
        }
      >
        <Form
          value={parentForm}
          onChange={setParentForm}
          onSubmit={(v) => console.log('parent form submit:>>', v)}
        >
          <h4>parent form:</h4>
          <Input name='parent1' />
          <Input name='parent2' />
          <Switch name='showChild' />

          {parentForm.showChild && (
            <Form value={childForm} onChange={setChildForm}>
              <h4>child form:</h4>
              <Input name='child1' trim />
            </Form>
          )}
        </Form>
      </Modal>
    </div>
  );
};
