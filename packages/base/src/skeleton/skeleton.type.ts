// import React from 'react';
// import { BaseSkeletonProps } from '@sheinx/hooks';
import { CommonType } from '../common/type';
import type { SemanticClassNames, SemanticStyles } from '../common/use-semantic';

/**
 * Skeleton Semantic DOM key 列表
 * - root:   最外层容器
 * - image:  图片/头像占位区
 * - text:   文本行区域
 * - button: 按钮占位区
 *
 * @see /docs/rfc/0001-semantic-dom.md
 */
export type SkeletonSemanticKey = 'root' | 'image' | 'text' | 'button';

export interface SkeletonClasses {
  rootClass: string;
  wrapper: string;
  content: string;
  animation: string;

  text: string;
  textItem: string;

  button: string;
  buttonItem: string;
  buttonLeft: string;
  buttonRight: string;
  buttonSmall: string;
  buttonLarge: string;

  image: string;
  imageLeft: string;
  imageRight: string;
  imageCircle: string;
  imageSquare: string;
  imageSmall: string;
  imageLarge: string;
}

export interface SkeletonTextProps {
  /**
   * 文本行数
   */
  rows?: number;
  /**
   * 文本宽度
   */
  width?: string | number | Array<string | number>;
  /**
   * 文本高度
   */
  height?: number | Array<number>;
  /**
   * 自定义className
   */
  className?: string;
  /**
   * 自定义style
   */
  style?: React.CSSProperties;
}

export interface SkeletonImageProps {
  /**
   * 图片位置
   */
  position?: 'left' | 'right';
  /**
   * 图片形状
   */
  shape?: 'circle' | 'square';
  /**
   * 图片大小，小尺寸-40px，默认-64px, 大尺寸-80px
   */
  size?: 'small' | 'default' | 'large';
  /**
   * 自定义className
   */
  className?: string;
  /**
   * 自定义style
   */
  style?: React.CSSProperties;
}

export interface SkeletonButtonProps {
  /**
   * 按钮位置
   */
  position?: 'left' | 'right';
  /**
   * 按钮数量
   */
  count?: number;
  /**
   * 按钮尺寸
   */
  size?: 'small' | 'default' | 'large';
  /**
   * 自定义className
   */
  className?: string;
  /**
   * 自定义style
   */
  style?: React.CSSProperties;
}

export interface SkeletonProps extends Pick<CommonType, 'className' | 'style'> {
  jssStyle?: {
    skeleton: () => SkeletonClasses;
  };

  /**
   * @en Semantic DOM classNames for internal nodes.
   * @cn 语义化 DOM 类名，用于定制内部节点样式。
   * @version 3.10.0
   */
  classNames?: SemanticClassNames<SkeletonSemanticKey>;

  /**
   * @en Semantic DOM styles for internal nodes.
   * @cn 语义化 DOM 行内样式，用于定制内部节点样式。
   * @version 3.10.0
   */
  styles?: SemanticStyles<SkeletonSemanticKey>;

  /**
   * @en Whether to enable animation effects
   * @cn 是否开启动画效果
   */
  animation?: boolean;

  /**
   * @en Whether to load, when true, show the skeleton screen
   * @cn 是否加载中，为true时，显示骨架屏
   */
  loading?: boolean;

  /**
   * @en Real content
   * @cn 真实内容
   */
  children?: React.ReactNode;

  /**
   * @en Whether to show text
   * @cn 是否显示文本或段落
   */
  text?: SkeletonTextProps | boolean;

  /**
   * @en Whether to show image
   * @cn 是否显示图片
   */
  image?: SkeletonImageProps | boolean;

  /**
   * @en Whether to show button
   * @cn 是否显示按钮
   */
  button?: SkeletonButtonProps | boolean;
}
