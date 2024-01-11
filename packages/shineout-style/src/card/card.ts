// import token from '@sheinx/theme';
import { JsStyles } from '../jss-style';

export type CardClasses = {
  wrapper: string;
};
export type CardClassType = keyof CardClasses;

const cardStyle: JsStyles<CardClassType> = {
  wrapper: {
    display: 'block',
  },
};

export default cardStyle;
