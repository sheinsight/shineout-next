import React from 'react';
import { CommonType } from '../common/type';

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
   * @version 3.7.0
   */
  itemClassName?: string;
}
