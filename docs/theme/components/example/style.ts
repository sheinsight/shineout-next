import { createUseStyles } from 'react-jss';

export default createUseStyles({
  example: {
    '& .head': {},
    '& .title': {
      fontSize: 20,
      marginTop: 64,
      marginBottom: 12,
    },
    '& .subtitle': {
      fontSize: 14,
      color: 'rgb(78,89,105)',
    },
    '& .demo': {
      position: 'relative',
      marginTop: '36px',
      padding: 48,
      border: '1px solid rgb(229,230,235)',
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
