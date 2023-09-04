// import token from '@sheinx/theme';
import { JsStyles } from '../jss-style';

export type DatePickerClass = 'wrapper' | 'wrapperDisabled';

const datePickerStyle: JsStyles<DatePickerClass> = {
  wrapper: {
    display: 'block',
  },
  wrapperDisabled: {},
};

export default datePickerStyle;
