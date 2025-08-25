import { createUseStyles } from 'react-jss';
import { navHeight } from '../style';

export default createUseStyles(
  {
    nav: {
      position: 'sticky',
      top: 0,
      height: navHeight,
      width: '100%',
      display: 'flex',
      backgroundColor: 'var(--soui-neutral-fill-1)',
      borderBottom: '1px solid var(--soui-neutral-border-1)',
      zIndex: 2,
      '& .logo': {
        display: 'flex',
        alignItems: 'center',
        marginLeft: 24,
        cursor: 'pointer',
      },
    },

    entry: {
      width: '100%',
      display: 'flex',
      gap: 12,
      listStyle: 'none',
      alignItems: 'center',
      justifyContent: 'flex-end',
      margin: '0 16px',
    }
  },
  { name: 'doc-nav' },
);
