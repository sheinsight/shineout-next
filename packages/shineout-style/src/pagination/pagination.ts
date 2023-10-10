import { JsStyles } from '../jss-style';
import Token from '@sheinx/theme';

type PaginationClass =
  | 'pagination'
  | 'section'
  | 'buttons'
  | 'jumper'
  | 'split'
  | 'left'
  | 'right'
  | 'center'
  | 'simple'
  | 'small'
  | 'large';

const PaginationStyle: JsStyles<PaginationClass> = {
  pagination: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    fontSize: Token.paginationFontSize,
    color: Token.paginationFontColor,
  },
  left: {
    justifyContent: 'flex-start',
  },
  right: {
    justifyContent: 'flex-end',
  },
  center: {
    justifyContent: 'center',
  },
  section: {
    '& + &': {
      marginLeft: Token.paginationNearlyMargin,
    },
  },
  split: {
    width: 23,
    display: 'inline-block',
    textAlign: 'center',
  },
  buttons: {},
  jumper: {},
  simple: {},
  small: {},
  large: {},
};

export default PaginationStyle;
