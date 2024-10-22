import { createUseStyles } from 'react-jss';
import { useToken } from 'shineout';

const { token } = useToken();

// @ts-ignore
const border = `1px solid ${token.colorBorder}`;

const commonIcon = {
  color: token.colorTextSecondary,
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
};

const styles = {
  wrapper: {
    color: token.colorText || '#141737',
    margin: '40px',
    border: border,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    // marginTop: 248
  },
  header: {
    height: '48px',
    borderBottom: border,
    padding: '8px 16px',
    lineHeight: '32px',
  },
  main: {
    display: 'flex',
    alignItems: 'center',
    // flex: 1,
    height: '522px',
  },
  content: {
    flex: 1,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'auto',
  },
  show: {
    width: '100%',
    height: 'calc(100% - 96px)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bar: {
    width: '20%',
    minWidth: '268px',
    height: '100%',
    borderLeft: border,
  },
  barHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  barIcon: {
    ...commonIcon,
  },
  form: {
    padding: '16px',
    height: 'calc(100% - 48px)',
    overflow: 'auto',
    display: 'flex',
    flexDirection: 'column',
  },
  formCollapse: {
    padding: '0'
  },
  collapse: {
    overflow: 'auto',
    borderRadius: 0
  },
  formItem: {
    '& .soui-form-item-label': {
      color: token.colorTextSecondary,
      maxWidth: '112px'
    },
    '& .soui-form-item-control': {
      display: 'flex',
      justifyContent: 'flex-end',
    },
  },
  formArea: {

  },
  functions: {
    height: '48px',
    padding: '8px 16px',
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '8px',
    alignItme: 'center',
    borderTop: border,
  },
  attached: {},
  icon: {
    ...commonIcon,
    padding: '8px',
    borderRadius: 4,
    '&:hover': {
      background: token.colorFillHover,
    },
  },
  code: {
    maxHeight: '240px',
    minHeight: '120px',
    display: 'flex',
  },
  codeWrapper: {
    flex: 1,
    fontFamily: 'Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace',
  },
  active: {
    background: token.colorFillHover,
  },
  textarea: {
    height: '60px',
    overflow: 'auto',
  },
  codesandBox: {
    '& .icon': {
      display: 'flex',
      alignItems: 'center',
    },
    '& svg': {
      width: 16,
      color: token.colorTextSecondary,
    }
  },
  extraFormItem: {
    display: 'flex',
    alignItems: 'center',

    gap: '8px',
    '& svg': {
      flexShrink: 0,
    }
  },
  extraFormItemName: {

  },
  extraFormItemTip: {

  }
};

export default createUseStyles(styles);
