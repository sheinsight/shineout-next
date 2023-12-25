// import token from '@sheinx/theme';
import { JsStyles } from '../jss-style';

export type StickyClasses = {
  wrapper: string;
};
export type StickyClassType = keyof StickyClasses;

const stickyStyle: JsStyles<StickyClassType> = {
  wrapper: {
    display: 'block',
  },
};

export default stickyStyle;
