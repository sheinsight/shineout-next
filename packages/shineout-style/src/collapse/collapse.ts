import Token from '@sheinx/theme';
import { JsStyles } from '../jss-style';

export type CollapseClass = 'wrapper' | 'borderLess';

const collapseStyle: JsStyles<CollapseClass> = {
  wrapper: {
    overflow: 'hidden',
    borderRadius: Token.collapseWrapperBorderRadius,
    border: `${Token.collapseWrapperBorderSize} solid ${Token.collapseWrapperBorderColor}`,
    color: Token.collapseWrapperColor,
  },
  borderLess: {
    border: 'none',
  },
};

export default collapseStyle;
