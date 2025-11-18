import { DatePickerAreaType } from './use-datepicker-format.type';

export interface UseDateProps {
  current?: Date;
  range?: boolean | number;
  rangeDate?: Array<Date | undefined>;
  defaultCurrent?: Date;
  onCurrentChange?: (date: Date, type?: DatePickerAreaType) => void;
  onClearInputArr: (index?: number | undefined) => void;
  value?: Date;
  allowSingle?: boolean;
  onChange?: (date: Date | string, noClose?: boolean) => void;
  min?: Date;
  max?: Date;
  position?: 'start' | 'end';
  type?: 'date' | 'week' | 'datetime';
  format?: string;
  disabled?: boolean | ((date: Date) => boolean);
  defaultTime?: string | number | Date;
  options: {
    timeZone?: string;
    weekStartsOn?: number;
  };
}
