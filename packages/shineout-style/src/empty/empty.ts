import Token from '@sheinx/theme';
import { JsStyles } from '../jss-style';

export type EmptyClass = 'empty' | 'wrapper' | 'image' | 'description';

const emptyStyle: JsStyles<EmptyClass> = {
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
