import { createUseStyles } from 'react-jss';

const codeBg = 'var(--soui-neutral-fill-2)';

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
    color: 'var(--soui-neutral-text-5)',
    '&[data-clickable="true"]': {
      cursor: 'pointer',
      transition: 'color 0.2s ease',
      '&:hover': {
        color: 'var(--soui-primary-6)',
      },
      '&::before': {
        content: '"#"',
        position: 'absolute',
        left: '-20px',
        color: 'var(--soui-primary-6)',
        opacity: 0,
        transition: 'opacity 0.2s ease',
      },
      '&:hover::before': {
        opacity: 1,
      },
    },
  },
  '& h2': {
    margin: '32px 0 16px;',
    fontSize: '24px',
  },
  '& strong': {
    fontWeight: 500,
  },
  '& p': {
    color: 'var(--soui-neutral-text-4)',
    fontSize: 14,
  },
  '& pre[class^=language-]': {
    borderRadius: 4,
  },
  '& table': {
    width: '100%',
    border: '1px solid var(--soui-neutral-border-1)',
    textAlign: 'left',
    borderRadius: '4px',
    borderSpacing: 0,

    '& th,td': {
      borderRight: '1px solid var(--soui-neutral-border-1)',
      borderBottom: '1px solid var(--soui-neutral-border-1)',
    },
    '& th:last-child,td:last-child': {
      borderRight: '0px',
    },
    '& tbody :last-child td': {
      borderBottom: '0px',
    },
    '& th': {
      backgroundColor: 'var(--soui-neutral-fill-2)',
      padding: '8px',
    },
    '& th, & td': { padding: 10 },
  },
  '& li': {
    lineHeight: 2,
    color: 'var(--soui-neutral-text-4)',
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
      marginBottom: 60,
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
      borderBottom: '1px solid var(--soui-neutral-border-1)',
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
      color: 'var(--soui-neutral-text-4)',
      border: `1px solid var(--soui-neutral-fill-3) !important`,
      backgroundColor: 'var(--soui-neutral-fill-2)',
    },
    code: {
      padding: 14,
      borderRadius: '4px!important',
      border: `1px solid ${codeBg}!important`,
      backgroundColor: `${codeBg}!important`,
    },
  },

  { name: 'Doc' },
);
