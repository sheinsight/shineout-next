import type { CommonPickerProps, CommonTimeProps } from './picker.type';

export interface DayProps extends CommonPickerProps, CommonTimeProps {
  open?: boolean;
  onDoubleClick?: (date: Date, type: string) => void;
}
