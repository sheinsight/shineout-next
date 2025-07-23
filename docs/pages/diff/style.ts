import { createUseStyles } from 'react-jss';

export default createUseStyles({
  container: {
    display: 'flex',
    height: '100%',
    width: '100%',
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    height: '100%',
    overflow: 'auto',
    padding: '24px 40px',
    backgroundColor: '#fff',
  },
});