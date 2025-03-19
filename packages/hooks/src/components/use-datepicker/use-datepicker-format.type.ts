export type DateTimeType = Date | number | string | undefined;
export type DatePickerValueType = DateTimeType | DateTimeType[];
export type DatePickerAreaType = 'year' | 'month' | 'week' | 'day' | 'time' | 'quick' | 'quarter';
export type DatePickerModeType = 'year' | 'month' | 'quarter' | 'time' | 'day';
export interface UseDatePickerFormatProps<Value extends DatePickerValueType> {
  type: 'date' | 'datetime' | 'month' | 'time' | 'week' | 'year' | 'quarter';
  format: string | undefined;
  formatResult?: string | ((date?: Date) => string);
  range: boolean | undefined | number;
  value: Value | undefined;
  onChange: ((value: Value extends any[] ? string[] : string, ...args: any) => void) | undefined;
  options:
    | {
        timeZone?: string;
        weekStartsOn?: number;
      }
    | undefined;
  clearable: boolean | undefined;
  clearWithUndefined: boolean | undefined;
  clearToUndefined?: boolean;
  onClear: (() => void) | undefined;
  allowSingle: boolean | undefined;
  defaultCurrent: DatePickerValueType;
  onPickerChange:
    | ((
        date: string | string[],
        quick: { name: string; value: any },
        type: DatePickerAreaType,
      ) => void)
    | undefined;
  disabled:
    | boolean
    | ((date: Date, position?: 'start' | 'end', startDate?: Date, endDate?: Date) => boolean)
    | Array<boolean | ((date: Date) => boolean)>
    | undefined;
}
