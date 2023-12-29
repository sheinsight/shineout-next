import type { UseMenuItemProps } from '@sheinx/hooks';
import { KeygenResult, KeygenType, ObjectKey } from '@sheinx/hooks';
import { CommonType } from '../common/type';

export type MenuMode = 'inline' | 'vertical' | 'horizontal' | 'vertical-auto';

export interface MenuClasses {
  wrapper: string;
  wrapperInline: string;
  wrapperVertical: string;
  wrapperHorizontal: string;
  wrapperHasExpand: string;
  wrapperHasOpen: string;
  root: string;
  children: string;
  item: string;
  itemActive: string;
  itemDisabled: string;
  itemOpen: string;
  itemInPath: string;
  itemHasChildren: string;
  itemContent: string;
  itemContentFront: string;
  itemContentBack: string;
  title: string;
  expand: string;
  expandFront: string;
  expandBack: string;
  expandHover: string;
  indent: string;

  scrollbar: string;
  scrollbarX: string;
  scrollbarY: string;
  scrollbarDragging: string;
  scrolbarHandler: string;
  scrollbox: string;
}

export type MenuJssStyle = {
  menu?: () => MenuClasses;
};
/**
 * @title Menu
 */
export interface MenuProps<DataItem, Key extends KeygenResult = KeygenResult>
  extends Pick<CommonType, 'className' | 'style'> {
  jssStyle?: MenuJssStyle;

  /**
   * @en style of menu
   * @cn 菜单样式
   * @default 'inline'
   */
  mode?: MenuMode;
  /**
   * @en Menu items data
   * @cn 需要渲染成菜单的数据
   * @default []
   * @override object[]
   */
  data?: DataItem[];

  /**
   * @en theme of menu
   * @cn 主题
   */
  theme?: 'dark';
  /**
   * @en menu height
   * @cn 菜单高度
   */
  height?: number | string;
  /**
   * @en expended menu
   * @cn 展开的菜单(受控)
   * @default []
   * @override (string | number)[]
   */
  openKeys?: Key[];
  /**
   * @en triangle expansion color
   * @cn 三角展开符颜色
   */
  caretColor?: string;

  /**
   * @en Front solid triangle expansion
   * @cn 前置实心三角展开符
   */
  frontCaret?: boolean;

  /**
   * @en indent of each level
   * @cn 每一层缩进宽度
   * @default 24
   */
  inlineIndent?: number;
  /**
   * @en menu item expandable if has children
   * @cn 如果 children 有设置则菜单项可展开
   * @default false
   */
  looseChildren?: boolean;
  /**
   * @inner 内部属性
   */
  toggleDuration?: number;
  /**
   * @en Key generator. When it is true, the data itself is used as the key equivalent to (d => d). When it is a function, use its return value. When it is a string，ues the value of the string. For example, 'id' is the same thing as (d) => d.id.
   * @cn 生成每一项key的辅助方法。为 true 时，以数据项本身作为key，相当于 (d => d)。为函数时，使用此函数返回值。为string时，使用这个string对应的数据值。如 'id'，相当于 (d => d.id)
   * @default true
   */
  keygen: KeygenType<DataItem>;
  /**
   * @en Initial expanded menu
   * @cn 初始展开的菜单;如果需要设置此值,则需要设置keygen,此值为一个包含key的数组
   * @default []
   * @override (string | number)[]
   */
  defaultOpenKeys?: Key[];
  /**
   * @en parent menu Selectable
   * @cn 父级菜单是否可选中
   * @default false
   */
  parentSelectable?: boolean;
  /**
   * @en The function will be called when the user clicks the menu item.
   * @cn 子菜单点击事件,参数为当条数据
   */
  onClick?: (data: DataItem) => void;

  /**
   * @en The item is actived when the active function return true.
   * @cn 验证是否激活,参数为对应的数据对象,返回true则代表该菜单激活
   */
  active?: (data: DataItem) => boolean;

  /**
   * @en Whether to be disabled
   * @cn 是否禁用选项
   * @default d => d.disabled
   */
  disabled?: (data: DataItem) => boolean;

  /**
   * @en front triangle expansion symbol type
   * @cn 前置三角展开符类型
   * @default 'solid'
   */
  frontCaretType?: 'hollow' | 'solid';

  /**
   * @en menu open change callback
   * @cn 菜单展开/收起回调
   */
  onOpenChange?: (keys: Key[]) => void;

  /**
   * @en the key of inject the link value of the submenu
   * @cn 需要注入子菜单的链接键值
   */
  linkKey?: ((d: DataItem) => string) | ObjectKey<DataItem>;

  /**
   * @en Element render mode. If it is a string, the corresponding value is taken as the display content; If it is a function, the result returned by the function is taken as the display content.
   * @cn 元素渲染方式,如果为字符串,则会以对应的值作为显示内容;如果为函数,则以函数返回的结果作为显示内容,函数参数为对应的数据对象
   * @default 'title'
   */
  renderItem?: ((data: DataItem, index: number) => React.ReactNode) | ObjectKey<DataItem>;
}

export interface MenuItemProps
  extends UseMenuItemProps,
    Pick<
      MenuProps<any, any>,
      | 'renderItem'
      | 'keygen'
      | 'linkKey'
      | 'frontCaret'
      | 'frontCaretType'
      | 'caretColor'
      | 'jssStyle'
      | 'inlineIndent'
    > {
  index: number;
  level: number;
}
