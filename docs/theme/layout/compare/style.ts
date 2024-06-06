import { createUseStyles } from 'react-jss';

export default createUseStyles(
  {
    wrapper: {
      display: 'flex',
      height: '100%',
    },
    left: {
      flex: 1,
      minWidth: 0,
      borderRight: '1px solid #eee',
      padding: 20,
      height: '100%',
    },
    right: {
      flex: 1,
      minWidth: 0,
      padding: 20,
      height: '100%',
    },
  },
  { name: 'doc-compare' },
);
