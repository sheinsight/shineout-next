import { createUseStyles } from 'react-jss';

export default createUseStyles(
  {
    example: {
      padding: '0 40px',
      marginBottom: 40,
      '&.nearly': {
        marginBottom: 32,
      },
      '&.last': {
        marginBottom: 40,
      },
      '&.first': {
        '& $exampleTitle': {
          marginTop: 40,
        },
      },
      // 非第一个和最后一个 describe
      '& $exampleDescribe:last-child': {
        marginBottom: 0,
      },
      '& .iconbox': {
        width: 16,
        height: 16,
        position: 'relative',
        '&:hover': {
          '& .icon:after': {
            display: 'block',
          },
        },
      },
      '& .icon': {
        position: 'absolute',
        width: 32,
        height: 32,
        top: -8,
        left: -8,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '50%',
        cursor: 'pointer',
        '& svg': {
          width: 16,
          color: 'var(--soui-neutral-fill-8)',
        },
        '&:hover:after': {
          display: 'none',
          content: '""',
          position: 'absolute',
          width: 32,
          height: 32,
          borderRadius: 4,
          background: '#F4F5F8',
          zIndex: -1,
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
    exampleTitle: {
      fontSize: 20,
      lineHeight: '28px',
      marginTop: 48,
      marginBottom: 12,
      color: 'var(--soui-neutral-text-5)',
      '& a': {
        color: '#000000',
        textDecoration: 'none',
      },
    },
    exampleAnchorTitle: {},
    exampleHeader: {},
    exampleFooter: {
      borderLeft: '1px solid var(--soui-neutral-border-1)',
      borderRight: '1px solid var(--soui-neutral-border-1)',
      borderBottom: '1px solid var(--soui-neutral-border-1)',
    },
    exampleDemo: {
      '#examples-carousel &': {
        overflow: 'auto',
      },
      marginTop: 24,
      padding: 32,
      lineHeight: 'calc(1em + 8px)',
      border: '1px solid var(--soui-neutral-border-1)',
      '& p': {
        margin: 0,
        lineHeight: 'calc(1em + 8px)',
      },
    },
    exampleDescribe: {
      fontSize: 12,
      display: 'flex',
      lineHeight: '20px',
      alignItems: 'center',
      flexWrap: 'wrap',
      marginBottom: 2,
      color: 'var(--soui-neutral-text-5)',
      '& > p': {
        margin: 0,
      },
      '&:last-child': {
        marginBottom: 0,
      },
    },
    exampleAction: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      width: '100%',
      minHeight: 48,
      boxSizing: 'border-box',
      borderTop: 'none',
      padding: '14px 16px',
      borderLeft: '1px solid var(--soui-neutral-border-1)',
      borderRight: '1px solid var(--soui-neutral-border-1)',
      borderBottom: '1px solid var(--soui-neutral-border-1)',
      fontSize: 12,
      color: 'rgba(20, 23, 55, 1)',
    },
    exampleActionButton: {
      marginLeft: 8,
      right: 16,
      height: 20,
      lineHeight: '20px',
      top: 16,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      gap: 24,
      '& $icon svg': {
        color: 'var(--soui-neutral-text-8)',
      },
    },
    icon: {},
    tip: {
      margin: '0 4px',
      cursor: 'pointer',
    },
    code: {
      display: 'flex',
    },
    codeFile: {
      width: 140,
      borderRight: '1px solid var(--soui-neutral-border-1)',
      boxSizing: 'border-box',
      background: 'var(--soui-neutral-fill-2)',
    },
    codeWrapper: {
      flex: 1,
      fontFamily: 'Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace',
    },
    debug: {
      position: 'fixed',
      top: 60,
      right: 0,
      bottom: 0,
      left: 0,
      background: 'var(--soui-neutral-fill-1)',
      zIndex: 1,
      '& .toolbar': {
        padding: 5,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px dashed var(--soui-neutral-border-1)',
      },

      '& .container': {
        height: 'calc(100vh - 95px)',
      },
      '& .body': {
        height: '100%',
      },

      '& .css': {
        width: 200,
        color: '#666C7C',
        position: 'fixed',
        top: 100,
        right: 20,
      },
    },
  },
  { name: 'doc' },
);
