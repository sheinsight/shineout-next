import token from '@sheinx/theme';
import { FormItemClasses } from '@sheinx/base';

import { JsStyles } from '../jss-style';

const animations = {
  '@keyframes appear': {
    '0%': { transform: 1 },
    '25%': { opacity: 0.5 },
    '50%': { opacity: 1 },
    '75%': { opacity: 0.5 },
    '100%': { transform: 1 },
  },
};

const formItemStyle: JsStyles<keyof FormItemClasses> = {
  rootClass: {},
  ...animations,
  wrapper: {
    display: 'flex',
    alignItems: 'flex-start',
    marginBottom: token.formItemMarginYEnd,
    fontSize: token.formItemFontSize,
    color: token.formItemFontColor,
    boxSizing: 'border-box',
    '$control > &:not($wrapperInline)': {
      minWidth: '100%',
    },
  },
  wrapperTip: {},
  label: {
    '$wrapperInline &': {
      width: 'auto',
    },
    wordWrap: 'break-word',
    width: token.formItemLabelWidth,
    fontWeight: token.formItemLabelFontWeight,
    color: token.formItemLabelFontColor,
    padding: `${token.formItemLabelPaddingY} 0`,
    lineHeight: token.lineHeightDynamic,
    marginRight: token.formItemLabelMarginXEnd,
    wordBreak: 'break-word',
    textAlign: 'end',
    boxSizing: 'border-box',
    '&:empty::before': {
      content: '" "',
      display: 'inline-block',
    },
  },
  labelWithColon: {
    display: 'inline-flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
  },
  labelWithTooltip: {
    display: 'inline-flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
  },
  labelColon: {
    flexShrink: 0,
    marginLeft: token.formItemTooltipIconMarginXStart,
  },
  labelTooltip: {
    flexShrink: 0,
    display: 'inline-flex',
    alignItems: 'center',
    cursor: 'pointer',
    color: token.formItemTooltipIconColor,
    width: token.formItemTooltipIconFontSize,
    height: token.lineHeightDynamic,
    fontSize: token.formItemTooltipIconFontSize,
    marginLeft: token.formItemTooltipIconMarginXStart,
    '& svg': {
      width: '100%',
    },
  },
  labelLeft: {
    textAlign: 'start',
    '&$labelWithColon, &$labelWithTooltip': {
      justifyContent: 'flex-start',
    },
  },
  wrapperInline: {
    display: 'inline-flex',
    marginRight: token.formItemMarginXEnd,
  },
  wrapperLabelTop: {
    display: 'block',
    width: '100%',
    '& $label': {
      textAlign: 'start',
      width: 'auto',
      paddingTop: '0',
      paddingBottom: token.formItemLabelTopPaddingY,
      margin: '0',
    },
    '& $label$labelWithColon, & $label$labelWithTooltip': {
      justifyContent: 'flex-start',
    },
  },
  wrapperLabelVerticalMiddle: {
    alignItems: 'center',
    '& $label': {
      lineHeight: 1,
      padding: 0,
      marginTop: 0,
    },
    '& $label$labelWithColon, & $label$labelWithTooltip': {
      alignItems: 'center',
    }
  },
  wrapperLabelVerticalBottom: {
    alignItems: 'flex-end',
    '& $label$labelWithColon, & $label$labelWithTooltip': {
      alignItems: 'flex-end',
    }
  },
  wrapperRequired: {
    '& $label::before': {
      marginRight: '4px',
      color: token.formItemDangerFontColor,
      content: '"*"',
      fontFamily: 'SimSun',
      position: 'relative',
      top: '2px',
    },
  },
  wrapperKeepHeight: {
    marginBottom: token.formItemTipMinHeight,
    '&$wrapperTip': {
      marginBottom: '0',
    },
  },
  control: {
    fontSize: token.formItemFontSize,
    flex: '1',
    minWidth: 0,
    lineHeight: token.lineHeightDynamic,
    '$wrapperInline &': {
      padding: 0,
    },
  },
  error: {
    color: token.formItemDangerFontColor,
    lineHeight: token.lineHeightDynamic,
    minHeight: token.formItemTipMinHeight,
    fontSize: token.formItemDangerFontSize,
    fontWeight: token.formItemDangerFontWeight,
    animation: '$appear 1s ease-in-out forwards',
    // flexBasis: '100%',
    // width: 0,
  },
  tip: {
    color: token.formItemTipFontColor,
    fontSize: token.formItemTipFontSize,
    fontWeight: token.formItemTipFontWeight,
    lineHeight: token.lineHeightDynamic,
    minHeight: token.formItemTipMinHeight,
    marginTop: token.formItemTipMarginTop,
    width: '100%',
  },
};

export default formItemStyle;
