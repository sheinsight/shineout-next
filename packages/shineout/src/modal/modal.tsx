import React from 'react';
import { Modal, ModalMethods } from '@sheinx/base';
import { useModalStyle, useButtonStyle, useAlertStyle } from '@sheinx/shineout-style';
import { ModalProps } from './modal.type';

const jssStyle = {
  modal: useModalStyle,
  button: useButtonStyle,
  alert: useAlertStyle,
};

export const methods = {
  success: ModalMethods.type('success', jssStyle),
  info: ModalMethods.type('info', jssStyle),
  warn: ModalMethods.type('warning', jssStyle),
  error: ModalMethods.type('error', jssStyle),
  confirm: ModalMethods.type('confirm', jssStyle),
  show: ModalMethods.type('show', jssStyle),
  closeAll: ModalMethods.closeAll,
};

export default (props: ModalProps) => {
  return <Modal jssStyle={jssStyle} {...props} />;
};
