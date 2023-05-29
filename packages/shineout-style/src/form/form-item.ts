import { colorVar } from '../themes/default';

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

const ItemGap = '22px';

const formItemStyle: JsStyles<FormItemClass> = {
  wrapper: {
    display: 'flex',
    alignItems: 'flex-start',
    marginBottom: ItemGap,
  },
  wrapperTip: {
    marginBottom: '0',
  },
  label: {
    width: '140px',
    padding: '5px 6px',
    wordBreak: 'break-all',
    textAlign: 'end',
  },
  labelLeft: {
    textAlign: 'start',
  },
  wrapperInline: {
    display: 'inline-flex',
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
  },
  wrapperLabelVerticalBottom: {
    alignItems: 'flex-end',
  },
  wrapperRequired: {
    '& $label::before': {
      marginRight: '4px',
      color: colorVar.danger,
      content: '"*"',
      fontFamily: 'SimSun',
    },
  },
  wrapperKeepHeight: {},
  control: {
    minWidth: '0',
    padding: '0 6px',
    flex: '1',
    fontSize: '14px',
    lineHeight: '1.42857143',
  },
  error: {
    color: colorVar.danger,
    minHeight: ItemGap,
    fontSize: '14px',
  },
  tip: {
    color: '#999da8',
    minHeight: ItemGap,
    fontSize: '14px',
  },
};

export default formItemStyle;
