import cssVars from '../cssvar';

import { JsStyles } from '../jss-style';

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
    marginBottom: cssVars.formItemMarginBottom,
    fontSize: cssVars.fontSize,
    lineHeight: cssVars.commonLineHeight,
    color: cssVars,
  },
  wrapperTip: {},
  label: {
    width: '140px',
    padding: '5px 6px',
    wordBreak: 'break-word',
    textAlign: 'end',
  },
  labelLeft: {
    textAlign: 'start',
  },
  wrapperInline: {
    display: 'inline-flex',
    marginRight: cssVars.formItemMarginRight,
  },
  wrapperLabelTop: {
    flexFlow: 'column nowrap',
    alignItems: 'stretch',
    '& $label': {
      textAlign: 'start',
      width: 'auto',
      paddingTop: '0',
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
      color: cssVars.dangerColor,
      content: '"*"',
      fontFamily: 'SimSun',
    },
  },
  wrapperKeepHeight: {
    marginBottom: cssVars.formItemTipGap,
    '&$wrapperTip': {
      marginBottom: '0',
    },
  },
  control: {
    minWidth: '0',
    padding: '0 6px',
    flex: '1',
    fontSize: '14px',
    lineHeight: cssVars.commonLineHeight,
    '$wrapperInline &': {
      padding: 0,
    },
  },
  error: {
    color: cssVars.dangerColor,
    minHeight: cssVars.formItemTipGap,
    fontSize: '14px',
  },
  tip: {
    color: '#999da8',
    minHeight: cssVars.formItemTipGap,
    fontSize: '14px',
  },
};

export default formItemStyle;
