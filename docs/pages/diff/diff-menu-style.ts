import { createStyles } from '../../theme/style/create-styles';

export default createStyles((theme) => ({
  menu: {
    width: 280,
    height: '100%',
    borderRight: `1px solid ${theme.colors.border}`,
    backgroundColor: theme.colors.background.default,
    overflowY: 'auto',
    overflowX: 'hidden',
  },
  menuTitle: {
    padding: '16px 24px',
    fontSize: 16,
    fontWeight: 600,
    color: theme.colors.text.primary,
    borderBottom: `1px solid ${theme.colors.border}`,
  },
  menuList: {
    margin: 0,
    padding: 0,
    listStyle: 'none',
  },
  versionItem: {
    margin: 0,
    padding: 0,
  },
  versionHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '8px 24px',
    cursor: 'pointer',
    fontSize: 14,
    color: theme.colors.text.secondary,
    transition: 'all 0.2s',
    '&:hover': {
      backgroundColor: theme.colors.background.hover,
      color: theme.colors.text.primary,
    },
    '&.expanded': {
      color: theme.colors.text.primary,
      '& $arrow': {
        transform: 'rotate(90deg)',
      },
    },
    '&.selected': {
      fontWeight: 600,
    },
  },
  arrow: {
    display: 'inline-block',
    marginRight: 8,
    fontSize: 10,
    transition: 'transform 0.2s',
  },
  versionName: {
    flex: 1,
  },
  componentList: {
    margin: 0,
    padding: '0 0 8px 0',
    listStyle: 'none',
  },
  componentItem: {
    padding: '6px 24px 6px 48px',
    fontSize: 14,
    color: theme.colors.text.secondary,
    cursor: 'pointer',
    transition: 'all 0.2s',
    '&:hover': {
      backgroundColor: theme.colors.background.hover,
      color: theme.colors.text.primary,
    },
    '&.active': {
      backgroundColor: theme.colors.primary + '10',
      color: theme.colors.primary,
      fontWeight: 500,
    },
  },
}), 'diff-menu');