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
      section: {
        '&.rtl': {
          direction: 'rtl',
        },
      }
    },
    desktop: {
      position: 'absolute',
      left: 260,
      right: 0,
      top: navHeight,
      height: `calc(100% - ${navHeight}px)`,
      overflowY: 'auto',
      overflowX: 'hidden',
      'body.rtl &': {
        left: 0,
        right: 260,
      }
    },
    nav: {
      position: 'sticky',
      top: 0,
      height: navHeight,
      width: '100%',
      display: 'flex',
      backgroundColor: '#ffffff',
      borderBottom: '1px solid rgb(229,230,235)',
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
          backgroundColor: '#E8EBF0',
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
        }
      },
    },

    menu: {
      position: 'sticky',
      overflow: 'hidden',
      float: 'left',
      top: 60,
      width: 259,
      height: 'calc(100% - 60px)',
      borderRight: '1px solid rgba(232, 235, 240, 1)',
      listStyle: 'none',
      margin: 0,
      fontSize: 14,
      padding: '0 16px',
      boxSizing: 'border-box',
      'body.rtl &': {
        float: 'right',
        borderRight: 'none',
        borderLeft: '1px solid rgba(232, 235, 240, 1)',
      },
      '& .group': {
        height: 40,
        padding: '0 16px',
        fontSize: 12,
        lineHeight: '40px',
        marginTop: 24,
        color: '#666C7C',
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
        color: '#666C7C',
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
        color: '#141737',
        '& li': {
          height: 40,
          lineHeight: '40px',
          padding: '0 16px',
          cursor: 'pointer',
          borderRadius: 4,
          marginTop: 4,
          marginBottom: 4,
          '&.active': {
            color: '#197AFA',
            fontWeight: 500,
            backgroundColor: '#E9F5FE',
          },
          '&:hover': {
            backgroundColor: '#F4F5F8',
          },
        },
        '& li:last-child': {
          marginBottom: 16,
        },
      },

      '&:hover': {
        overflow: 'auto',
      },

      '&::-webkit-scrollbar': {
        width: 12,
        height: 4,
      },
      '&::-webkit-scrollbar-thumb':  {
        border: '4px solid transparent',
        backgroundClip: 'padding-box',
        borderRadius: 7,
        backgroundColor: 'rgba(232, 235, 240, 1)',
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
        color: 'rgba(20, 23, 55, 1)',
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
          color: '#197AFA',
          '&::before': {
            content: '" "',
            position: 'absolute',
            zIndex: 1,
            left: 0,
            top: 0,
            width: 1,
            height: '100%',
            backgroundColor: '#197AFA',
            'body.rtl &': {
              left: 'auto',
              right: 0,
            }
          },
        },
        '&:hover': {
          color: '#197AFA',
        },
        '&::after': {
          content: '" "',
          position: 'absolute',
          left: 0,
          top: 0,
          width: 1,
          height: '100%',
          backgroundColor: '#E8EBF0',
          'body.rtl &': {
            left: 'auto',
            right: 0,
          }
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
      background: '#f7f8fa',
    },
  },
  { name: 'doc-layout' },
);
