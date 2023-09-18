import { DatePickerProps } from './date-picker.type';

export interface YearProps {
  current: Date;
  setMode: (mode: string) => void;
  rangeDate: Array<Date | undefined>;
  setCurrent: (date: Date) => void;
  value: Date | undefined;
  onChange: (date: Date) => void;
  min?: Date;
  max?: Date;
  type?: string;
  jssStyle: DatePickerProps<any>['jssStyle'];
  disabled: DatePickerProps<any>['disabled'];
  position?: 'start' | 'end';
  options: {
    weekStartsOn: number;
    timeZone?: string;
  };
}
