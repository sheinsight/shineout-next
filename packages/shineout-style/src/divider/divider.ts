import { JsStyles } from '../jss-style';
import token from '@sheinx/theme';

export interface DividerClasses {
  wrapper: string;
  vertical: string;
  horizontal: string;
  withText: string;
  withTextCenter: string;
  withTextLeft: string;
  withTextRight: string;
  innerText: string;
}
export type DividerClassesKeys = keyof DividerClasses;

const dividerStyle: JsStyles<DividerClassesKeys> = {
  wrapper: {
    margin: 0,
    padding: 0,
    borderTop: `${token.dividerBorderWidth} solid ${token.dividerBorderColor}`,
  },
  vertical: {
    position: 'relative',
    top: '-0.06em',
    display: 'inline-block',
    height: '0.9em',
    margin: `0 ${token.dividerVerticalMarginX}`,
    verticalAlign: 'middle',
    borderTop: 0,
    borderLeft: `${token.dividerBorderWidth} solid ${token.dividerBorderColor}`,
  },
  horizontal: {
    display: 'flex',
    clear: 'both',
    width: '100%',
    minWidth: '100%',
    margin: `${token.dividerHorizontalMarginY} 0`,
  },
  withText: {
    display: 'flex',
    margin: `${token.dividerHorizontalTextMarginY} 0`,
    whiteSpace: 'nowrap',
    textAlign: 'center',
    borderTopWidth: 0,
    '&::before, &::after': {
      position: 'relative',
      top: '50%',
      width: '50%',
      borderTop: `${token.dividerBorderWidth} solid transparent`,
      borderTopColor: 'inherit',
      borderBottom: 0,
      transform: 'translateY(50%)',
      content: '""',
    },
  },
  withTextCenter: {
    '&::before': {
      width: '50%',
    },
    '&::after': {
      width: '50%',
    },
  },
  withTextLeft: {
    '&::before': {
      width: '5%',
    },
    '&::after': {
      width: '95%',
    },
  },
  withTextRight: {
    '&::before': {
      width: '95%',
    },
    '&::after': {
      width: '5%',
    },
  },
  innerText: {
    display: 'inline-block',
    padding: `0  ${token.dividerTextPaddingX}`,
    fontSize: token.dividerFontSize,
    color: token.dividerFontColor,
  },
};

export default dividerStyle;
