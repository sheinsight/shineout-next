// import token from '@sheinx/theme';
import { JsStyles } from '../jss-style';

export type StepsClasses = {
  wrapper: string;
};
export type StepsClassType = keyof StepsClasses;

const stepsStyle: JsStyles<StepsClassType> = {
  wrapper: {
    display: 'block',
  },
};

export default stepsStyle;
