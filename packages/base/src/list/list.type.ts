// import React from 'react';
import type { KeygenType, ObjectKey } from '@sheinx/hooks';
import { CommonType } from '../common/type';
import { PaginationProps, PaginationJssStyle } from '../pagination/pagination.type';
import { CheckboxClasses } from '../checkbox/checkbox.type';
import { SpinClasses } from '../spin/spin.type';
import { SelectClasses } from '../select/select.type';
import { EmptyClasses } from '../empty/empty.type';
import { ImageJssStyleType } from '../image/image.type';
import { BaseItemClasses } from './base-item.type';

export interface ListClasses extends BaseItemClasses {
  rootClass: string;
  wrapper: string;
  wrapperEmpty: string;
  wrapperBordered: string;
  wrapperStriped: string;
  wrapperSmall: string;
  wrapperLarge: string;
  scrollContainer: string;
  row: string;
  item: string;
  checkContent: string;
  pagination: string;
  loading: string;
  loadingBottom: string;
  empty: string;
  footer: string;
}

export interface listJssStyle extends PaginationJssStyle, ImageJssStyleType {
  list?: () => ListClasses;
  checkbox?: () => CheckboxClasses;
  select?: () => SelectClasses;
  spin?: () => SpinClasses;
  empty?: () => EmptyClasses;
}

export interface ListProps<DataItem, Value>
  extends Pick<CommonType, 'className' | 'style'>,
    ListSelectProps<DataItem, Value> {
  jssStyle?: listJssStyle;
  /**
   * @en Whether to display zebra shading.
   * @cn 是否显示交错斑马底纹
   */
  striped?: boolean;
  /**
   * @en pagination
   * @cn 分页展示, 详见 Pagination
   * @default PaginationProps
   */
  pagination?: PaginationProps;
  /**
   * @en item containter style
   * @cn 列表容器样式
   */
  itemStyle?: React.CSSProperties;
  /**
   * @en Multi-column display
   * @cn 多列展示
   * @default 1
   */
  colNum?: number;
  /**
   * @en render data
   * @cn 渲染数据
   * @override any[]
   */
  data: DataItem[];
  /**
   * @en Generate a auxiliary method for each key\nIf not filled, index will be used (not recommended, in some cases there may be problems)\nWhen it is a function, use its return value.\nWhen it is a string，ues the value of the string.For example, 'id' is the same thing as (d) => d.id .
   * @cn 生成每一项key的辅助方法\n为 true 时，以数据项本身作为 key，相当于 (d => d)\n为函数时，使用此函数返回值\n为 string 时，使用这个 string 对应的数据值。如 'id'，相当于 (d => d.id)
   */
  keygen: KeygenType<DataItem>;
  /**
   * @en render item
   * @cn 需要渲染成列表的数据
   */
  renderItem?: ObjectKey<DataItem> | ((d: DataItem, index: number) => React.ReactNode);
  /**
   * @en virtualized list
   * @cn 是否启用虚拟列表
   * @default false
   */
  fixed?: boolean;
  /**
   * @en list height
   * @cn 列表高度
   */
  height?: number;
  /**
   * @en show border
   * @cn 是否显示边框
   * @default false
   */
  bordered?: boolean;
  /**
   * @en height of item
   * @cn 列表项高度
   * @default 32
   */
  lineHeight?: number;
  /**
   * @en Number of list items displayed at the same time
   * @cn 同时展示的列表项数量
   * @default 10
   */
  rowsInView?: number;
  /**
   * @en What to display when no data
   * @cn 无数据时展示的内容
   */
  empty?: string | React.ReactNode;
  /**
   * @en Triggered when scrolling to the bottom
   * @cn 滚动到底部时触发
   */
  scrollLoading?: () => void;
  /**
   * @en size
   * @cn 尺寸
   * @default 'default'
   * @override union
   */
  size?: CommonType['size'];
  /**
   * @en loading
   * @cn 加载中
   * @default false
   */
  loading?: boolean | React.ReactNode;

  /**
   * @en The position of the loading icon
   * @cn loading 图标位置， 如果设置了fixed=true，则bottom位置无效
   * @default 'center'
   * @version 3.7.0
   */
  loadingPosition?: 'center' | 'bottom';

  /**
   * @en The content at the bottom
   * @cn 底部内容
   */
  footer?: (() => React.ReactNode) | React.ReactNode;
  /**
   * @en custom row className
   * @cn 自定义行 className
   */
  rowClassName?: ((rowData: DataItem, index: number) => string | undefined) | string;
}

export interface ListSelectProps<DataItem, Value> {
  /**
   * @en The current selected value.
   * @cn 当前选中值，格式和 onChange 返回值一致
   * @override any[]
   */
  value?: Value;
  /**
   * @en Select the row ,rowData is the selected data, rowIndex is the selected row number. If the data needs to be formatted, it is recommended to configure format
   * @cn 选择行。rowData 为选中的数据，rowIndex 为选中行号。如果需要数据需要格式化的处理，建议配置 format。
   */
  onChange?: (value: Value, data: DataItem, checked: boolean) => void;
  /**
   * @en By default, the result of the format function is used to compare whether it matches. In some cases (for example, whe an object that returns the original data is updated, an different option with the same value  is generated), the prediction function needs to be used to determine whether match
   * @cn 默认使用 format 函数执行的结果来比较是否匹配，在某些情况下（例如返回原始数据的对象，更新数据时，生成了一个值相同，非同一个对象的选项），需要借助 prediction 函数来判断是否匹配
   * @default (val, d) => val===format(d)
   */
  prediction?: (value: Value extends (infer U)[] ? U : Value, data: DataItem) => boolean;
  /**
   * @en When the value is true, disabled all checkboxes; When the value is function, disable the checkbox that this function returns true.
   * @cn 如果 disabled 为 true，禁用全部选项，如果 disabled 为函数，根据函数反回结果禁用选项
   * @default false
   * @override ((data: Item) => boolean) | boolean
   */
  disabled?: ((data: DataItem, ...rest: any) => boolean) | boolean;

  /**
   * @en Format value. The defaule value is return the original data. When it is a string, the value is fetched from the original data as a key equivalent to (d) => d\\[format] When it is a function, use its return value.
   * @cn 格式化 value, 默认值，返回原始数据。 为 string 时，会作为 key 从原始数据中获取值，相当于 (d) => d\\[format]; 为函数时，以函数返回结果作为 value。
   * @default d => d
   */
  format?: ObjectKey<DataItem> | ((data: DataItem) => Value extends (infer U)[] ? U : Value);
}
