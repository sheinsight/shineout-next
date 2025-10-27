import React from 'react';
import { CommonType } from '../common/type';
import { ButtonJssStyle } from '../button/button.type';
import { AlertJssStyle } from '../alert/alert.type';
import { SpinStyle } from '../spin/spin.type';

export type Methods = 'success' | 'info' | 'warning' | 'error' | 'confirm' | 'normal';

export interface ModalClasses {
  rootClass: string;
  wrapper: string;
  wrapperShow: string;
  wrapperHide: string;
  wrapperFullScreen: string;
  wrapperMoveable: string;
  wrapperAnimation: string;
  wrapperZoom: string;
  wrapperIsMask: string;
  wrapperHideMask: string;
  wrapperDrawer: string;
  wrapperDrawerLeft: string;
  wrapperDrawerRight: string;
  wrapperDrawerTop: string;
  wrapperDrawerBottom: string;

  mask: string;
  panel: string;
  header: string;

  headerIcon: string;
  emptyIcon: string;
  headerTitle: string;
  headerClose: string;
  emptyClose: string;
  body: string;
  bodyWithIcon: string;
  footer: string;
  resizeX: string;
  resizeY: string;
  resizeXY: string;
}

export interface ModalJssStyle extends ButtonJssStyle, AlertJssStyle, SpinStyle {
  modal?: () => ModalClasses;
}

export interface ModalProps extends Pick<CommonType, 'className' | 'style'> {
  jssStyle?: ModalJssStyle;

  /**
   * @en Whether to hide mask
   * @cn 是否隐藏遮罩
   * @default false
   */
  hideMask?: boolean;
  /**
   * @en Whether to force the mask transparency (in multi-layer Modal, the transparency of other Modal masks except the first layer will be adjusted to 0.01)
   * @cn 是否强制设置遮罩透明度（多层Modal中，除第一层外的其他弹出层遮罩透明度会被调整为0.01）
   * @default false
   */
  forceMask?: boolean;

  /**
   * @en Distance from top
   * @cn 弹框距离顶部距离
   * @default 10vh
   */
  top?: number | string;

  /**
   * @en display with full screen
   * @cn 是否全屏展示
   * @default false
   */
  fullScreen?: boolean;

  /**
   * @en Extend pop-up body style
   * @cn 扩展弹出层 body 的样式
   */
  bodyStyle?: React.CSSProperties;

  /**
   * @en Extend pop-up header style
   * @cn 扩展弹出层 header 的样式
   * @version 3.9.0
   */
  headerStyle?: React.CSSProperties;

  /**
   * @en Extend pop-up footer style
   * @cn 扩展弹出层 footer 的样式
   * @version 3.9.0
   */
  footerStyle?: React.CSSProperties;

  /**
   * @en The content at the bottom
   * @cn 底部内容
   */
  footer?: React.ReactNode;

  /**
   * @en Whether to close the mask when the mask is clicked
   * @cn 点击遮罩层是否关闭对话框, 设置为 null 右上角关闭图标会保留
   * @default true
   */
  maskCloseAble?: null | boolean;

  /**
   * @deprecated use maskBackground
   */
  maskOpacity?: number;

  /**
   * @en Padding style of the content
   * @cn 内容内边距
   */
  padding?: number | string;

  /**
   * @en Pop-up position
   * @cn 弹出位置
   */
  position?: 'top' | 'right' | 'bottom' | 'left';

  /**
   * @en the title of the pop-up layer
   * @cn 弹出层的标题
   */
  title?: React.ReactNode;

  /**
   * @en visible
   * @cn 是否显示
   * @default false
   */
  visible?: boolean;

  /**
   * @en the width of the pop-up (not work after setting position)
   * @cn 弹出层宽度 （设置 position 后无效）
   * @default 500
   */
  width?: number | string;
  /**
   * @en the height of the Modal (not work after setting position)
   * @cn 对话框高度 （设置 position 后无效）
   */
  height?: string | number;

  /**
   * @en pop-up z-index
   * @cn 弹出层 z-index 值，注意：如果嵌套 Select 组件，并且 Select 组件含有 absolute 字段，需要修改 Select 的 z-index 的值
   * @default 1050
   */
  zIndex?: number;

  /**
   * @en the root element of pop-up, the mask parent element
   * @cn 弹出层的根元素类名, 为遮罩层的父元素
   */
  rootClassName?: string;

  /**
   * @en target container element
   * @cn 渲染的目标节点位置
   * @default document.body
   */
  container?: (() => HTMLElement | null) | HTMLElement | null;


  /**
   * @cn 渲染的目标节点的className
   * @en the className of target container element
   * @version 3.8.0
   */
  containerClassName?: string

  /**
   * @en pop-up support move
   * @cn 是否可移动
   * @default false
   */
  moveable?: boolean;

  /**
   * @en mask background
   * @cn 遮罩背景色，设置后透明度将失效
   */
  maskBackground?: string;

  /**
   * @en pop-up close callback
   * @cn 弹出层关闭回调
   */
  onClose?: () => void;

  /**
   * @en Whether to destroy elements when it is closed
   * @cn 关闭时是否销毁元素
   * @default false
   */
  destroy?: boolean;

  /**
   * @en hide the close button
   * @cn 是否隐藏关闭按钮
   */
  hideClose?: boolean;

  /**
   * @en pop-up Title show status icon
   * @cn 弹出层 title 显示状态 icon，drawer模式下需配合title使用
   */
  type?: 'success' | 'info' | 'warning' | 'error';

  /**
   * @en toggle zoom animation
   * @cn 是否开启 zoom 动画效果
   * @default false
   */
  zoom?: boolean;

  /**
   * @en press 'esc' to close
   * @cn 是否支持 esc 键关闭
   * @default true
   */
  esc?: boolean;

  /**
   * @en events list of container element
   * @cn 外层元素所接受的事件列表，可用于在 createPortal 场景中阻止冒泡
   * @default {}
   */
  events?: object;

  /**
   * @en can resize
   * @cn 是否可调整大小
   * @default false
   */
  resizable?: boolean;

  /**
   * @en pop-up children
   * @cn 弹出层内容
   */
  children?: React.ReactNode;

  /**
   * @en In multi-layer nesting, the parent automatically offsets to avoid being blocked (only left/right positions take effect)
   * @cn 多层嵌套时，父级自动偏移避免被遮挡（仅 left/right 位置生效）
   * @default false
   * @version 3.9.0
   */
  cascade?: boolean | { width?: number };
}
