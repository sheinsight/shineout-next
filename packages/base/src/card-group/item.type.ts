import { ReactNode } from 'react';
import { CommonType } from '../common/type';
import { CardGroupJssStyle } from './card-group.type';
export interface CardGroupItemProps<Value> extends Pick<CommonType, 'className' | 'style'> {
  jssStyle?: CardGroupJssStyle;
  /**
   * @en lazy load placeholder, enable lazy load while set
   * @cn 懒加载占位元素，设置后卡片将开启懒加载
   *
   */
  placeholder?: ReactNode;

  /**
   * @en lazy load offset
   * @cn 懒加载偏移量，距离视口的距离即可视为进入视口中
   */
  lazyLoadOffset?: number;

  /**
   * @en checked status, hide while not set
   * @cn checked 表示选中状态，不设置则不显示选择框
   */
  checked?: boolean | undefined;

  /**
   * @en disable checkbox
   *
   * @cn 是否禁用选择框
   *
   * @default false
   */
  disabled?: boolean;

  /**
   * @en Specifies the result
   * @cn 选中时返回值
   * @default true
   * @override any
   */
  value?: Value;

  /**
   * @en check changed, value is the value props
   * @cn 选中状态变化事件，checked表示选中状态，value代表对应的值
   *
   */
  onChange?: (checked: boolean, value: Value) => void;

  /**
   * @en children
   * @cn 子元素
   */
  children?: ReactNode;
}
