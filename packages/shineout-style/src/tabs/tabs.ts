// import token from '@sheinx/theme';
import { JsStyles } from '../jss-style';

export type TabsClass = 'wrapper' | 'wrapperDisabled';

const tabsStyle: JsStyles<TabsClass> = {
  wrapper: {
    display: 'block',
  },
  wrapperDisabled: {},
};

export default tabsStyle;
