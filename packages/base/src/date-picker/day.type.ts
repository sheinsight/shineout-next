import { DatePickerProps } from './date-picker.type';

export interface DayProps {
  current: Date;
  setCurrent: (date: Date) => void;
  value: Date | undefined;
  onChange: (date: Date) => void;
  min?: Date;
  max?: Date;
  type: 'date' | 'week';
  jssStyle: DatePickerProps<any>['jssStyle'];
  disabled: DatePickerProps<any>['disabled'];
  options: {
    weekStartsOn: number;
    timeZone?: string;
  };
}
