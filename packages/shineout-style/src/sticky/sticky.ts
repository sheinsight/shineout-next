// import token from '@sheinx/theme';
import { JsStyles } from '../jss-style';
import { StickyClasses } from '@sheinx/base';

export type StickyClassType = keyof StickyClasses;

const stickyStyle: JsStyles<StickyClassType> = {
  wrapper: {
    display: 'block',
  },
};

export default stickyStyle;
