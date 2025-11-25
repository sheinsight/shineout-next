import type { CommonPickerProps, CommonTimeProps } from './picker.type';
import {DatePickerProps} from './date-picker.type';

export interface DayProps extends CommonPickerProps, CommonTimeProps, Pick<DatePickerProps<any>, 'renderDate'> {
  open?: boolean;
  onDoubleClick?: (date: Date, type: string) => void;
}
