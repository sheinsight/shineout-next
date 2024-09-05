import type { CommonPickerProps, CommonTimeProps } from './picker.type';

export interface DayProps extends CommonPickerProps, CommonTimeProps {
  open?: boolean;
  clickTimes: number;
  setClickTimes: (times: number) => void;
  range?: boolean | number;
  onDoubleClick?: (date: Date, type: string) => void;
}
