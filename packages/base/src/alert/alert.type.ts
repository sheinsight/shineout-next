import { CommonType } from '../common/type';
import type { SemanticClassNames, SemanticStyles } from '../common/use-semantic';

/**
 * Alert Semantic DOM key 列表
 * - root:    最外层容器
 * - icon:    图标区域
 * - title:   标题
 * - content: 内容文本区
 * - close:   关闭按钮
 *
 * @see /docs/rfc/0001-semantic-dom.md
 */
export type AlertSemanticKey = 'root' | 'icon' | 'title' | 'content' | 'close';

/**
 * 传入函数式 `classNames` 时的状态快照。
 *
 * @version 3.10.0
 */
export interface AlertClassNamesInfo {
  /**
   * @cn Alert 当前的类型
   * @en Alert type
   */
  type: 'success' | 'info' | 'warning' | 'danger';
}

export interface AlertClasses {
  rootClass: string;
  alert: string;
  title: string;
  close: string;
  withTitle: string;
  content: string;
  icon: string;
  text: string;
  info: string;
  success: string;
  warning: string;
  confirmwarning: string;
  danger: string;
  infoIcon: string;
  successIcon: string;
  warningIcon: string;
  confirmwarningIcon: string;
  dangerIcon: string;
  confirmIcon: string;
  pending: string;
  noBordered: string;
  noChildren: string;
  closeWrapper: string
}

export interface AlertJssStyle {
  alert?: () => AlertClasses;
}

export type AlertType = 'success' | 'info' | 'warning' | 'danger' | 'confirmwarning' | 'error';

export interface AlertProps extends Pick<CommonType, 'className' | 'style'> {
  jssStyle?: AlertJssStyle;
  /**
   * @en Alert type
   * @cn 类型
   * @default 'warning
   */
  type?: AlertType;
  /**
   * @en Custom close button
   * @cn 自定义关闭按钮
   */
  closeItem?: React.ReactNode;
  /**
   * @deprecated 即将废弃，同时 onClose 属性即将不再支持 boolean 值，请使用 closable 控制是否显示关闭按钮
   */
  hideClose?: boolean;
  /**
   * @en When the type is true, the status icon is displayed according to the type property. If you need to display a custom icon, pass in ReactElement
   * @cn 为 true 时，根据 type 属性显示状态图标。如果需要显示自定义图标，传入 ReactElement
   */
  icon?: React.ReactNode | boolean;
  /**
   * @en The size for icon
   * @cn icon 的尺寸
   * @default 14
   */
  iconSize?: number;

  /**
   * @en The ClassName of the icon
   * @cn 图标类名
   */
  iconClassName?: string;

  /**
   * @en The title of the alert
   * @cn 标题模式
   */
  title?: React.ReactNode;

  /**
   * @en The style of the title
   * @cn 标题样式
   * @private
   */
  titleStyle?: React.CSSProperties;

  /**
   * @en The className of the title
   * @cn 标题类名
   */
  titleClassName?: string;

  /**
   * @en Whether to display the close button, when set to only, only the close button is displayed
   * @cn 是否可以关闭Alert，当设置为only的时候，点击按钮不会自动隐藏Alert
   */
  closable?: boolean | 'only';

  /**
   * @cn 关闭事件
   * @en Close event
   * @description onClose 属性即将不再支持 boolean 值，请使用 closable 控制是否显示关闭按钮
   */
  onClose?: (e: React.MouseEvent<HTMLDivElement>) => void;
  /**
   * @en Whether to display the border
   * @cn 是否显示边框
   * @default true
   */
  bordered?: boolean;
  /**
   * @en Content, text or react component
   * @cn 内容，文字或 react 组件
   */
  children?: React.ReactNode;

  /**
   * @en Semantic DOM classNames for internal nodes (root / icon / title / content / close).
   *     Accepts a static string or a function receiving a state snapshot.
   * @cn 语义化 DOM 类名，可精准定制内部节点（root / icon / title / content / close）。
   *     值可为静态字符串或接收状态快照的函数。
   * @version 3.10.0
   */
  classNames?: SemanticClassNames<AlertSemanticKey, AlertClassNamesInfo>;

  /**
   * @en Semantic DOM inline styles for internal nodes (root / icon / title / content / close).
   * @cn 语义化 DOM 内联样式，可精准定制内部节点（root / icon / title / content / close）。
   * @version 3.10.0
   */
  styles?: SemanticStyles<AlertSemanticKey>;
}
