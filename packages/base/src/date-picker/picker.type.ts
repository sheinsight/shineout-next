import { Dispatch, SetStateAction } from 'react';
import { DatePickerProps } from './date-picker.type';

export interface PickerProps {
  jssStyle: DatePickerProps<any>['jssStyle'];
  type: string;
  range: boolean;
  dateArr: Array<Date | undefined>;
  setDateArr: Dispatch<SetStateAction<Array<Date | undefined>>>;
  currentArr: Date[];
  setCurrentArr: Dispatch<SetStateAction<Date[]>>;
  mode: string;
  setMode: (mode: string) => void;
  disabled: boolean | ((date: Date) => boolean) | undefined;
  options: {
    timeZone?: string;
    weekStartsOn: number;
  };
  closePop: () => void;
}
