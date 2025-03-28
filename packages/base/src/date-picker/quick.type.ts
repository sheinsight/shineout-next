import { PickerProps } from './picker.type';

export interface QuickProps {
  jssStyle?: PickerProps['jssStyle'];
  quickSelect?: PickerProps['quickSelect'];
  type: PickerProps['type'];
  dateArr: PickerProps['dateArr'];
  setDateArr: PickerProps['setDateArr'];
  format: PickerProps['format'];
  setCurrentArr: PickerProps['setCurrentArr'];
  range: PickerProps['range'];
  options: PickerProps['options'];
  children?: PickerProps['children'];
  onClearInputArr: (index?: number | undefined) => void;
  closePop?: (isFromConfirm?: boolean | undefined) => void;
}
