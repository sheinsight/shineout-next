import React from 'react';
import { CommonType } from '../common/type';
import type { SemanticClassNames, SemanticStyles } from '../common/use-semantic';

/**
 * Carousel Semantic DOM key 列表
 * - root:          最外层容器
 * - slider:        滑动区域
 * - item:          每个轮播项
 * - indicator:     指示器容器
 * - indicatorItem: 每个指示器元素（圆点/线/条）
 * - arrow:         箭头按钮
 *
 * @see /docs/rfc/0001-semantic-dom.md
 */
export type CarouselSemanticKey = 'root' | 'slider' | 'item' | 'indicator' | 'indicatorItem' | 'arrow';

/**
 * 传入函数式 `classNames` 时的状态快照。
 *
 * @version 3.10.0
 */
export interface CarouselClassNamesInfo {
  /**
   * @cn 当前指示器是否为激活状态
   * @en Whether the current indicator is active
   */
  active: boolean;
}

export interface CarouselClasses {
  rootClass: string;
  wrapper?: string;
  animationSlide?: string;
  animationFade?: string;
  animationSlideY?: string;
  directionForward?: string;
  directionBackward?: string;
  directionStop?: string;
  slider?: string;
  item?: string;
  itemCurrent?: string;
  itemPre?: string;
  arrowWrapper?: string;
  arrowHover?: string;
  arrowItem?: string;
  arrowLeft?: string;
  arrowRight?: string;
  indicatorWrapper?: string;
  indicatorCenter?: string;
  indicatorLeft?: string;
  indicatorRight?: string;
  indicatorOuter?: string;
  indicatorTypeCircle?: string;
  indicatorTypeNumber?: string;
  indicatorTypeLine?: string;
  indicatorTypeBar?: string;
  indicatorArrow?: string;
  indicatorNumber?: string;
  indicator?: string;
  indicatorActive?: string;
}

/**
 * @title Carousel
 */
export interface CarouselProps extends Pick<CommonType, 'className' | 'style'> {
  jssStyle?: {
    carousel: () => CarouselClasses;
  };

  /**
   * @en Semantic DOM classNames for internal nodes. `indicatorItem` supports functional form receiving `{ active }` state.
   * @cn 语义化 DOM 类名，用于定制内部节点样式。`indicatorItem` 支持函数形式接收 `{ active }` 状态。
   * @version 3.10.0
   */
  classNames?: SemanticClassNames<CarouselSemanticKey, CarouselClassNamesInfo>;

  /**
   * @en Semantic DOM styles for internal nodes.
   * @cn 语义化 DOM 行内样式，用于定制内部节点样式。
   * @version 3.10.0
   */
  styles?: SemanticStyles<CarouselSemanticKey>;

  /**
   * @en animation effects, options: \nslide - horizontal sliding\nslide-y - vertical sliding\nfade - fading
   * @cn 动画效果，可选值为 slide - 横向滑动 ，slide-y - 垂直滑动 ，fade - 淡入淡出
   * @default 'slide'
   */
  animation?: 'slide' | 'slide-y' | 'fade';

  /**
   * @en the position of indicator
   * @cn 指示标示位置
   * @default 'center'
   */
  indicatorPosition?: 'left' | 'center' | 'right' | 'outer';

  /**
   * @en the style of indicator, using function for custom styles
   * @cn 指示标示样式, 函数则可以自定义样式: (current, moveTo) => (<Component />)
   * @default 'circle'
   * @version 3.6.0 新增bar类型
   */
  indicatorType?:
    | ((current: number, moveTo: (index: number) => void) => React.ReactNode)
    | 'circle'
    | 'number'
    | 'line'
    | 'bar';

  /**
   * @en the interval of animation, When it is not 0, play automatically
   * @cn 动画间隔时间，为 0 时，不自动播放
   * @default 0
   */
  interval?: number;

  /**
   * @en move callback
   * @cn 轮播后的回调
   */
  onMove?: (
    current: number,
    extra: { prev: number; direction: 'forward' | 'backward'; moveTo: (n: number) => void },
  ) => void;

  /**
   * @en children
   * @cn 子元素
   *
   */
  children?: React.ReactNode;

  /**
   * @en When to show the switch trigger
   * @cn 切换箭头显示时机
   *
   */
  showArrow?: 'always' | 'hover';
  /**
   * @en Whether to show the indicator
   * @cn 是否展示指示器
   * @default true
   * @version 3.7.0
   *
   */
  showIndicator?: boolean;
  /**
   * @en The additional css class for arrow
   * @cn 箭头扩展 class
   */
  arrowClassName?: string;
  /**
   * @en The additional css class for carousel items
   * @cn 轮播项的 class
   */
  itemClassName?: string;

  /**
   * @en default current index
   * @cn 默认当前索引
   * @default 0
   * @version 3.9.0
   */
  defaultValue?: number;

  /**
   * @en current index
   * @cn 当前索引
   * @version 3.9.0
   */
  value?: number;

  /**
   * @en current index change callback
   * @cn 当前索引变化回调
   * @param current current index
   * @returns void
   * @version 3.9.0
   */
  onChange?: (current: number) => void;
}
