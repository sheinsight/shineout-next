import { CommonType } from '../common/type';
import type { SemanticClassNames, SemanticStyles } from '../common/use-semantic';

export type LinkType =  'primary' | 'secondary' | 'danger' | 'warning' | 'success'

/**
 * Link Semantic DOM key 列表
 * - root: 链接元素（a 标签）
 * - icon: 图标容器
 *
 * @see /docs/rfc/0001-semantic-dom.md
 */
export type LinkSemanticKey = 'root' | 'icon';

/**
 * 传入函数式 `classNames` 时的状态快照。
 *
 * @version 3.10.0
 */
export interface LinkClassNamesInfo {
  /**
   * @cn 是否禁用
   * @en Whether disabled
   */
  disabled: boolean;
}

export interface LinkClasses {
  rootClass: string;
  wrapper: string;
  underline: string;
  underlineHover: string;

  sizeSmall: string;
  sizeLarge: string;

  disabled: string;

  icon: string;

  primary: string;
  secondary: string;
  danger: string;
  warning: string;
  success: string;
}

export interface LinkProps
  extends Pick<CommonType, 'className' | 'style'>,
  React.AnchorHTMLAttributes<HTMLAnchorElement> {
    jssStyle?: {
        link?: () => LinkClasses;
    };

    /**
     * @en Semantic DOM classNames for internal nodes (root / icon).
     *     Accepts static strings or functions that receive a state snapshot.
     * @cn Semantic DOM 类名，可按 key 定制内部各节点（root / icon）。
     *     支持静态字符串或函数（接收状态快照）。
     * @version 3.10.0
     */
    classNames?: SemanticClassNames<LinkSemanticKey, LinkClassNamesInfo>;

    /**
     * @en Semantic DOM inline styles for internal nodes (root / icon).
     * @cn Semantic DOM 内联样式，按 key 定制内部各节点。
     * @version 3.10.0
     */
    styles?: SemanticStyles<LinkSemanticKey>;

    /**
     * @cn 链接地址
     * @en Link address
     */
    href?: string;

    /**
     * @cn 链接打开方式
     * @en Link target
     */
    target?: '_blank' | '_self' | '_parent' | '_top';

    /**
     * @cn 是否禁用
     * @en Whether the link is disabled
     */
    disabled?: boolean;

    /**
     * @cn 是否常驻显示下划线, 设置为 'hover' 时鼠标悬浮时显示下划线
     * @en Whether to always show the underline, set to 'hover' to show the underline when the mouse is hovered
     */
    underline?: boolean | 'hover';

    /**
     * @cn 链接类型
     * @en Link type
     * @default primary
     */
    type?: LinkType

    /**
     * @cn 链接图标大小
     * @en Link icon size
     * @default default
     */
    size?: 'small' | 'default' | 'large';

    /**
     * @cn 显示图标，设置为 true 时展示默认图标
     * @en Show icon, set to true to show default icon
     */
    icon?: boolean | React.ReactNode;
}
