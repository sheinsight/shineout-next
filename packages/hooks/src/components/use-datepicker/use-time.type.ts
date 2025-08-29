import { DateTimeType } from "./util";

export interface UseTimeProps {
  format: string;
  options: {
    timeZone?: string;
    weekStartsOn?: number;
  };
  value?: Date;
  onChange?: (date: Date) => void;
  min?: Date;
  max?: Date;
  staticMin?: Date;
  staticMax?: Date;
  disabled?: boolean | ((date: Date) => boolean);
  disabledTime?: string | ((time: string, type?: 'start' | 'end', value0?: Date, value1?: Date) => boolean);
  minuteStep?: number;
  hourStep?: number;
  secondStep?: number;
  position?: 'start' | 'end';
  rangeDate?: Array<Date | undefined>;
  defaultTime?: DateTimeType;
}
