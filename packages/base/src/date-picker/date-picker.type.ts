import React from 'react';
import { CommonType } from '../common/type';
import { AbsoluteListProps } from '../absolute-list/absolute-list.type';
import { ButtonClasses } from '../button/button.type';
import { InnerTitleClasses } from '../common/use-inner-title';
import { BaseTipProps } from '../common/use-tip';
import { PopoverClasses } from '../popover/popover.type';

import type { DatePickerValueType, DateTimeType } from '@sheinx/hooks';

export type { DateTimeType, DatePickerValueType, DatePickerModeType } from '@sheinx/hooks';
export type AreaType = 'year' | 'month' | 'week' | 'day' | 'time' | 'quick' | 'quarter';

export interface DatePickerClasses {
  /**
   * 最外层class
   */
  wrapper: string;
  wrapperSmall: string;
  wrapperLarge: string;
  wrapperFocus: string;
  wrapperDisabled: string;
  wrapperError: string;
  wrapperNoBorder: string;
  wrapperUnderline: string;
  wrapperRange: string;
  wrapperInnerTitle: string;
  wrapperInnerTitleTop: string;
  wrapperInnerTitleBottom: string;
  wrapperPaddingBox: string;
  result: string;
  resultWrapper: string;
  resultAlignRight: string;
  resultAlignLeft: string;
  resultAlignCenter: string;
  resultTextWrapper: string;
  resultText: string;
  resultTextPadding: string;
  resultTextBg: string;
  resultTextActive: string;
  resultTextDisabled: string;
  resultSeparator: string;
  placeholder: string;
  icon: string;
  clear: string;

  // 选择器
  pickerWrapper: string;
  pickerWrapperOpen: string;
  pickerBox: string;
  picker: string;
  pickerTitle: string;
  pickerHeader: string;
  pickerHeaderLeft: string;
  pickerHeaderRight: string;
  pickerHeaderMid: string;
  pickerHeaderIcon: string;
  pickerHeaderInfo: string;
  pickerBody: string;
  pickerRow: string;
  pickerRowWeek: string;
  pickerCell: string;
  pickerCellContent: string;
  pickerCellActive: string;
  pickerCellDisabled: string;
  pickerCellToday: string;
  pickerCellBound: string;
  pickerCellInRange: string;
  pickerCellInRangeStart: string;
  pickerCellInRangeEnd: string;

  pickerFooter: string;
  pickerFooterBtn: string;
  pickerFooterLeft: string;
  pickerFooterRight: string;

  // 日
  dayPicker: string;
  weekPicker: string;
  // 年
  yearPicker: string;
  // 月
  monthPicker: string;
  quarterPicker: string;

  // 时间
  timePicker: string;
  timeList: string;
  timeItem: string;
  timeItemActive: string;
  timeItemDisabled: string;
  timeItemBox: string;
  // timeBase: string;
  // timeBaseItem: string;

  datetime: string;
  datetimeHide: string;

  // 快速选择
  quickPicker: string;
  quickPickerItem: string;
  quickPickerActiveItem: string;
}

export type DisabledType = 'start' | 'end';

interface DatePickerJssStyle {
  datePicker?: () => DatePickerClasses;
  button?: () => ButtonClasses;
  innerTitle?: () => InnerTitleClasses;
  popover?: () => PopoverClasses;
}

