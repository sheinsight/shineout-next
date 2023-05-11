import { styled } from '../jss-style';

export default styled(() => {
  return {
    wrapper: {
      display: 'block',
    },
  };
}, 'form');

const ItemGap = '22px';

const useFormItemStyle = styled((theme) => {
  return {
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
        color: theme.vars.danger,
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
      color: theme.vars.error,
      minHeight: ItemGap,
      fontSize: '14px',
    },
    tip: {
      color: '#999da8',
      minHeight: ItemGap,
      fontSize: '14px',
    },
  };
}, 'form-item');

export { useFormItemStyle };
