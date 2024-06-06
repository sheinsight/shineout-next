import { createUseStyles } from 'react-jss';

export default createUseStyles(
  {
    wrapper: {
      display: 'flex',
      height: '100%',
    },
    left: {
      position: 'relative',
      flex: 1,
      minWidth: 0,
      borderRight: '1px solid #eee',
      padding: 20,
      height: '100%',
    },
    container: {
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
    },
    right: {
      position: 'relative',
      flex: 1,
      minWidth: 0,
      padding: 20,
      height: '100%',
    },
    button: {
      flex: 1,
      padding: `100px 0px`,
      display: 'flex',
      gap: 80,
      flexDirection: 'column',
      alignItems: 'center',
      '& button': {
        margin: '0 !important',
        transform: 'scale(2)',
      },
    },
    title: {
      position: 'absoulte',
      textAlign: 'right',
      width: '100%',
    },
  },
  { name: 'doc-compare' },
);
