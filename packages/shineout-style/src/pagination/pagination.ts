import { JsStyles } from '../jss-style';
import Token from '@sheinx/theme';
import { PaginationClasses } from '@sheinx/base';

type PaginationClass = keyof PaginationClasses;

const PaginationStyle: JsStyles<PaginationClass> = {
  rootClass: {},
  pagination: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    fontSize: Token.paginationFontSize,
    color: Token.paginationFontColor,
    fontWeight: Token.paginationFontWeight,
    height: 'fit-content',
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
  icon: {
    lineHeight: 0,
    display: 'inline-block',
    width: Token.paginationFontSize,
  },
  buttons: {
    display: 'flex',
    alignItems: 'center',
  },
  jumper: {
    display: 'flex',
    alignItems: 'center',
  },
  jumperInput: {
    '& input': {
      textAlign: 'center',
    },
  },
  sizeList: {
    display: 'flex',
    alignItems: 'center',
  },
  simple: {},
  small: {
    fontSize: Token.paginationSmallFontSize,
    fontWeight: Token.paginationSmallFontWeight,
    '& $icon': {
      width: Token.paginationSmallFontSize,
    },
  },
  large: {
    fontSize: Token.paginationLargeFontSize,
    fontWeight: Token.paginationLargeFontWeight,
    '& $icon': {
      width: Token.paginationLargeFontSize,
    },
  },
  buttonItem: {
    transition: 'none',
  },
};

export default PaginationStyle;
