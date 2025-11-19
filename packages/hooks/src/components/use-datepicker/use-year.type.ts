import { DatePickerAreaType } from './use-datepicker-format.type';

export interface UseYearProps {
  current?: Date;
  rangeDate?: Array<Date | undefined>;
  defaultCurrent?: Date;
  onCurrentChange?: (date: Date, type?: DatePickerAreaType) => void;
  value?: Date;
  onChange?: (date: Date, noClose?: boolean) => void;
  min?: Date;
  max?: Date;
  // type?: string;
  disabled?: boolean | ((date: Date) => boolean);
  options: {
    timeZone?: string;
    weekStartsOn?: number;
  };
}
