/**
 * cn - 基本用法
 *    --
 * en - Basic
 *    --
 */
import React from 'react';
import { Modal, Button, ModalMethods } from '@sheinx/base';
import { useModalStyle, useAlertStyle, useButtonStyle } from '@sheinx/shineout-style';

const jssStyle = {
  modal: useModalStyle,
  alert: useAlertStyle,
  button: useButtonStyle,
};

const ModalSuccess = ModalMethods.type('success', jssStyle);

export default () => {
  const [v, setV] = React.useState(false);
  return (
    <div>
      <Button
        jssStyle={jssStyle}
        onClick={() => {
          setV(true);
        }}
      >
        打开
      </Button>
      <Button
        jssStyle={jssStyle}
        onClick={() => {
          ModalSuccess({
            title: '哈哈哈哈',
            children: '哇哇哇',
            onClose: () => {
              console.log('哈哈哈哈');
            },
            type: 'success',
          });
        }}
      >
        打开2
      </Button>
      <Modal
        jssStyle={jssStyle}
        destroy
        visible={v}
        onClose={() => {
          setV(false);
        }}
        title='Modal Title'
        type='success'
        footer={[
          <Button
            key='cancel'
            jssStyle={jssStyle}
            onClick={() => {
              setV(false);
            }}
          >
            Cancel
          </Button>,
          <Button
            key='ok'
            type='primary'
            jssStyle={jssStyle}
            onClick={() => {
              ModalSuccess({
                title: '哈哈哈哈',
                children: '哇哇哇',
                onClose: () => {
                  console.log('哈哈哈哈');
                },
                onOk: () => {
                  console.log('ok');
                },
                type: 'success',
              });
            }}
          >
            Ok
          </Button>,
        ]}
      >
        i am modal content
      </Modal>
    </div>
  );
};
