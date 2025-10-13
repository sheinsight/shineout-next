import { JsStyles } from '../jss-style';
import token from '@sheinx/theme';
import { DividerClasses } from '@sheinx/base';

export type DividerClassesKeys = keyof DividerClasses;

const dividerStyle: JsStyles<DividerClassesKeys> = {
  rootClass: {},
  wrapper: {
    margin: 0,
    padding: 0,
    borderTop: `${token.dividerBorderWidth} solid ${token.dividerBorderColor}`,
    '$wrapperDashed&': {
      borderTopStyle: 'dashed',
    },
  },
  wrapperDashed: {},
  vertical: {
    position: 'relative',
    top: '-0.06em',
    display: 'inline-block',
    height: '0.9em',
    margin: `0 ${token.dividerVerticalMarginX}`,
    verticalAlign: 'middle',
    borderTop: 0,
    borderLeft: `${token.dividerBorderWidth} solid ${token.dividerBorderColor}`,
    '$wrapperDashed&': {
      borderLeftStyle: 'dashed',
    },
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
      borderTopWidth: `${token.dividerBorderWidth}`,
      borderTopStyle: 'solid',
      borderTopColor: 'inherit',
      transform: 'translateY(50%)',
      content: '""',
      '$wrapperDashed&': {
        borderTopStyle: 'dashed',
      },
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
    fontWeight: token.dividerFontWeight,
    color: token.dividerFontColor,
  },
};

export default dividerStyle;
