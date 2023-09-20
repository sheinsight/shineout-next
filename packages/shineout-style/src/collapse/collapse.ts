// import token from '@sheinx/theme';
import { JsStyles } from '../jss-style';

export type CollapseClass = 'wrapper' | 'wrapperDisabled';

const collapseStyle: JsStyles<CollapseClass> = {
  wrapper: {
    display: 'block',
  },
  wrapperDisabled: {},
};

export default collapseStyle;
