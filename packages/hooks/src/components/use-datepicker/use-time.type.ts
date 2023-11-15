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
  disabled?: boolean | ((date: Date) => boolean);
  disabledTime?: string | ((time: string) => boolean);
  minuteStep?: number;
  hourStep?: number;
  secondStep?: number;
}
