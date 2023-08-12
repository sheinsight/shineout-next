// import token from '@sheinx/theme';
import { JsStyles } from '../jss-style';

export type SpinClass = 'wrapper' | 'wrapperDisabled';

const spinStyle: JsStyles<SpinClass> = {
  wrapper: {
    display: 'block',
  },
  wrapperDisabled: {},
};

export default spinStyle;
