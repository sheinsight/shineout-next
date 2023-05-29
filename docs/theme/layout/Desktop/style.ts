import { createUseStyles } from 'react-jss';

export default createUseStyles({
  desktop: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },

  nav: {
    height: 59,
    backgroundColor: '#ffffff',
    borderBottom: '1px solid #e5e6eb',
  },

  main: {
    flex: 1,
    display: 'flex',
  },

  menu: {
    width: 259,
    borderRight: '1px solid #e5e6eb',
  },

  content: {
    flex: 1,
  },
});
