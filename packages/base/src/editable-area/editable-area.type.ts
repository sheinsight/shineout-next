import React from 'react';
import { TextareaClasses } from '../textarea/textarea.type';
import { CommonType } from '../common/type';
import { InnerTitleClasses } from '../common/use-inner-title';

export interface EditableAreaClasses {
  /**
   * 最外层class
   */
  wrapper: string;
  wrapperDisabled: string;
  wrapperNoBorder: string;
  wrapperError: string;
  wrapperSmall: string;
  wrapperLarge: string;
  wrapperPaddingBox: string;
  wrapperInnerTitle: string;
  wrapperInnerTitleTop: string;
  wrapperInnerTitleBottom: string;
  content: string;
  clear: string;

  place: string;
  placeholder: string;
  popup: string;
  popupShow: string;
}

export interface EditableAreaProps extends Pick<CommonType, 'className' | 'style' | 'status'> {
  jssStyle?: {
    editableArea: () => EditableAreaClasses;
    textarea?: () => TextareaClasses;
    innerTitle?: () => InnerTitleClasses;
  };

  beforeChange?: (value: string) => void | string;
  /**
   * @private 内部属性
   */
  error?: Error;
  /**
   * @en Whether to disable
   * @cn 是否禁用
   * @default false
   */
  disabled?: boolean;
  /**
   * @en Whether to show the clear button
   * @cn 是否展示清除按钮
   * @default true
   */
  clearable?: boolean;
  /**
   * @en The same as the native placeholder tag
   * @cn 同原生属性
   */
  placeholder?: string;
  /**
   * @en width of the editablearea
   * @cn 编辑域宽度
   */
  width?: number | string;

  /**
   * @en the maxHeight of the textarea, scroll bars appear after more than
   * @cn 输入框的最大高度, 超过之后会出现滚动条
   */
  maxHeight?: number | string;

  /**
   * @en blur event
   * @cn 失去焦点事件
   */
  onBlur?: (e: React.FocusEvent) => void;

  /**
   * @en focus event
   * @cn 聚焦事件
   */
  onFocus?: (e: React.FocusEvent) => void;

  /**
   * @en Custom Popover container, override the default behavior which is rendering under the body, () => DOMElement
   * @cn 自定义Popover容器，覆盖默认渲染在body下的行为, () => DOMElement
   */
  getPopupContainer?: () => HTMLElement;

  /**
   * @private 内部属性
   */
  onShowTextareaChange?: (value: boolean) => void;

  /**
   * @en Render textarea footer
   * @cn 渲染 textarea footer
   */
  renderFooter?: (value?: string) => React.ReactNode;

  /**
   * @en Customize display results
   * @cn 自定义显示结果
   */
  renderResult?: (value: string) => React.ReactNode;
  /**
   * @en Callback function when the value changes
   * @cn 值改变后的回调函数
   */
  onChange?: (value: string) => void;
  /**
   * @en The value passed in when controlled
   * @cn 受控
   */
  value?: string;
  /**
   * @en default value
   * @cn 默认值
   */
  defaultValue?: string;
  /**
   * @en When trim is true, blank characters are automatically deleted when lose focus
   * @cn trim 为 true 时，失去焦点时会自动删除空白字符
   */
  trim?: boolean;
  /**
   * @en Whether to show the border
   * @cn 是否显示外边框
   * @default false
   */
  bordered?: boolean;
  /**
   * @en User input triggers the onChange and to check interval, unit: ms
   * @cn 用户输入触发 onChange 和校验间隔时间，单位 毫秒
   */
  delay?: number;
  /**
   * @en inner title
   * @cn 内嵌标题
   */
  innerTitle?: React.ReactNode;
  /**
   * @en Placeholder title, which needs to be used together with innerTitle
   * @cn 占位标题，需要配合 innerTitle 一起使用
   */
  placeTitle?: React.ReactNode;
}
