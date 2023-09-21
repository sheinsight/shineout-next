import { DatePickerProps, DateTimeType } from './date-picker.type';

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
  jssStyle: DatePickerProps<any>['jssStyle'];
  disabled: DatePickerProps<any>['disabled'];
  disabledTime: DatePickerProps<any>['disabledTime'];
  position?: 'start' | 'end';
  options: {
    weekStartsOn: number;
    timeZone?: string;
  };
}
