// import token from '@sheinx/theme';
import { JsStyles } from '../jss-style';

export type SwitchClass = 'wrapper' | 'wrapperDisabled';

const switchStyle: JsStyles<SwitchClass> = {
  wrapper: {
    display: 'block',
  },
  wrapperDisabled: {},
};

export default switchStyle;
