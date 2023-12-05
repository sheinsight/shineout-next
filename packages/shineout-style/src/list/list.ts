// import token from '@sheinx/theme';
import { JsStyles } from '../jss-style';

export type ListClasses = {
  wrapper: string;
};
export type ListClassType = keyof ListClasses;

const listStyle: JsStyles<ListClassType> = {
  wrapper: {
    display: 'block',
  },
};

export default listStyle;
