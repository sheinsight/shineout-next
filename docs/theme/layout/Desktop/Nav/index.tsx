import useStyles from '../style';
import { useNavigate } from 'react-router-dom';

const Nav = () => {
  const classes = useStyles();
  const navigate = useNavigate();

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

  return (
    <div className={classes.nav}>
      <ul className='entry'>
        {navs.map((nav) => (
          <li key={nav.title} onClick={() => navigate(nav.path)}>
            {nav.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Nav;
