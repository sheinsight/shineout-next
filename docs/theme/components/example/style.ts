import { createUseStyles } from 'react-jss';

export default createUseStyles({
  example: {
    padding: '0 40px',
    marginBottom: 40,
    '& .head': {},
    '& .title': {
      fontSize: 20,
      marginTop: 48,
      marginBottom: 12,
      '& a': {
        color: '#000000',
        textDecoration: 'none',
      },
    },
    '& .subtitle': {
      fontSize: 14,
      color: 'rgb(78,89,105)',
    },
    '& .demo': {
      position: 'relative',
      marginTop: 24,
      padding: 32,
      border: '1px solid rgba(232, 235, 240, 1)',
    },
    '& .action': {
      position: 'relative',
      width: '100%',
      height: 48,
      boxSizing: 'border-box',
      borderTop: 'none',
      padding: '14px 16px',
      border: '1px solid rgba(232, 235, 240, 1)',
      fontSize: 12,
      color: 'rgba(20, 23, 55, 1)',
      '& .btn': {
        position: 'absolute',
        right: 16,
        top: 9,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        gap: 10,
      },
    },
    '& .icon': {
      width: 16,
      height: 16,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '50%',
      border: '1px solid rgb(229,230,235)',
      padding: 6,
      cursor: 'pointer',
      '&:hover': {
        background: '#000000',
        color: '#ffffff',
      },
    },
    '& .prop': {
      position: 'absolute',
      top: -7,
      left: 20,
      display: 'inline-block',
      height: 14,
      lineHeight: '14px',
      background: '#ffffff',
      padding: '0 10px',
      color: 'rgb(134 142 152)',
    },
    '& .foot': {
      marginTop: '20px',
    },
  },
});
