import { DatePickerProps } from './date-picker.type';

export interface TimeProps {
  setCurrent: (date: Date) => void;
  value: Date | undefined;
  onChange: (date: Date, noClose: boolean) => void;
  min?: Date;
  max?: Date;
  format: string;
  jssStyle: DatePickerProps<any>['jssStyle'];
  disabled: DatePickerProps<any>['disabled'];
  disabledTime: DatePickerProps<any>['disabledTime'];
  position?: 'start' | 'end';
  hourStep?: DatePickerProps<any>['hourStep'];
  minuteStep?: DatePickerProps<any>['minuteStep'];
  secondStep?: DatePickerProps<any>['secondStep'];
  options: {
    weekStartsOn: number;
    timeZone?: string;
  };
}
