// import token from '@sheinx/theme';
import { JsStyles } from '../jss-style';

export type StepsClasses = {
  steps: string;
  step: string;
  small: string;
  large: string;
  disabled: string;
  content: string;
  title: string;
  description: string;
  vertical: string;
  horizontal: string;
  wait: string;
  process: string;
  finish: string;
  error: string;
  icon: string;
  dot: string;
  arrow: string;
  default: string;
};

export type StepsClassType = keyof StepsClasses;

const stepsStyle: JsStyles<StepsClassType> = {
  steps: {
    display: 'flex',
  },
  small: {},
  large: {},
  vertical: {
    flexDirection: 'column',
  },
  horizontal: {},
  step: {},
  disabled: {},
  content: {},
  title: {},
  description: {},
  wait: {},
  process: {},
  finish: {},
  error: {},
  icon: {},
  dot: {},
  arrow: {},
  default: {},
};

export default stepsStyle;
