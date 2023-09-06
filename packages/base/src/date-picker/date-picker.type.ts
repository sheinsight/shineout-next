// import React from 'react';
import { CommonType } from '../common/type';
import { AbsoluteListProps } from '../absolute-list/absolute-list.type';

// import { BaseDatePickerProps } from '@sheinx/hooks';

export interface DatePickerClasses {
  /**
   * 最外层class
   */
  wrapper: string;
  wrapperFocus: string;
  wrapperDisabled: string;
  wrapperError: string;
  paddingBox: string;
  picker: string;
  pickerOpen: string;
  result: string;
  //...
}

export type DisabledType = 'start' | 'end';

export interface DatePickerProps
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
}
