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
      '& .head': {},
      '& .title': {
        fontSize: 20,
        marginTop: 48,
        marginBottom: 12,
        '& a': {
          color: '#000000',
          textDecoration: 'none',
        },
      },
      '& .footer': {
        borderLeft: '1px solid #E8EBF0',
        borderRight: '1px solid #E8EBF0',
        borderBottom: '1px solid #E8EBF0',
      },
      '&.first': {
        '& .title': {
          marginTop: 40,
        },
      },
      '& .subtitle': {
        fontSize: 14,
        color: 'rgb(78,89,105)',
      },
      '& .demo': {
        // position: 'relative',
        marginTop: 24,
        padding: 32,
        border: '1px solid rgba(232, 235, 240, 1)',
      },
      '& .action': {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        width: '100%',
        minHeight: 48,
        boxSizing: 'border-box',
        borderTop: 'none',
        padding: '14px 16px',
        border: '1px solid rgba(232, 235, 240, 1)',
        fontSize: 12,
        color: 'rgba(20, 23, 55, 1)',
        '& .btn': {
          marginLeft: 8,
          right: 16,
          top: 16,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          gap: 24,
        },
      },
      '& .describe': {
        margin: 0,
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        marginBottom: 4,
      },
      // 非第一个和最后一个 describe
      '& .describe:last-child': {
        marginBottom: 0,
      },
      '& .icon': {
        position: 'relative',
        width: 16,
        height: 16,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '50%',
        cursor: 'pointer',
        '&:hover:after': {
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
    tip: {
      display: 'inline-block',
      height: 14,
      lineHeight: '14px',
      margin: '0 5px',
      padding: '2px 5px',
      color: '#5d5d5d',
      background: '#F4F5F8',
      borderRadius: 2,
    },
    debug: {
      position: 'fixed',
      top: 60,
      right: 0,
      bottom: 0,
      left: 0,
      background: '#ffffff',
      zIndex: 1,
      '& .toolbar': {
        padding: 5,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px dashed #e8ebee',
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
  { name: 'doc-example' },
);
