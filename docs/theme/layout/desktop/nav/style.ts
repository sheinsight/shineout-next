import { createUseStyles } from 'react-jss';
import { navHeight } from '../style';

export default createUseStyles(
  {
    nav: {
      position: 'sticky',
      top: 0,
      height: navHeight,
      width: '100%',
      display: 'flex',
      backgroundColor: 'var(--soui-neutral-fill-1)',
      borderBottom: '1px solid var(--soui-neutral-border-1)',
      zIndex: 2,
      '& .left-nav': {
        display: 'flex',
        alignItems: 'center',
        padding: '0 24px',
        position: 'relative',
        '&::after': {
          content: '" "',
          position: 'absolute',
          right: 0,
          width: 1,
          height: 24,
          top: 18,
          backgroundColor: 'var(--soui-neutral-border-1)',
        },
      },
      '& .logo': {
        display: 'flex',
        alignItems: 'center',
        marginLeft: 24,
        cursor: 'pointer',
      },
      '& .entry': {
        // gap: 12,
        width: '100%',
        fontWeight: '700',
        display: 'flex',
        listStyle: 'none',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 16px',
        '& li': {
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          '&:hover': {
            color: '#999999',
          },
        },
      },
    },

    // localeIcon: {
    //   marginInlineEnd: 24,
    //   cursor: 'pointer',
    //   display: 'flex',
    //   alignItems: 'center',
    //   justifyContent: 'center',
    // },

    // directionButton: {
    //   background: 'none',
    //   border: 'none',
    //   cursor: 'pointer',
    //   fontSize: '12px',

    //   '&:hover': {
    //     backgroundColor: 'var(--soui-button-secondary-text-hover-background-color,var(--soui-neutral-fill-2,#F4F5F8))',
    //   },
    // },

    entry: {
      width: '100%',
      display: 'flex',
      gap: 12,
      listStyle: 'none',
      alignItems: 'center',
      justifyContent: 'flex-end',
      margin: '0 16px',
    }
  },
  { name: 'doc-nav' },
);
