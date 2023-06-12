import { useNavigate, useLocation } from 'react-router-dom';
import { useSnapshot } from 'valtio';
import store from '../../../store';
import useStyles from '../style';

const Nav = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const state = useSnapshot(store);
  const location = useLocation();

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
      path: `/${state.locales}/component`,
    },
    {
      title: 'Changelog',
      path: '/changelog',
    },
  ];

  const handleChangeLocales = () => {
    const nextLocales = state.locales === 'en' ? 'cn' : 'en';
    store.locales = nextLocales;

    const nextPath = location.pathname.replace(`/${state.locales}/`, `/${nextLocales}/`);

    navigate(nextPath);
  };

  const handleChangeEnv = () => {
    store.env = state.env === 'SHEIN' ? 'GitHub' : 'SHEIN';
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
        <li onClick={handleChangeEnv}>{state.env}</li>
      </ul>
    </div>
  );
};

export default Nav;
