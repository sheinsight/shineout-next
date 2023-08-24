// import token from '@sheinx/theme';
import { JsStyles } from '../jss-style';

export type AlertClass = 'wrapper' | 'wrapperDisabled';

const alertStyle: JsStyles<AlertClass> = {
  wrapper: {
    display: 'block',
  },
  wrapperDisabled: {},
};

export default alertStyle;
