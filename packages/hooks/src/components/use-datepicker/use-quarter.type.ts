export interface UseQuarterProps {
  current?: Date;
  rangeDate?: Array<Date | undefined>;
  defaultCurrent?: Date;
  onCurrentChange?: (date: Date) => void;
  value?: Date;
  onChange?: (date: Date) => void;
  min?: Date;
  max?: Date;
  disabled?: boolean | ((date: Date) => boolean);
  options: {
    timeZone?: string;
    weekStartsOn?: number;
  };
}
