import { useNavigate } from 'react-router-dom';
import { useSnapshot } from 'valtio';
import store from '../../../store';
import useStyles from '../style';

const Nav = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const state = useSnapshot(store);

  const navs = [
    {
      title: 'Home',
      path: '/home',
    },
    {
      title: 'Design',
      path: '/design',
    },
    {
      title: 'Introduce',
      path: '/introduce',
    },
    {
      title: 'Component',
      path: '/component',
    },
    {
      title: 'Changelog',
      path: '/changelog',
    },
  ];

  const handleChangeLocales = () => {
    store.locales = state.locales === 'en' ? 'cn' : 'en';
  };

  return (
    <div className={classes.nav}>
      <ul className='entry'>
        {navs.map((nav) => (
          <li key={nav.title} onClick={() => navigate(nav.path)}>
            {nav.title}
          </li>
        ))}
        <li onClick={handleChangeLocales}>{state.locales.toLocaleUpperCase()}</li>
      </ul>
    </div>
  );
};

export default Nav;
