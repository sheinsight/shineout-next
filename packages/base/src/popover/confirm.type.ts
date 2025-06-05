import React from 'react';
import { PopoverProps } from './popover.type';
import { ButtonProps } from '../button/button.type';
import { AlertProps } from '../alert/alert.type';

export type ButtonType = ButtonProps['type'];
export interface PopoverConfirmProps extends Omit<PopoverProps, 'type'> {
  /**
   * @en button text
   * @cn 按钮文字
   * @default { ok: 'Ok', cancel: 'Cancel' }
   */
  text?: {
    ok?: string;
    cancel?: string;
  };
  /**
   * @en ok button click callback, will close tooltip while returned promise resolve
   * @cn 点击确定按钮时触发事件，返回 Promise 时，会在 Promise resolve 后关闭 Tooltip
   */
  onOk?: () => void | Promise<any>;
  /**
   * @en cancel button click callback, will close tooltip while returned promise resolve
   * @cn 点击取消按钮时触发事件，返回 Promise 时，会在 Promise resolve 后关闭 Tooltip
   */
  onCancel?: () => void | Promise<any>;
  /**
   * @en ok button's type, same with [Button](/components/Button) type
   * @cn 确认按钮的类型，与 [Button](/components/Button) 类型相同
   * @default "danger"
   */
  okType?: ButtonType;
  /**
   * @en custom icon
   * @cn 自定义Icon
   */
  icon?: AlertProps['icon'];
  /**
   * @en Pop-up content.
   * @cn 弹出显示内容
   */
  children?: React.ReactNode;
  /**
   * @en same with [Alert](/components/Alert) type
   * @cn 类型同 [Alert](/components/Alert) type 属性
   * @default "confirmwarning"
   */
  type?: AlertProps['type'];
  /**
   * @en title
   * @cn 标题
   */
  title?: React.ReactNode;
}
