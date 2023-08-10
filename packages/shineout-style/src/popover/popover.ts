// import token from '@sheinx/theme';
import { JsStyles } from '../jss-style';

export type PopoverClass = 'wrapper' | 'wrapperDisabled';

const popoverStyle: JsStyles<PopoverClass> = {
  wrapper: {
    display: 'block',
  },
  wrapperDisabled: {},
};

export default popoverStyle;
