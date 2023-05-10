import { styled } from '../jss-style';

export default styled(() => {
  return {
    wrapper: {
      display: 'block',
    },
  };
}, 'form');

const useFormItemStyle = styled((theme) => {
  return {
    wrapper: {
      display: 'flex',
      alignItems: 'flex-start',
      marginBottom: '12px',
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
    wrapperKeepHeight: {
      '& $control': {},
    },
    control: {
      minWidth: '0',
      padding: '0 6px',
      flex: '1',
      fontSize: '14px',
      lineHeight: '1.42857143',
    },
    error: {
      color: theme.vars.error,
      marginTop: '5px',
    },
    tip: {
      color: '#999da8',
      marginTop: '5px',
    },
  };
}, 'form-item');

export { useFormItemStyle };
