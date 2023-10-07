import DatePicker from './date-picker';

type RefDatePicker = typeof DatePicker;

export interface DatePickerComponent extends RefDatePicker {
  displayName: string;
}

const DatePickerComp: DatePickerComponent = DatePicker as DatePickerComponent;

DatePickerComp.displayName = 'ShineoutDatePicker';

export default DatePickerComp;
