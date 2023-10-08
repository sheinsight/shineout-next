import { JsStyles } from '../jss-style';
import Token from '@sheinx/theme';

type PaginationClass =
  | 'pagination'
  | 'section'
  | 'buttons'
  | 'jumper'
  | 'left'
  | 'right'
  | 'center'
  | 'simple'
  | 'small'
  | 'large';

const PaginationStyle: JsStyles<PaginationClass> = {
  pagination: {
    display: 'flex',
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
  buttons: {},
  jumper: {},
  simple: {},
  small: {},
  large: {},
};

export default PaginationStyle;
