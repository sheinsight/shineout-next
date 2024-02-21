import React from 'react';

export interface BaseCheckProps {
  /**
   * @en checked status，will in control when pass
   * @cn 当前选中状态，checked 传入时为受控组件
   */
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean, event: React.ChangeEvent) => void;
  /**
   * @en click callback
   * @cn 点击回调
   */
  onClick?: (e: React.MouseEvent<HTMLInputElement>) => void;
  /**
   * @en disable checkbox
   * @cn 是否禁用
   * @default false
   */
  disabled?: boolean;
  /**
   * @private 内部属性
   */
  inputRef?: React.Ref<HTMLInputElement>;
}
