import { createUseStyles } from 'react-jss';

const navHeight = 59;

export default createUseStyles(
  {
    '@global': {
      body: {
        position: 'relative',
        '&.rtl': {
          direction: 'rtl',
        },
      },
    },
    fullScreen: {
      top: '0 !important',
      left: '0 !important',
      height: '100% !important',
    },
    desktop: {
      position: 'absolute',
      left: 259,
      right: 0,
      top: navHeight,
      height: `calc(100% - ${navHeight}px)`,
      overflowY: 'auto',
      overflowX: 'hidden',
      backgroundColor: 'var(--soui-neutral-fill-1)',
      'body.rtl &': {
        left: 0,
        right: 259,
      },
    },

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

    main: {
      width: '100%',
      height: '100%',
      marginTop: 60,
      '& .component': {
        float: 'left',
        width: '100%',
        height: '100%',
        paddingLeft: 260,
        boxSizing: 'border-box',
        'body.rtl &': {
          float: 'right',
          paddingLeft: 0,
          paddingRight: 260,
        },
      },
    },

    menu: {
      position: 'sticky',
      overflow: 'auto',
      float: 'left',
      top: 59,
      width: 259,
      height: 'calc(100% - 59px)',
      borderRight: '1px solid var(--soui-neutral-border-1)',
      backgroundColor: 'var(--soui-neutral-fill-1)',
      listStyle: 'none',
      margin: 0,
      fontSize: 14,
      padding: '0 16px',
      boxSizing: 'border-box',
      'body.rtl &': {
        float: 'right',
        borderRight: 'none',
        borderLeft: '1px solid var(--soui-neutral-border-1)',
      },
      '& .group': {
        height: 40,
        padding: '0 16px',
        fontSize: 12,
        lineHeight: '40px',
        marginTop: 24,
        color: 'var(--soui-neutral-text-4)',
        '&.first': {
          marginTop: 12,
        },
      },
      '& .doc': {
        height: 40,
        padding: '0 16px',
        lineHeight: '40px',
        display: 'flex',
        alignItems: 'center',
        fontSize: 12,
        color: 'var(--soui-neutral-text-4)',
        marginTop: 12,
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
        fontSize: 14,
        color: 'var(--soui-neutral-text-5)',
        '& li': {
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: 40,
          lineHeight: '40px',
          padding: '0 8px 0 16px',
          cursor: 'pointer',
          borderRadius: 4,
          marginTop: 4,
          marginBottom: 4,
          '&.active': {
            color: 'var(--soui-brand-6)',
            fontWeight: 500,
            backgroundColor:
              'var(--soui-menu-item-active-background-color,var(--soui-brand-1,#E9F5FE))',
            '&:hover': {
              backgroundColor:
                'var(--soui-menu-item-active-background-color,var(--soui-brand-1,#E9F5FE))',
            },
          },
          '&:hover': {
            backgroundColor: 'var(--soui-neutral-fill-2)',
          },
        },
        '& li:last-child': {
          marginBottom: 16,
        },
      },
    },

    content: {
      flex: 1,
      width: '100%',
      height: '100%',
    },

    anchor: {
      position: 'fixed',
      right: 16,
      top: 305,
      minWidth: 160,
      width: 160,
      height: 'calc(100% - 345px)',
      overflow: 'auto',
      listStyle: 'none',
      margin: 0,
      padding: 0,
      transition: 'all ease 0.3s',
      'body.rtl &': {
        right: 'auto',
        left: 16,
      },
      '& a': {
        position: 'relative',
        display: 'block',
        color: 'var(--soui-neutral-text-5)',
        textDecoration: 'none',
        minHeight: 28,
        lineHeight: '20px',
        padding: '4px 12px',
        fontSize: 12,
        boxSizing: 'border-box',
        cursor: 'pointer',
        textOverflow: 'ellipsis',
        whiteSpace: 'wrap',
        // overflow: 'hidden',
        '&.active': {
          color: 'var(--soui-brand-6)',
          '&::before': {
            content: '" "',
            position: 'absolute',
            zIndex: 1,
            left: 0,
            top: 0,
            width: 1,
            height: '100%',
            backgroundColor: 'var(--soui-brand-6)',
            'body.rtl &': {
              left: 'auto',
              right: 0,
            },
          },
        },
        '&:hover': {
          color: 'var(--soui-brand-6)',
        },
        '&::after': {
          content: '" "',
          position: 'absolute',
          left: 0,
          top: 0,
          width: 1,
          height: '100%',
          backgroundColor: 'var(--soui-neutral-border-1)',
          'body.rtl &': {
            left: 'auto',
            right: 0,
          },
        },
      },
    },

    stickyAnchor: {
      top: 220,
      height: 'calc(100% - 260px)',
    },

    relative: {
      position: 'fixed',
      height: 1,
      background: 'red',
      width: '100%',
      top: '30%',
      left: 0,
    },

    footer: {
      width: '100%',
      height: 500,
      marginTop: 100,
      background: 'var(--soui-neutral-fill-2)',
    },

    customScrollbar: {
      '&::-webkit-scrollbar': {
        width: 12,
        height: 4,
      },
      '&::-webkit-scrollbar-thumb': {
        border: '4px solid transparent',
        backgroundClip: 'padding-box',
        borderRadius: 7,
        backgroundColor: 'var(--soui-neutral-fill-3)',
      },
    },

    floatButton: {
      position: 'fixed',
      right: 16,
      bottom: 40,
      '& svg': {
        fill: 'var(--soui-neutral-text-5)',
      },
    },
    floatButtonTarget: {
      width: 40,
      height: 40,
      borderRadius: '50%',
      boxShadow: 'var(--soui-shadow-2)',
      bottom: 40,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'var(--soui-neutral-fill-1)',
      cursor: 'pointer',
      transition: 'all 0.3s',
      '& svg': {
        cursor: 'pointer',
        fill: 'var(--soui-neutral-text-5)',
      },
      '&:hover': {
        boxShadow: 'var(--soui-shadow-3)',
      },
    },
    floatButtonMenu: {
      opacity: 0,
      position: 'absolute',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 20,
      transition: 'all 0.3s',
    },
    floatButtonMenuItem: {
      width: 40,
      height: 40,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '50%',
      boxShadow: 'var(--soui-shadow-2)',
      backgroundColor: 'var(--soui-neutral-fill-1)',
      cursor: 'pointer',
    },
    floatButtonMenuItemActive: {
      backgroundColor: 'var(--soui-brand-6)',
      '& svg': {
        fill: '#fff',
      },
    },
    floatButtonMenuOpen: {
      opacity: 1,
    },
    floatButtonOpen: {},
  },
  { name: 'doc-layout' },
);
