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
    borderBottom: '1px solid rgb(229,230,235)',
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
    overflow: 'auto',
    '& .component': {
      display: 'flex',
      width: '100%',
      height: '100%',
    },
  },

  menu: {
    width: 259,
    height: '100%',
    borderRight: '1px solid rgb(229,230,235)',
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
    '& .doc': {
      height: 40,
      padding: '0 20px',
      lineHeight: '40px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      '& span': {
        display: 'inline-block',
        width: 120,
        textAlign: 'center',
        cursor: 'pointer',
        '&:hover': {
          color: '#999999',
        },
        '&.active': {
          color: '#000000',
        },
      },
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
        '&.active': {
          backgroundColor: '#f5f5f5',
        },
        '&:hover': {
          backgroundColor: '#f5f5f5',
        },
      },
    },
  },

  content: {
    flex: 1,
    width: '100%',
    height: '100%',
    overflowY: 'auto',
    overflowX: 'hidden',
    paddingRight: 196,
  },

  anchor: {
    position: 'fixed',
    right: 20,
    top: 20,
    minWidth: 180,
    width: 180,
    marginTop: 80,
    listStyle: 'none',
    '& a': {
      display: 'block',
      color: '#000000',
      textDecoration: 'none',
      height: 24,
      lineHeight: '24px',
      fontSize: 12,
      cursor: 'pointer',
      padding: '0 10px',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      '&.active': {
        background: '#f5f5f5',
        fontWeight: '700',
      },
      '&:hover': {
        background: '#f5f5f5',
      },
    },
  },

  footer: {
    width: '100%',
    height: 500,
    marginTop: 100,
    background: '#f7f8fa',
  },
});
