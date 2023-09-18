import { DatePickerProps, DateTimeType } from './date-picker.type';

export interface DayProps {
  current: Date;
  setMode: (mode: string) => void;
  rangeDate: Array<Date | undefined>;
  defaultTime: DateTimeType;
  setCurrent: (date: Date) => void;
  value: Date | undefined;
  onChange: (date: Date) => void;
  min?: Date;
  max?: Date;
  type: 'date' | 'week';
  jssStyle: DatePickerProps<any>['jssStyle'];
  disabled: DatePickerProps<any>['disabled'];
  position?: 'start' | 'end';
  options: {
    weekStartsOn: number;
    timeZone?: string;
  };
}
