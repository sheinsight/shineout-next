import Token from '@sheinx/theme';
import { JsStyles } from '../jss-style';
import { EmptyClasses } from '@sheinx/base';

const emptyStyle: JsStyles<keyof EmptyClasses> = {
  empty: {
    width: '100%',
    boxSizing: 'border-box',
  },
  wrapper: {
    width: '100%',
    boxSizing: 'border-box',
    textAlign: 'center',
  },
  image: {
    marginBottom: 8,
    lineHeight: 1,
    '& img': {
      width: 100,
      height: 75,
      borderStyle: 'none',
    },
  },
  description: {
    fontSize: Token.emptyFontSize,
    color: Token.emptyFontColor,
    lineHeight: Token.lineHeightDynamic,
  },
};

export default emptyStyle;
