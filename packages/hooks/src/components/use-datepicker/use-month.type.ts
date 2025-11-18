import { DatePickerAreaType } from './use-datepicker-format.type';

export interface UseMonthProps {
  current?: Date;
  rangeDate?: Array<Date | undefined>;
  defaultCurrent?: Date;
  onCurrentChange?: (date: Date, type?: DatePickerAreaType) => void;
  value?: Date;
  onChange?: (date: Date, onClose?: boolean) => void;
  min?: Date;
  max?: Date;
  disabled?: boolean | ((date: Date) => boolean);
  options: {
    timeZone?: string;
    weekStartsOn?: number;
  };
}
