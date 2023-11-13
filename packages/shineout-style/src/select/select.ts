// import token from '@sheinx/theme';
import { JsStyles } from '../jss-style';

export type SelectClasses = {
  wrapper: string;
};
export type SelectClassType = keyof SelectClasses;

const selectStyle: JsStyles<SelectClassType> = {
  wrapper: {
    display: 'block',
  },
};

export default selectStyle;
