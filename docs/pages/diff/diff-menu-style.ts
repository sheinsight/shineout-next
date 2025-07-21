import { createUseStyles } from 'react-jss';

export default createUseStyles({
  menu: {
    width: 280,
    height: '100%',
    borderRight: '1px solid #e8e8e8',
    backgroundColor: '#fafafa',
    overflowY: 'auto',
    overflowX: 'hidden',
  },
  menuTitle: {
    padding: '16px 24px',
    fontSize: 16,
    fontWeight: 600,
    color: '#333',
    borderBottom: '1px solid #e8e8e8',
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
    color: '#666',
    transition: 'all 0.2s',
    '&:hover': {
      backgroundColor: '#f0f0f0',
      color: '#333',
    },
    '&.expanded': {
      color: '#333',
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
    padding: '6px 24px 6px 64px',
    fontSize: 14,
    color: '#666',
    cursor: 'pointer',
    transition: 'all 0.2s',
    '&:hover': {
      backgroundColor: '#f0f0f0',
      color: '#333',
    },
    '&.active': {
      backgroundColor: 'rgba(24, 144, 255, 0.1)',
      color: '#1890ff',
      fontWeight: 500,
    },
  },
  subVersionList: {
    margin: 0,
    padding: 0,
    listStyle: 'none',
  },
  stableVersionItem: {
    margin: 0,
    padding: 0,
  },
  stableVersionHeader: {
    padding: '8px 24px 8px 40px',
    fontSize: 14,
    fontWeight: 500,
    color: '#333',
  },
  betaGroupItem: {
    margin: 0,
    padding: 0,
  },
  betaGroupHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '8px 24px 8px 40px',
    cursor: 'pointer',
    fontSize: 14,
    color: '#666',
    transition: 'all 0.2s',
    '&:hover': {
      backgroundColor: '#f0f0f0',
      color: '#333',
    },
    '&.expanded': {
      color: '#333',
      '& $arrow': {
        transform: 'rotate(90deg)',
      },
    },
  },
  betaVersionList: {
    margin: 0,
    padding: 0,
    listStyle: 'none',
  },
  betaVersionItem: {
    margin: 0,
    padding: 0,
  },
  betaVersionHeader: {
    padding: '6px 24px 6px 56px',
    fontSize: 13,
    color: '#999',
  },
});