export interface DatePickerProps<Value extends DatePickerValueType>
  extends Pick<CommonType, 'className' | 'style' | 'size' | 'status' | 'innerTitle' | 'placeTitle'>,
    Pick<AbsoluteListProps, 'absolute' | 'zIndex'>,
    BaseTipProps {
  jssStyle?: DatePickerJssStyle;

  /**
   * @en extra children
   * @cn 额外渲染的节点
   */
  children?: React.ReactNode;

  /**
   * @en When the value is true, disabled all options; When the value is function, disable the options that this function returns true.
   * @cn 如果 disabled 为 true，禁用全部选项，如果 disabled 为函数，根据函数反回结果禁用选项
   * @default false
   */
  disabled?:
    | ((date: Date, type?: DisabledType, value0?: Date, value1?: Date) => boolean)
    | boolean
    | Array<boolean | ((date: Date) => boolean)>;
  /**
   * @en Disable the specified Time.
   * @cn 禁用指定 Time。
   */
  disabledTime?: string | ((time: string) => boolean);

  /**
   * @en Set visible of datepicker popup
   * @cn 控制浮层显隐
   */
  open?: boolean;

  /**
   * @en option list collapse callback
   * @cn 下拉列表展开/收起回调
   */
  onCollapse?: (collapse: boolean) => void;
  /**
   * @en Horizontal align of the value
   * @cn 值水平排布方式
   * @default 'center'
   */
  align?: 'left' | 'right' | 'center';
  /**
   * @en Set the default time zone, the format is /^([+-]\\d{2})$/ Support '-12' to '+13'
   * @cn 设置默认时区,格式为/^([+-]\\d{2})$/ 支持 '-12' 到 '+13'
   */
  timeZone?: string;
  /**
   * @en Set Position can control the different position of DatePicker
   * @cn 弹出框位置
   */
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  /**
   * @en type of datepicker
   * @cn 时间类型
   * @default 'date'
   */
  type?: 'date' | 'time' | 'datetime' | 'month' | 'week' | 'quarter' | 'year';
  /**
   * @en default values for different types: 'date': 'YYYY-MM-DD'; 'time': 'HH:mm:ss'; 'week': 'GGGG WW'; 'month': 'YYYY-MM'; 'week': 'GGGG WW'; 'quarter': 'YYYY-\\[Q]Q'; 'year': 'YYYY'; 'datetime': 'YYYY-MM-DD HH:mm:ss'
   * @cn 不同type对应的默认值。'date': 'YYYY-MM-DD'; 'time': 'HH:mm:ss'; 'week': 'GGGG WW'; 'month': 'YYYY-MM'; 'quarter': 'YYYY-\\[Q]Q';  'year': 'YYYY'; 'datetime': 'YYYY-MM-DD HH:mm:ss'
   */
  format?: string;

  /**
   * @en Format the selected time
   * @cn 对选中时间进行格式化
   * @default props.format
   */
  formatResult?: string | ((date: Date) => string);
  /**
   * @en Range span，unit: second，When it is true, selection scope is not limited
   * @cn 范围跨度，单位 秒，为 true 时表示不限制选择范围
   */
  range?: boolean | number;
  /**
   * @en When the value is string, it needs to match the format attribute.When the range property is true, the value is an array of length 2
   * @cn 值为 string 时，需要和 format 属性匹配。非 string 会格式化为 string。range 属性为 true 时，值为长度为2的数组
   */
  value?: Value;
  /**
   * @en Default value
   * @cn 默认值  和 value 类型相同
   */
  defaultValue?: Value;
  /**
   * @en A callback when the value is changing
   * @cn 值改变回调函数
   */
  onChange?: (value: Value extends any[] ? string[] : string) => void;
  /**
   * @en The callback before the value is changed, when the return value is not empty, it will be used as the new value of the component
   * @cn 值改变前的回调，当返回值不为空时将作为组件的新值
   */
  beforeChange?: (
    value: Value extends any[] ? string[] : string,
  ) => (Value extends any[] ? string[] : string) | undefined | void;
  /**
   * @en If clearable is true, show clear value icon
   * @cn  是否显示清除数据图标
   * @default true
   */
  clearable?: boolean;
  /**
   * @en onChange get undefined while clear
   * @cn 清空值时抛出 undefined
   * @default false
   */
  clearWithUndefined?: boolean;
  /**
   * @en allow single select, only in range can set
   * @cn 是否允许单选, 仅在 range 模式下有效
   * @default false
   */
  allowSingle?: boolean;
  /**
   * @cn 是否展示边框
   * @en Whether to display border
   * @default true
   */
  border?: boolean;
  /**
   * @deprecated
   * @en use defaultPickerValue instead
   * @cn 使用 defaultPickerValue 代替
   */
  defaultRangeMonth?: Array<DateTimeType>;

  /**
   * @en default date of panel，work under has no value
   * @cn 面板默认时间，在未选择日期时生效
   */
  defaultPickerValue?: DateTimeType | DateTimeType[];
  /**
   * @en placeholder text. When the range property is not empty, it is an array of length 2.
   * @cn 占位文字。range 属性不为空时，为长度为2的数组
   */
  placeholder?: string | string[];
  /**
   * @en Default time when selecting a date, the format is: 'HH:mm:ss'
   * @cn 选择日期时默认的时间, 格式为: 'HH:mm:ss'
   */
  defaultTime?: DatePickerValueType;
  /**
   * @en option min value
   * @cn 可选最小值
   */
  min?: DateTimeType;

  /**
   * @en option max value
   * @cn 可选最大值
   */
  max?: DateTimeType;
  /**
   * @en hour step
   * @cn 小时选项步长
   */
  hourStep?: number;

  /**
   * @en minute step
   * @cn 分钟选项步长
   */
  minuteStep?: number;

  /**
   * @en second step
   * @cn 秒选项步长
   */
  secondStep?: number;
  /**
   * @en quick select, only in range can set, name: tip, value: range date
   * @cn 快速选择, 仅在 range 模式下有效, name: 文字提示, value: 时间范围
   * @override {name: string, value: Value}[]
   */
  quickSelect?: Array<QuickSelectType>;
  /**
   * @en quick select, only in range can set, name: tip, value: range date
   * @cn 是否展示今天或者此刻按钮
   */
  showSelNow?: boolean;
  /**
   * @en Allow enter something into DatePicker
   * @cn 可输入
   * @default false
   */
  inputable?: boolean;
  /**
   * @en value onchange callback (every type of date)
   * @cn 值改变回调，有别于 onChange, onPickerChange会在每项值改变的时候执行
   */
  onPickerChange?: (
    value: DatePickerValueType,
    quickSelectItem: QuickSelectType | void | undefined,
    areaType: AreaType,
  ) => void;

  /**
   * @en blur event callback
   * @cn blur 事件回调
   */
  onBlur?: (e: any) => void;
  /**
   * @en focus event callback
   * @cn focus 事件回调
   */
  onFocus?: (e: any) => void;
  /**
   * @en only display border bottom
   * @cn 是否只展示下边框
   * @default false
   */
  underline?: boolean;
  /**
   * @cn 自定义宽度
   * @en custom width
   */
  width?: number | string;

  /**
   * @en Whether to adjust the position of the panel automatically. When the panel is blocked by the window, the position is adjusted automatically
   * @cn 是否开启自动调整面板位置功能。当面板被窗口遮挡时，自动调整位置
   * @default true
   */
  adjust?: boolean;
}
export interface QuickSelectType {
  name: React.ReactNode;
  value: DatePickerValueType | (() => DatePickerValueType);
}
