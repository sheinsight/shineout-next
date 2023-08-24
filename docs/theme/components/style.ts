import { createUseStyles } from 'react-jss';

export default createUseStyles({
  pages: {},
  header: {
    color: 'rgba(20, 23, 55, 1)',
    padding: '0 56px',
    borderBottom: '1px solid rgba(232, 235, 240, 1)',
    '& .title': {
      fontSize: 36,
      fontWeight: 500,
      marginBottom: 0,
      marginTop: 32,
    },

    '& .subtitle': {
      fontSize: 14,
      marginBottom: 0,
      marginTop: 12,
      color: 'rgb(78,89,105)',
    },
  },
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
  guide: {
    color: '#141737',

    '& .title': {
      fontSize: 20,
      marginTop: 48,
      fontWeight: 500,
      marginBottom: 0,
      padding: '0 40px',
    },
    '& .paragraph': {
      padding: '0 40px',
      fontSize: 14,
      fontWeight: 400,
      marginTop: 16,
      marginBottom: 0,
    },
    '& .image': {
      padding: '0 40px',
      width: 'calc(100% - 272px)',
      marginTop: 16,
      marginBottom: 32,
      boxSizing: 'border-box',
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
});
