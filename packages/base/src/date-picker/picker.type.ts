import { Dispatch, SetStateAction } from 'react';
import { DatePickerProps, DateTimeType } from './date-picker.type';

export interface PickerProps {
  jssStyle: DatePickerProps<any>['jssStyle'];
  defaultTime: DatePickerProps<any>['defaultTime'];
  quickSelect: DatePickerProps<any>['quickSelect'];
  showSelNow: DatePickerProps<any>['showSelNow'];
  disabled: DatePickerProps<any>['disabled'];
  disabledTime: DatePickerProps<any>['disabledTime'];
  range: DatePickerProps<any>['range'];
  hourStep?: DatePickerProps<any>['hourStep'];
  minuteStep?: DatePickerProps<any>['minuteStep'];
  secondStep?: DatePickerProps<any>['secondStep'];
  format: string;
  type: string;
  dateArr: Array<Date | undefined>;
  setTargetArr: Dispatch<SetStateAction<Array<Date | undefined>>>;
  setDateArr: Dispatch<SetStateAction<Array<Date | undefined>>>;
  currentArr: Date[];
  setCurrentArr: Dispatch<SetStateAction<Date[]>>;
  mode: string[];
  setMode: Dispatch<SetStateAction<string[]>>;
  options: {
    timeZone?: string;
    weekStartsOn: number;
  };
  closePop: () => void;
  min?: DateTimeType;
  max?: DateTimeType;
}

export interface CommonPickerProps
  extends Pick<PickerProps, 'jssStyle' | 'options' | 'format' | 'type' | 'showSelNow'> {
  rangeDate: Array<Date | undefined>;
  current: Date;
  setCurrent: (date: Date) => void;
  setMode: (mode: string) => void;
  value: Date | undefined;
  disabled: (date: Date) => boolean;
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
