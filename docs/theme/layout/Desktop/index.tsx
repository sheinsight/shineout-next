import { useEffect } from 'react';
import { useRoutes } from 'react-router-dom';
import useStyles from './style';

import Nav from './Nav';
import Menu from './Menu';
import Content from './Content';

import Home from '../../../pages/Home';
import Design from '../../../pages/Design';
import Introduce from '../../../pages/Introduce';
import Component from '../../../pages/Component';
import Changelog from '../../../pages/Changelog';

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

  useEffect(() => {}, []);

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
