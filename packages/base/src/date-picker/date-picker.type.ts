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
  wrapperRange: string;
  paddingBox: string;
  pickerBox: string;
  picker: string;
  pickerOpen: string;
  result: string;
  resultAlignRight: string;
  resultAlignLeft: string;
  resultAlignCenter: string;
  resultTextWrapper: string;
  resultText: string;
  resultSeparator: string;
  icon: string;
  clear: string;

  // 日
  dayPicker: string;
  dayPickerHeader: string;
  dayPickerIcon: string;
  dayPickerTitle: string;
  dayPickerBody: string;
  dayPickerRow: string;
  dayPickerCell: string;
  dayPickerCellActive: string;
  dayPickerCellDisabled: string;
  dayPickerCellToday: string;
  dayPickerCellCurrentMonth: string;
  //...
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
  range?: boolean;
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
}
