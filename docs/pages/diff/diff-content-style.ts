import { createStyles } from '../../theme/style/create-styles';

export default createStyles((theme) => ({
  content: {
    maxWidth: 900,
    margin: '0 auto',
    '& h1': {
      fontSize: 32,
      fontWeight: 600,
      marginBottom: 24,
      color: theme.colors.text.primary,
    },
    '& h2': {
      fontSize: 24,
      fontWeight: 600,
      marginTop: 32,
      marginBottom: 16,
      color: theme.colors.text.primary,
    },
    '& h3': {
      fontSize: 18,
      fontWeight: 600,
      marginTop: 24,
      marginBottom: 12,
      color: theme.colors.text.primary,
    },
    '& p': {
      fontSize: 14,
      lineHeight: 1.8,
      marginBottom: 16,
      color: theme.colors.text.secondary,
    },
    '& ul, & ol': {
      marginBottom: 16,
      paddingLeft: 24,
      '& li': {
        fontSize: 14,
        lineHeight: 1.8,
        marginBottom: 8,
        color: theme.colors.text.secondary,
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
      backgroundColor: theme.colors.background.code,
      padding: '2px 4px',
      borderRadius: 3,
      fontSize: 13,
      fontFamily: 'Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace',
    },
    '& blockquote': {
      borderLeft: `4px solid ${theme.colors.primary}`,
      paddingLeft: 16,
      margin: '16px 0',
      color: theme.colors.text.secondary,
    },
    '& table': {
      width: '100%',
      borderCollapse: 'collapse',
      marginBottom: 16,
      '& th, & td': {
        border: `1px solid ${theme.colors.border}`,
        padding: '12px 16px',
        textAlign: 'left',
      },
      '& th': {
        backgroundColor: theme.colors.background.table,
        fontWeight: 600,
      },
    },
  },
  loading: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 200,
    fontSize: 14,
    color: theme.colors.text.secondary,
  },
  error: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 200,
    fontSize: 14,
    color: theme.colors.danger,
  },
  empty: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 200,
    fontSize: 14,
    color: theme.colors.text.disabled,
  },
}), 'diff-content');