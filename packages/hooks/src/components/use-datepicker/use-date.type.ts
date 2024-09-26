export interface UseDateProps {
  current?: Date;
  rangeDate?: Array<Date | undefined>;
  defaultCurrent?: Date;
  onCurrentChange?: (date: Date) => void;
  value?: Date;
  onChange?: (date: Date, noClose?: boolean) => void;
  min?: Date;
  max?: Date;
  type?: 'date' | 'week' | 'datetime';
  format?: string;
  disabled?: boolean | ((date: Date) => boolean);
  defaultTime?: string | number | Date;
  options: {
    timeZone?: string;
    weekStartsOn?: number;
  };
}
