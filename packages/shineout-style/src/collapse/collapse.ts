import Token from '@sheinx/theme';
import { JsStyles } from '../jss-style';
import { CollapseClasses } from '@sheinx/base';

export type CollapseClass = keyof CollapseClasses;

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
