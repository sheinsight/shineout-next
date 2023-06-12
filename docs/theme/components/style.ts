import { createUseStyles } from 'react-jss';

export default createUseStyles({
  pages: {},
  header: {
    padding: '0 56px',
    '& .title': {
      fontSize: 32,
      marginBottom: 0,
    },

    '& .subtitle': {
      fontSize: 14,
      marginBottom: 0,
      color: 'rgb(78,89,105)',
    },
  },
});
