import React from 'react';

export interface BaseCheckProps {
  /**
   * @en Checked status，will in control when pass
   * @cn 当前选中状态，checked 传入时为受控组件
   */
  checked?: boolean;
  /**
   * @en Default checked status
   * @cn 默认选中状态
   */
  defaultChecked?: boolean;
  /**
   * @en Change callback, Checked means selected status
   * @cn 改变回调,Checked 表示选中状态
   */
  onChange?: (checked: boolean, event: React.ChangeEvent) => void;
  /**
   * @en Click callback
   * @cn 勾选框点击回调
   */
  onClick?: (e: React.MouseEvent<HTMLInputElement>) => void;
  /**
   * @en Disable checkbox
   * @cn 是否禁用
   * @default false
   */
  disabled?: boolean;
  /**
   * @en Get input dom
   * @cn 获取input dom
   */
  inputRef?: React.Ref<HTMLInputElement>;
}
