import { createUseStyles } from 'react-jss';

export default createUseStyles({
  contentCard: {
    border: 'none',
    boxShadow: 'none',
    padding: 0,
    '& .so-card-body': {
      padding: 0,
    },
  },
  content: {
    maxWidth: 900,
    margin: '0 auto',
    '& h1': {
      fontSize: 32,
      fontWeight: 600,
      marginBottom: 24,
      color: '#333',
    },
    '& h2': {
      fontSize: 24,
      fontWeight: 600,
      marginTop: 32,
      marginBottom: 16,
      color: '#333',
    },
    '& h3': {
      fontSize: 18,
      fontWeight: 600,
      marginTop: 24,
      marginBottom: 12,
      color: '#333',
    },
    '& p': {
      fontSize: 14,
      lineHeight: 1.8,
      marginBottom: 16,
      color: '#666',
    },
    '& ul, & ol': {
      marginBottom: 16,
      paddingLeft: 24,
      '& li': {
        fontSize: 14,
        lineHeight: 1.8,
        marginBottom: 8,
        color: '#666',
      },
    },
    '& pre': {
      backgroundColor: '#1e1e1e',
      borderRadius: 4,
      padding: 16,
      marginBottom: 16,
      overflow: 'auto',
    },
    '& code': {
      backgroundColor: '#f5f5f5',
      padding: '2px 4px',
      borderRadius: 3,
      fontSize: 13,
      fontFamily: 'Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace',
    },
    '& blockquote': {
      borderLeft: '4px solid #1890ff',
      paddingLeft: 16,
      margin: '16px 0',
      color: '#666',
    },
    '& table': {
      width: '100%',
      borderCollapse: 'collapse',
      marginBottom: 16,
      '& th, & td': {
        border: '1px solid #e8e8e8',
        padding: '12px 16px',
        textAlign: 'left',
      },
      '& th': {
        backgroundColor: '#fafafa',
        fontWeight: 600,
      },
    },
  },
  loading: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 400,
    flexDirection: 'column',
  },
  errorContainer: {
    padding: '40px 24px',
    maxWidth: 600,
    margin: '0 auto',
  },
  emptyContainer: {
    padding: '80px 24px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  filePath: {
    cursor: 'pointer',
    backgroundColor: '#f5f5f5',
    padding: '2px 6px',
    borderRadius: 3,
    fontSize: 13,
    fontFamily: 'Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace',
    transition: 'all 0.2s',
    '&:hover': {
      backgroundColor: '#e6f7ff',
      color: '#1890ff',
    },
    '&:active': {
      backgroundColor: '#bae7ff',
    },
  },
});