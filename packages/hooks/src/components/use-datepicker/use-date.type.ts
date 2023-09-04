export interface UseDateProps {
  current?: Date;
  defaultCurrent?: Date;
  onCurrentChange?: (date: Date) => void;
  value?: Date;
  onChange?: (date: Date) => void;
  min?: Date;
  max?: Date;
  type?: 'date' | 'week';
  disabled?: (date: Date) => boolean;
  options: {
    timeZone?: string;
    startOfWeek?: string;
  };
}
