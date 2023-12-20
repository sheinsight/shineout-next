import { ReactNode } from 'react';
import { ModalProps } from './modal.type';

/**
 * @title ModalMethods
 */
interface ModalFunctionExternalOptions {
  /**
   * @en Content body
   * @cn 提示内容主体
   */
  content?: ReactNode;

  /**
   * @en The event is triggered when the cancel button is clicked.
   * @cn 点击取消按钮时触发事件，仅在 confirm 方法中有效
   */
  onCancel?: () => void;

  /**
   * @en The event is triggered when the modal is closed.
   * @cn 关闭 Modal 时触发
   */
  onClose?: () => void;

  /**
   * @en The event is triggered when the ok button is clicked.
   * @cn 点击确定按钮时触发事件，返回 Promise 时，会在 Promise resolve 后关闭Modal
   */
  onOk?: () => void | Promise<any>;

  /**
   * @en The text of button
   * @cn 按钮文字
   * @default { ok: 'Ok', cancel: 'Cancel' }
   */
  text?: { ok?: string; cancel?: string };

  /**
   * @en auto focus button
   * @cn 默认聚焦的按钮
   */
  autoFocusButton?: 'ok' | 'cancel';
}
export interface ModalOptions
  extends ModalFunctionExternalOptions,
    Omit<ModalProps, 'destroy' | 'visible' | 'type'> {}
