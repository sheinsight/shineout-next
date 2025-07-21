import { createStyles } from '../../theme/style/create-styles';

export default createStyles((theme) => ({
  container: {
    display: 'flex',
    height: '100%',
    width: '100%',
    backgroundColor: theme.colors.background.default,
  },
  content: {
    flex: 1,
    height: '100%',
    overflow: 'auto',
    padding: '24px 40px',
    backgroundColor: theme.colors.background.default,
  },
}), 'diff-page');