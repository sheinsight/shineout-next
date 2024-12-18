import { createUseStyles } from 'react-jss';

const codeBg = 'rgb( 242,243,245 )';

const commonStyle = {
  '& .time': {
    color: '#86909c',
    fontSize: 14,
    display: 'block',
    marginTop: -8,
    marginBottom: 16,
  },
  '& h1,  & h2, & h3': {
    position: 'relative',
    fontWeight: 500,
    color: 'rgb( 29,33,41 )',
  },
  '& h2': {
    margin: '32px 0 16px;',
    fontSize: '24px',
  },
  '& strong': {
    fontWeight: 500,
  },
  '& p': {
    color: 'rgb(78,89,105)',
    fontSize: 14,
  },
  '& pre[class^=language-]': {
    borderRadius: 4,
  },
  '& table': {
    width: '100%',
    border: '1px solid #e5e6e8',
    textAlign: 'center',
    borderRadius: '4px',
    borderSpacing: 0,

    '& th,td': {
      borderRight: '1px solid #e5e6e8',
      borderBottom: '1px solid #e5e6e8',
    },
    '& th:last-child,td:last-child': {
      borderRight: '0px',
    },
    '& tbody :last-child td':{
      borderBottom: '0px',
    },
    '& th': {
      backgroundColor: 'rgb( 242,243,245 )',
      padding: '8px',
    },
    '& th, & td': { padding: 10 },
  },
  '& li': {
    lineHeight: 2,
    color: 'rgb( 78,89,105 )',
  },
  '& ul': {
    paddingLeft: '24px',
    margin: 0,
    listStyle: 'circle',
    '& ul': {
      marginBottom: 0,
      marginTop: 0,
      listStyleType: 'disc',
      '& ul': {
        listStyleType: 'square',
      },
    },
  },
  '& code, & $tag': {
    fontFamily: 'Menlo, Consola',
    fontSize: '12px',
    borderRadius: '4px',
  },
};

export const useStyles = createUseStyles(
  {
    wrapper: {
      maxWidth: '1100px',
      width: '100%',
      margin: '0 auto',
      padding: 20,

      ...commonStyle,
    },
    time: {
      color: '#86909c',
      fontSize: 14,
      display: 'block',
      marginTop: -8,
      marginBottom: 16,
    },
    noPadding: {
      padding: 0,
    },
    head: {
      borderBottom: '1px solid rgb(229, 230, 235)',
      paddingBottom: 20,
      ...commonStyle,
    },
    body: {
      ...commonStyle,
    },
    demo: {
      boxSizing: 'border-box',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 4,
      padding: '1em',
      backgroundColor: codeBg,
    },
    tag: {
      padding: '2px 8px',
      '&:first-child': {
        marginInlineStart: 0,
      },
      borderRadius: '2px',
      margin: '0 4px',
      color: 'rgb( 78,89,105 )',
      border: `1px solid ${codeBg}!important`,
      backgroundColor: codeBg,
    },
    code: {
      borderRadius: '4px!important',
      border: `1px solid ${codeBg}!important`,
      backgroundColor: `${codeBg}!important`,
    },
  },

  { name: 'Doc' },
);
