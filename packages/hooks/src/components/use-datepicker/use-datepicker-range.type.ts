import { Dispatch, SetStateAction } from 'react';
import { DatePickerModeType } from './use-datepicker-format.type';

type DateType = string | number | Date | undefined;
export interface useRangeProps {
  defaultTime: Array<DateType> | DateType;
  type: string;
  range: boolean | undefined | number;
  min: DateType;
  max: DateType;
  dateArr: Array<Date | undefined>;
  setTargetArr: Dispatch<SetStateAction<Array<Date | undefined>>>;
  setDateArr: Dispatch<SetStateAction<Array<Date | undefined>>>;
  currentArr: Date[];
  setCurrentArr: (arg: SetStateAction<Date[]>, ...args: any[]) => void;
  mode: DatePickerModeType[];
  setMode: Dispatch<SetStateAction<DatePickerModeType[]>>;
  disabled:
    | boolean
    | ((date: Date, position?: 'start' | 'end', startDate?: Date, endDate?: Date) => boolean)
    | Array<boolean | ((date: Date) => boolean)>
    | undefined;
  options: {
    timeZone?: string;
    weekStartsOn: number;
  };
  close: () => void;
}
