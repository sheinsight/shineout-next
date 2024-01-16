import { JsStyles } from '../jss-style';
import Token from '@sheinx/theme';

export interface PaginationClasses {
  pagination: string;
  section: string;
  buttons: string;
  left: string;
  right: string;
  center: string;
  jumper: string;
  jumperInput: string;
  split: string;
  icon: string;
  simple: string;
  small: string;
  large: string;
}

type PaginationClass = keyof PaginationClasses;

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
  icon: {
    lineHeight: 0,
    display: 'inline-block',
    width: Token.paginationFontSize,
  },
  buttons: {},
  jumper: {
    display: 'flex',
    alignItems: 'center',
  },
  jumperInput: {
    '& input': {
      textAlign: 'center',
    },
  },
  simple: {},
  small: {
    '& $icon': {
      width: Token.paginationSmallFontSize,
    },
  },
  large: {
    '& $icon': {
      width: Token.paginationLargeFontSize,
    },
  },
};

export default PaginationStyle;
