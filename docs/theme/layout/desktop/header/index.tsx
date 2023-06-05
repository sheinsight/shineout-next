import { useSnapshot } from 'valtio';
import useStyles from '../style';
import store from '../../../store';

interface HeaderProps {
  example: any;
}

const Header = (props: HeaderProps) => {
  const classes = useStyles();
  const state = useSnapshot(store);

  const { example } = props;
  const { header } = example;

  return (
    <div className={classes.header}>
      <h1 className='title'>{header.title[state.locales]}</h1>
      <p className='subtitle'>{header.describe[state.locales]}</p>
    </div>
  );
};

export default Header;
