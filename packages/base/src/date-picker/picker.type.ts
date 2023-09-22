import { Dispatch, SetStateAction } from 'react';
import { DatePickerProps, DateTimeType } from './date-picker.type';

export interface PickerProps {
  jssStyle: DatePickerProps<any>['jssStyle'];
  defaultTime: DatePickerProps<any>['defaultTime'];
  quickSelect: DatePickerProps<any>['quickSelect'];
  showSelNow: DatePickerProps<any>['showSelNow'];
  format: string;
  disabledTime: DatePickerProps<any>['disabledTime'];
  type: string;
  range: DatePickerProps<any>['range'];
  dateArr: Array<Date | undefined>;
  setTargetArr: Dispatch<SetStateAction<Array<Date | undefined>>>;
  setDateArr: Dispatch<SetStateAction<Array<Date | undefined>>>;
  currentArr: Date[];
  setCurrentArr: Dispatch<SetStateAction<Date[]>>;
  mode: string[];
  setMode: Dispatch<SetStateAction<string[]>>;
  disabled: boolean | ((date: Date) => boolean) | undefined;
  options: {
    timeZone?: string;
    weekStartsOn: number;
  };
  closePop: () => void;
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
  hourStep?: DatePickerProps<any>['hourStep'];
  minuteStep?: DatePickerProps<any>['minuteStep'];
  secondStep?: DatePickerProps<any>['secondStep'];
}

export interface CommonPickerProps
  extends Pick<
    PickerProps,
    'jssStyle' | 'disabled' | 'options' | 'format' | 'type' | 'showSelNow'
  > {
  rangeDate: Array<Date | undefined>;
  current: Date;
  setCurrent: (date: Date) => void;
  setMode: (mode: string) => void;
  value: Date | undefined;
  onChange: (date: Date, noClose?: boolean) => void;
  min?: Date;
  max?: Date;
  setTarget: (date?: Date) => void;
  position?: 'start' | 'end';
}

export interface CommonTimeProps
  extends Pick<PickerProps, 'disabledTime' | 'hourStep' | 'minuteStep' | 'secondStep'> {
  defaultTime: DateTimeType;
}
