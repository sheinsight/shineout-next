export type DateTimeType = Date | number | string | undefined;
export type DatePickerValueType = DateTimeType | DateTimeType[];

export type DatePickerModeType = 'year' | 'month' | 'quarter' | 'time' | 'day';
export interface UseDatePickerFormatProps<Value extends DatePickerValueType> {
  type: 'date' | 'datetime' | 'month' | 'time' | 'week' | 'year' | 'quarter';
  format: string | undefined;
  formatResult: string | ((date: Date) => string) | undefined;
  range: boolean | undefined | number;
  value: Value | undefined;
  onChange: ((value: Value extends any[] ? string[] : string, ...args: any) => void) | undefined;
  options:
    | {
        timeZone?: string;
        weekStartsOn?: number;
      }
    | undefined;
  clearWithUndefined: boolean | undefined;
  onClear: (() => void) | undefined;
  allowSingle: boolean | undefined;
  defaultCurrent: DatePickerValueType;
  disabled:
    | boolean
    | ((date: Date, position?: 'start' | 'end', startDate?: Date, endDate?: Date) => boolean)
    | Array<boolean | ((date: Date) => boolean)>
    | undefined;
}
