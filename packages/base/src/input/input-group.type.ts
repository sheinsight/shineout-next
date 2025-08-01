import * as React from 'react';
import { ReactNode } from 'react';
import { InputStyle } from './input.type';
import { CommonType } from '../common/type';

export interface InputGroupProps extends Pick<CommonType, 'status' | 'style' | 'size'> {
  /**
   * @en Custom CSS class name for styling the input group
   * @cn 用于设置输入组样式的自定义 CSS 类名
   * @when For custom styling or theme overrides
   */
  className?: string;
  /**
   * @en Input components or other elements to group together
   * @cn 要组合在一起的输入组件或其他元素
   * @when For combining multiple inputs into a single visual unit
   */
  children?: ReactNode;
  /**
   * @en Total width of the input group
   * @cn 输入组的总宽度
   * @when To set fixed width for the entire group
   */
  width?: string | number;
  /**
   * @en Disables all inputs within the group
   * @cn 禁用组内的所有输入框
   * @when For read-only display or conditional editing of the entire group
   */
  disabled?: boolean;
  jssStyle: InputStyle;
  /**
   * @cn 错误信息
   * @en error message
   * @private 内部属性
   */
  error?: string | { message?: string };
  /**
   * @en Callback fired when any input in the group loses focus
   * @cn 组内任何输入框失去焦点时触发的回调
   * @when For group-level validation or state management
   */
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  /**
   * @en Controls border style between adjacent inputs. When false (default), adjacent input borders are merged. When true, each input keeps its own complete border
   * @cn 控制相邻输入框之间的边框样式。为 false（默认）时，相邻输入框的边框会合并。为 true 时，每个输入框保持独立的完整边框
   * @default false
   * @version 3.7.0
   * @when For distinct visual separation between grouped inputs
   */
  separate?: boolean;
  /**
   * @en Controls border style between adjacent inputs (deprecated: typo)
   * @cn 控制相邻输入框之间的边框样式（已弃用：拼写错误）
   * @default false
   * @version 3.6.0
   * @deprecated Use 'separate' instead, 'seperate' is a typo and will be removed in future versions
   */
  seperate?: boolean;
}
