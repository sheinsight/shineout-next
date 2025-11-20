import React, { Dispatch, SetStateAction } from 'react';
import { DatePickerModeType, DatePickerProps, DateTimeType } from './date-picker.type';

export interface PickerProps
  extends Pick<
    DatePickerProps<any>,
    | 'jssStyle'
    | 'defaultTime'
    | 'quickSelect'
    | 'showSelNow'
    | 'disabled'
    | 'disabledTime'
    | 'renderDate'
    | 'range'
    | 'hourStep'
    | 'minuteStep'
    | 'secondStep'
    | 'children'
    | 'allowSingle'
  > {
  onClearInputArr: (index?: number | undefined) => void;
  format: string;
  type: string;
  dateArr: Array<Date | undefined>;
  inputArr: (Date | undefined)[];
  setTargetArr: Dispatch<SetStateAction<Array<Date | undefined>>>;
  setDateArr: Dispatch<SetStateAction<Array<Date | undefined>>>;
  currentArr: Date[];
  setCurrentArr: (
    arg: React.SetStateAction<Date[]>,
    type: string,
    quick:
      | {
          name: React.ReactNode;
          value: any;
        }
      | undefined,
  ) => void;
  mode: DatePickerModeType[];
  setMode: Dispatch<SetStateAction<DatePickerModeType[]>>;
  options: {
    timeZone?: string;
    weekStartsOn: number;
  };
  closePop: (isFromConfirm?: boolean) => void;
  min?: DateTimeType;
  max?: DateTimeType;
  setActiveIndex: (index: number) => void;
  registerModeDisabled: (
    position: 'start' | 'end' | undefined,
    mode: string,
    disabled: (d: Date) => boolean,
  ) => void;
  isDisabledDate: (date: Date, position: 'start' | 'end' | undefined) => boolean;
  clickTimes: number;
  setClickTimes: Dispatch<SetStateAction<number>>;
  needConfirm?: boolean;
}

export interface CommonPickerProps
  extends Pick<
    PickerProps,
    | 'jssStyle'
    | 'options'
    | 'format'
    | 'type'
    | 'showSelNow'
    | 'range'
    | 'setClickTimes'
    | 'clickTimes'
    | 'needConfirm'
    | 'registerModeDisabled'
    | 'children'
    | 'allowSingle'
  > {
  rangeDate: Array<Date | undefined>;
  current: Date;
  setCurrent: (date: Date, type: string) => void;
  setMode: (mode: string) => void;
  value: Date | undefined;
  disabled: (date: Date) => boolean;
  onChange: (date: Date, noClose?: boolean) => void;
  min?: Date;
  max?: Date;
  staticMin?: Date;
  staticMax?: Date;
  setTarget: (date?: Date) => void;
  position?: 'start' | 'end';
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  closeByConfirm?: () => void;
  onClearInputArr: (index?: number | undefined) => void;
}

export interface CommonTimeProps
  extends Pick<PickerProps, 'disabledTime' | 'hourStep' | 'minuteStep' | 'secondStep'> {
  defaultTime: DateTimeType;
}
