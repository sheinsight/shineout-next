import { useRoutes } from 'react-router-dom';
import useStyles from './style';

import Nav from './nav';
import Menu from './menu';
import Content from './content';
import Anchor from './anchor';

import Home from '../../../pages/home';
import Design from '../../../pages/design';
import Introduce from '../../../pages/introduce';
import Component from '../../../pages/component';
import Changelog from '../../../pages/changelog';

const Desktop = () => {
  const classes = useStyles();

  const routes = [
    {
      path: '/home',
      element: <Home />,
    },
    {
      path: '/design',
      element: <Design />,
    },
    {
      path: '/introduce',
      element: <Introduce />,
    },
    {
      path: '/component/:name?',
      element: (
        <Component>
          <Menu></Menu>
          <Content></Content>
          <Anchor></Anchor>
        </Component>
      ),
      children: [],
    },
    {
      path: '/Changelog',
      element: <Changelog />,
    },
  ];

  function Routes() {
    return useRoutes(routes);
  }

  return (
    <section className={classes.desktop}>
      <Nav></Nav>
      <div className={classes.main}>
        <Routes></Routes>
      </div>
    </section>
  );
};

export default Desktop;
