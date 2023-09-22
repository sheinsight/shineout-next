import { PickerProps } from './picker.type';

export interface TimeProps {
  setCurrent: (date: Date) => void;
  value: Date | undefined;
  onChange: (date: Date, noClose: boolean) => void;
  min?: Date;
  max?: Date;
  format: string;
  jssStyle: PickerProps['jssStyle'];
  disabled: PickerProps['disabled'];
  disabledTime: PickerProps['disabledTime'];
  hourStep: PickerProps['hourStep'];
  minuteStep: PickerProps['minuteStep'];
  secondStep: PickerProps['secondStep'];
  showSelNow: PickerProps['showSelNow'];
  options: PickerProps['options'];
}
