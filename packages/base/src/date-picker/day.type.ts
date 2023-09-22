import type { DateTimeType } from './date-picker.type';
import type { PickerProps } from './picker.type';

export interface DayProps {
  current: Date;
  setMode: (mode: string) => void;
  rangeDate: Array<Date | undefined>;
  defaultTime: DateTimeType;
  setCurrent: (date: Date) => void;
  value: Date | undefined;
  onChange: (date: Date, noClose: boolean) => void;
  min?: Date;
  max?: Date;
  type: string;
  format: string;
  jssStyle: PickerProps['jssStyle'];
  disabled: PickerProps['disabled'];
  disabledTime: PickerProps['disabledTime'];
  hourStep: PickerProps['hourStep'];
  minuteStep: PickerProps['minuteStep'];
  secondStep: PickerProps['secondStep'];
  position?: 'start' | 'end';
  options: {
    weekStartsOn: number;
    timeZone?: string;
  };
  showSelNow: PickerProps['showSelNow'];
}
