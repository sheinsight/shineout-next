// import token from '@sheinx/theme';
import { JsStyles } from '../jss-style';

export type DescriptionsClass = 'wrapper' | 'wrapperDisabled';

const descriptionsStyle: JsStyles<DescriptionsClass> = {
  wrapper: {
    display: 'block',
  },
  wrapperDisabled: {},
};

export default descriptionsStyle;
