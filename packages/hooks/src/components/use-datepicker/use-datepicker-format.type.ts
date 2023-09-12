export type DateTimeType = Date | number | string | undefined;
export type DatePickerValue = DateTimeType | DateTimeType[];
export interface UseDatePickerFormatProps<Value extends DatePickerValue> {
  type: 'date' | 'datetime' | 'month' | 'time' | 'week' | 'year' | 'quarter';
  format: string | undefined;
  range: boolean | undefined;
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
  defaultCurrent: DatePickerValue;
}
