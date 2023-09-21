// import React from 'react';
import { CommonType } from '../common/type';
import { AbsoluteListProps } from '../absolute-list/absolute-list.type';

export type DateTimeType = Date | number | string | undefined;

export type DatePickerValue = DateTimeType | DateTimeType[];

export interface DatePickerClasses {
  /**
   * 最外层class
   */
  wrapper: string;
  wrapperFocus: string;
  wrapperDisabled: string;
  wrapperError: string;
  wrapperNoBorder: string;
  wrapperRange: string;
  paddingBox: string;
  result: string;
  resultAlignRight: string;
  resultAlignLeft: string;
  resultAlignCenter: string;
  resultTextWrapper: string;
  resultText: string;
  resultSeparator: string;
  placeholder: string;
  icon: string;
  clear: string;

  // 选择器
  pickerWrapper: string;
  pickerWrapperOpen: string;
  pickerBox: string;
  picker: string;
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
  timeBase: string;
  timeBaseItem: string;
}

export type DisabledType = 'start' | 'end';

export interface DatePickerProps<Value extends DatePickerValue>
  extends Pick<CommonType, 'className' | 'style' | 'size' | 'status'>,
    Pick<AbsoluteListProps, 'absolute' | 'zIndex'> {
  jssStyle?: {
    datePicker: DatePickerClasses;
  };
  /**
   * @en When the value is true, disabled all options; When the value is function, disable the options that this function returns true.
   * @cn 如果 disabled 为 true，禁用全部选项，如果 disabled 为函数，根据函数反回结果禁用选项
   * @default false
   */
  disabled?: ((date: Date, type?: DisabledType, value0?: Date, value1?: Date) => boolean) | boolean;
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
  position?: 'left-top' | 'left-bottom' | 'right-top' | 'right-bottom';
  /**
   * @en type of datepicker
   * @cn 时间类型
   * @default 'date'
   */
  type?: 'date' | 'time' | 'datetime' | 'month' | 'week' | 'quarter' | 'year';
  format?: string;
  /**
   * @en range span，unit: **second**，When it is true, selection scope is not limited.
   * @cn 范围跨度，单位 **秒**，为 true 时表示不限制选择范围。
   */
  range?: boolean | number;
  value?: Value;
  defaultValue?: Value;
  // todo quickSelect
  onChange?: (value: Value extends any[] ? string[] : string) => void;
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
   * @deprecated
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
  defaultTime?: DatePickerValue;
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
}
