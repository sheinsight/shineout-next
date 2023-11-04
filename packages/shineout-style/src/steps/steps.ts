// import token from '@sheinx/theme';
import { JsStyles } from '../jss-style';

export type StepsClasses = {
  steps: string;
  step: string;
  disabled: string;
  title: string;
  description: string;
  wait: string;
  process: string;
  finish: string;
  error: string;
  icon: string;
};

export type StepsClassType = keyof StepsClasses;

const stepsStyle: JsStyles<StepsClassType> = {
  steps: {},
  step: {},
  disabled: {},
  title: {},
  description: {},
  wait: {},
  process: {},
  finish: {},
  error: {},
  icon: {},
};

export default stepsStyle;
