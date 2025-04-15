import { CommonType } from '../common/type';

export interface StickyClasses {
  rootClass: string;
  wrapper: string;
}

export interface StickyProps extends Pick<CommonType, 'className' | 'style'> {
  jssStyle?: {
    sticky: () => StickyClasses;
  };

  /**
   * @en Extend style. The default z-Index after triggering the float is 900, and you can modify the z-Index of the style to change.
   * @cn 扩展样式。触发浮动后的默认 zIndex 为900，修改 style的 zIndex 来改变。
   */
  style?: React.CSSProperties;
  /**
   * @en Offsets from the bottom.
   * @cn 距离底部多少偏移量触发
   */
  bottom?: number;

  /**
   * @deprecated use scrollContainer
   */
  target?: string | Element | null;

  /**
   * @en Custom attachment target. You can pass in HTMLElement or css selector. The target must be an ancestor node of the Sticky component
   * @cn 自定义附着的目标。可以传入 HTMLElement 或者 css selector，target 必须为 Sticky 组件的祖先节点
   */
  scrollContainer?: string | HTMLElement | null;

  /**
   * @cn sticky 父级元素, 当父元素离开视窗时，sticky 将失效
   * @en sticky parent, when the parent element leaves the viewport, the sticky will be invalid
   */
  parent?: HTMLElement | null;
  /**
   * @en Offsets from the top.
   * @cn 距离顶部多少偏移量触发
   */
  top?: number;

  /**
   * @en use css position:sticky while target is ordered
   * @cn 是否采用 css 方式实现附着效果
   * @default false
   */
  css?: boolean;
  /**
   * @en When the adsorption effect, trigger the callback，this method is invalid when native sticky is used
   * @cn 吸附效果时，触发该回调，当使用原生 sticky 时该方法无效
   */
  onChange?: (isSticky: boolean) => void;

  /**
   * @en children
   * @cn 子元素
   */
  children?: React.ReactNode;
}
