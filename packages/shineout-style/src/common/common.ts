import Token from '@sheinx/theme';
import {CommonClasses} from '@sheinx/base';
import { JsStyles } from '../jss-style';


export type CommonClass = keyof CommonClasses;

const collapseStyle: JsStyles<CommonClass> = {
  highlight: {
    color: Token.tagWarningFontColor,
  },
};

export default collapseStyle;
