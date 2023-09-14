import { createUseStyles } from 'react-jss';

export default createUseStyles(
  {
    pages: {},
    header: {
      position: 'sticky',
      top: 60,
      zIndex: 1,
      color: '#141737',
      padding: '0 56px',
      background: '#fff',
      borderBottom: '1px solid rgba(232, 235, 240, 1)',
      transition: 'all 0.15s ease',
      '& .title': {
        fontSize: 36,
        fontWeight: 500,
        marginBottom: 0,
        marginTop: 0,
        paddingTop: 32,
        transition: 'all 0.3s ease',
        lineHeight: 'calc(1em + 8px)',
      },

      '& .subtitle': {
        fontSize: 14,
        height: 20,
        opacity: 1,
        marginBottom: 0,
        marginTop: 12,
        color: 'rgb(78,89,105)',
        transition: 'all 0.3s ease',
      },
    },
    stickyHeader: {
      '& .title': {
        paddingTop: 16,
        fontSize: 24,
      },
      '& .subtitle': {
        height: 0,
        opacity: 0,
        marginTop: 0,
      },
      '& $tabs': {
        marginTop: 16,
        marginBottom: 16,
      },
    },
    hiddenHeader: {},
    tabs: {
      width: 462,
      height: 40,
      marginTop: 24,
      borderRadius: 4,
      marginBottom: 32,
      display: 'flex',
      alignItems: 'center',
      padding: 4,
      boxSizing: 'border-box',
      background: 'rgba(244, 245, 248, 1)',
      whiteSpace: 'nowrap',
    },
    tab: {
      height: 32,
      lineHeight: '24px',
      fontSize: 14,
      display: 'inline-block',
      boxSizing: 'border-box',
      padding: '5px 40px',
      cursor: 'pointer',
      borderRadius: 4,
      '&.active': {
        color: '#197AFA',
        background: '#fff',
      },
    },
    doc: {
      display: 'flex',
      '& .examples': {
        flex: 1,
      },
      '& .anchor': {
        width: 192,
      },
    },
    guide: {
      display: 'flex',
      '& .guides': {
        flex: 1,
      },
      '& .anchor': {
        width: 192,
      },
      '& .title': {
        fontSize: 20,
        marginTop: 48,
        fontWeight: 500,
        marginBottom: 16,
        padding: '0 40px',
      },
      '& .paragraph': {
        padding: '0 40px',
        fontSize: 14,
        fontWeight: 400,
        marginTop: 0,
        marginBottom: 0,
      },
      '& .image': {
        padding: '0 40px',
        width: 'calc(100% - 272px)',
        maxWidth: 908,
        marginTop: 16,
        marginBottom: 32,
        boxSizing: 'border-box',
      },
      '& .guide > div': {
        // last child
        '&:last-child img': {
          marginBottom: 0,
        },
      },
    },
    apiTable: {
      width: '100%',
      border: '1px solid  #ddd',
      background: '#fff',
      borderCollapse: 'collapse',
      borderSpacing: 0,
      emptyCells: 'show',
      whiteSpace: 'pre-wrap',

      '& th': {
        background: '#f5f5f5',
        textAlign: 'left',
        whiteSpace: 'nowrap',
      },

      '& td, & th': {
        overflow: 'visible',
        padding: '12px 20px',
        margin: '0',
        border: '1px solid #ddd',
        borderWidth: '0 0 1px 1px',
        fontSize: 'inherit',
      },
    },
  },
  { name: 'doc-markdown' },
);
