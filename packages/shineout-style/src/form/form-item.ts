import token from '@sheinx/theme';

import {JsStyles} from '../jss-style';

type FormItemClass =
  | 'wrapper'
  | 'wrapperTip'
  | 'label'
  | 'labelLeft'
  | 'wrapperInline'
  | 'wrapperLabelTop'
  | 'wrapperLabelVerticalMiddle'
  | 'wrapperLabelVerticalBottom'
  | 'wrapperRequired'
  | 'wrapperKeepHeight'
  | 'control'
  | 'error'
  | 'tip';

const formItemStyle: JsStyles<FormItemClass> = {
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
    width: token.formItemLabelWidth,
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
  labelLeft: {
    textAlign: 'start',
  },
  wrapperInline: {
    display: 'inline-flex',
    marginRight: token.formItemMarginXEnd,
  },
  wrapperLabelTop: {
    flexFlow: 'column nowrap',
    alignItems: 'stretch',
    '& $label': {
      textAlign: 'start',
      width: 'auto',
      paddingTop: '0',
      margin: '0',
    },
  },
  wrapperLabelVerticalMiddle: {
    alignItems: 'center',
    '& $label': {
      lineHeight: 1,
      padding: 0,
      marginTop: 0,
    },
  },
  wrapperLabelVerticalBottom: {
    alignItems: 'flex-end',
  },
  wrapperRequired: {
    '& $label::before': {
      marginRight: '4px',
      color: token.formItemDangerColor,
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
    minWidth: '0',
    fontSize: token.formItemFontSize,
    minHeight: `calc(${token.lineHeightDynamic} + ${token.formItemLabelPaddingY} * 2)`,
    display: 'flex',
    flexFlow: 'row wrap',
    alignItems: 'center',
    flex: '1',
    lineHeight: token.lineHeightDynamic,
    '$wrapperInline &': {
      padding: 0,
    },
  },
  error: {
    color: token.formItemDangerColor,
    lineHeight: token.lineHeightDynamic,
    minHeight: token.formItemTipMinHeight,
    fontSize: token.formItemTipFontSize,
    flexBasis: '100%',
    width: 0,
  },
  tip: {
    color: token.formItemTipFontColor,
    fontSize: token.formItemTipFontSize,
    lineHeight: token.lineHeightDynamic,
    minHeight: token.formItemTipMinHeight,
    width: '100%',
  },
};

export default formItemStyle;
