import { createUseStyles } from 'react-jss';

export default createUseStyles({
  desktop: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },

  nav: {
    height: 59,
    display: 'flex',
    backgroundColor: '#ffffff',
    borderBottom: '1px solid #e5e6eb',
    '& .entry': {
      gap: 20,
      width: '100%',
      fontWeight: '700',
      display: 'flex',
      listStyle: 'none',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: '0 20px',
      '& li': {
        cursor: 'pointer',
        '&:hover': {
          color: '#999999',
        },
      },
    },
  },

  main: {
    flex: 1,
    display: 'flex',
    width: '100%',
    height: '100%',
    '& .component': {
      display: 'flex',
      width: '100%',
      height: '100%',
    },
  },

  menu: {
    width: 259,
    borderRight: '1px solid #e5e6eb',
    listStyle: 'none',
    margin: 0,
    fontSize: 14,
    padding: 0,
    color: '#aaaaaa',
    '& .group': {
      height: 40,
      padding: '0 20px',
      lineHeight: '40px',
    },
    '& ul': {
      listStyle: 'none',
      margin: 0,
      padding: 0,
      fontSize: 12,
      color: '#333333',
      '& li': {
        height: 36,
        lineHeight: '36px',
        padding: '0 20px',
        cursor: 'pointer',
        '&:hover': {
          backgroundColor: '#f5f5f5',
        },
      },
    },
  },

  content: {
    flex: 1,
  },
});
