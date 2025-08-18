import { ButtonClasses } from '../button/button.type';
import { SelectClasses } from '../select/select.type';
import { InputClasses } from '../input/input.type';
import { CommonType } from '../common/type';
// import { AbsoluteListProps } from '../absolute-list/absolute-list.type';
import { SelectProps as FullSelectProps } from '../select/select.type';

export type AlignType = 'left' | 'center' | 'right';

export type LayoutType = (
  | 'links'
  | 'list'
  | 'jumper'
  | 'simple'
  | ((props: PaginationProps) => React.ReactNode)
)[];

export interface PaginationJssStyle {
  input?: () => InputClasses;
  select?: () => SelectClasses;
  button?: () => ButtonClasses;
  pagination?: () => PaginationClasses;
}

export type SelectProps = Pick<
  FullSelectProps<any, any>,
  | 'absolute'
  | 'width'
  | 'height'
  | 'position'
  | 'optionWidth'
  | 'emptyText'
  | 'zIndex'
>;

export interface PaginationClasses {
  rootClass: string;
  pagination: string;
  section: string;
  buttons: string;
  left: string;
  right: string;
  center: string;
  jumper: string;
  split: string;
  icon: string;
  simple: string;
  small: string;
  large: string;
  sizeList: string;
  jumperInput: string;
  buttonItem: string;
}

export interface TextParams {
  prev?: string;
  next?: string;
  page?: string;
  jumper?: string;
}

export interface PaginationProps extends Pick<CommonType, 'style' | 'className' | 'size'> {
  /**
   * @en Align of pagination
   * @cn 排布方式
   * @default 'left'
   */
  align?: 'left' | 'center' | 'right';
  /**
   * @en Number of each page
   * @cn 每页数量
   * @default 10
   */
  pageSize?: number;
  /**
   * @en Total number. If total is less than 0, hide the Pagination
   * @cn 总条目数。如果 total 小于 0，隐藏分页
   * @default 0
   */
  total?: number;
  /**
   * @en Current page, if passed in, the component is a controlled component, you must handle the callback through onChange
   * @cn 当前页，如果传入值，组件为受控组件，必须通过 onChange 来处理回调
   */
  current?: number;
  /**
   * @en The number of pagination buttons
   * @cn 分页器页码按钮数量
   * @default 5
   */
  span?: number;
  /**
   * @en Initial page number
   * @cn 初始页码
   * @default 1
   */
  defaultCurrent?: number;
  /**
   * @en Disabled
   * @cn 禁用
   * @default false
   */
  disabled?: boolean;
  /**
   * @en The layout of child elements, options: "links": page number; "simple": simple page number(Do not use both simple and links); "list": page size selector; "jumper": jump to page number; "simple": minimalist mode; function({ current, total, pageSize }): custom information
   * @cn 子组件布局，可选值为:"links": 页码；"simple": 简约页码(和links不要同时使用)；"list": 每页数量选择。"jumper": 跳转页码；function({ current, total, pageSize }): 匿名函数，用来信息展示
   * @default ['links']
   */
  layout?: LayoutType;
  /**
   * @en The style of pagination
   * @cn 风格
   * @default 'text'
   */
  mode?: 'outline' | 'text';
  /**
   * @en The callback function when current page or pageSize is changing.current:new page number.pageSize: number of each page
   * @cn 页码或每页显示数量改变时回调。current: 新的页码。pageSize: 每页数量
   */
  onChange?: (current: number, pageSize: number, sizeChange?: boolean) => void;
  /**
   * @en The list of number of each page
   * @cn 每页数量可选列表
   * @default [10, 20, 30, 50, 100]
   */
  pageSizeList?: number[];
  /**
   * @en Replaced text。prev: the previous page.next: the next page.page:the text of pageSizeList.jumper: jump to input box text, "{input}" pilaceholder for input box
   * @cn 替换文案。prev: 上一页。next: 下一页。page: pageSizeList 文字。jumper: 跳转输入框文字, "{input}" 为输入框占位
   */
  text?: TextParams;
  /**
   * @en Whether to use simple mode
   * @cn 是否使用简约模式
   */
  simple?: boolean;
  jssStyle?: PaginationJssStyle;
  /**
   * @en Configuration related to the Select component in the pagination, properties same as Select component
   * @cn 分页器有关 Select 组件的配置，属性同 Select 组件
   * @version 3.4.4
   */
  select?: SelectProps;

  /**
   * @cn 旧版本的属性，新版本中使用 `select` 替代
   * @en Deprecated property, use `select` instead in the new version
   * @version 3.8.0
   * @deprecated
   */
  sizeListProps?: SelectProps;
}
