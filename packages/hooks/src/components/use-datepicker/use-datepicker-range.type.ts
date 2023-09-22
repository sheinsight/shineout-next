import { Dispatch, SetStateAction } from 'react';

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
  setCurrentArr: Dispatch<SetStateAction<Date[]>>;
  mode: string[];
  setMode: Dispatch<SetStateAction<string[]>>;
  disabled: boolean | ((date: Date) => boolean) | undefined;
  options: {
    timeZone?: string;
    weekStartsOn: number;
  };
  close: () => void;
}
