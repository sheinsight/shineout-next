export interface UseDateProps {
  current?: Date;
  defaultCurrent?: Date;
  onCurrentChange?: (date: Date) => void;
  value?: Date;
  onChange?: (date: Date) => void;
  min?: Date;
  max?: Date;
  type?: 'date' | 'week';
  clearWithUndefined?: boolean;
  disabled?: boolean | ((date: Date) => boolean);
  options: {
    timeZone?: string;
    weekStartsOn?: number;
  };
}
