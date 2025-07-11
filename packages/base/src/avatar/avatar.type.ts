import React from 'react';
import { CommonType } from '../common/type';
import { PopoverClasses, PopoverProps } from '../popover/popover.type';

export interface AvatarClasses {
  wrapper: string;
  small: string;
  large: string;
  image: string;
  string: string;
  circle: string;
  square: string;
  icon: string;
  text: string;
  group: string;
  max: string;
  popover: string;
}

export interface AvatarProps extends Pick<CommonType, 'className' | 'style' | 'size'> {
  jssStyle?: {
    avatar: () => AvatarClasses;
  };
  /**
   * @en The alternative text for the image
   * @cn 图像无法显示时的替代文本
   */
  alt?: string;
  /**
   * @en The address of the image or the image element of the image class avatar
   * @cn 图片类头像的资源地址或者图片元素
   */
  src?: string | React.ReactNode;
  /**
   * @en Set the custom icon of the avatar
   * @cn 设置头像的自定义图标
   */
  icon?: React.ReactNode;
  /**
   * @en Specifies the shape of the avatar
   * @cn 指定头像的形状
   * @default 'circle'
   */
  children?: React.ReactNode;
  /**
   * @en The text content of the avatar, the scaling ratio will be calculated according to the content size
   * @cn 头像文本内容，会根据内容尺寸自适应计算缩放比例
   */
  shape?: 'circle' | 'square';
  /**
   * @en Set the responsive resource address of the image class avatar
   * @cn 设置图片类头像响应式资源地址
   */
  srcSet?: string;
  /**
   * @en The distance between the left and right edges of the character type in pixels
   * @cn 字符类型距离左右两侧边界单位像素
   */
  gap?: number;
  /**
   * @en Whether the image is allowed to be dragged
   * @cn 图片是否允许拖动
   * @default true
   */
  draggable?: boolean;
  /**
   * @en CORS attribute setting
   * @cn CORS 属性设置
   */
  crossOrigin?: 'anonymous' | 'use-credentials';
  /**
   * @en The event that the image fails to load, returning false will close the component's default fallback behavior
   * @cn 图片加载失败的事件，返回 false 会关闭组件默认的 fallback 行为
   */
  onError?: () => boolean;

  /**
   * @en The event that the avatar is clicked
   * @cn 头像点击事件
   */
  onClick?: () => void;
}
export interface AvatarGroupProps
  extends Pick<CommonType, 'className' | 'style' | 'size'>,
    Pick<AvatarProps, 'shape'> {
  jssStyle?: {
    avatar: () => AvatarClasses;
    popover: () => PopoverClasses;
  };
  /**
   * @en Set the maximum number of avatars displayed in the avatar group
   * @cn 设置头像组展示头像的最大数量
   */
  max?: number;
  /**
   * @en Custom rendering of hidden avatar nodes, hideAvatarNodes is an array of hidden node dom, max is the number of hidden nodes
   * @cn 自定义渲染隐藏的头像节点，hideAvatarNodes 为隐藏的节点 dom 数组，max 为隐藏的节点数量
   */
  renderMax?: (hideAvatarNodes: React.ReactNode[], max: number) => React.ReactNode;
  /**
   * @en Avatar node
   * @cn 头像节点
   */
  children: React.ReactNode;
  /**
   * @en The event that the image fails to load, returning false will close the component's default fallback behavior
   * @cn 用于展示隐藏头像的 Popover 相关配置，配置属性为 Popover 部分属性: position、zIndex、getPopupContainer、adjust
   */
  popover?: Pick<PopoverProps, 'position' | 'zIndex' | 'getPopupContainer' | 'adjust'>;
}
