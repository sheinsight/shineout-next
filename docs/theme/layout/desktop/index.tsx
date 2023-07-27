import { useRoutes } from 'react-router-dom';
import useStyles from './style';

import Nav from './nav';
import Menu from './menu';
import Content from './content';
// import Anchor from './anchor';

import Home from '../../../pages/home';
import Design from '../../../pages/design';
import Introduce from '../../../pages/introduce';
import Component from '../../../pages/component';
import Changelog from '../../../pages/changelog';
import Debugger from '../../../pages/debug';

const Desktop = () => {
  const classes = useStyles();

  const routes = [
    {
      path: ':name?/home',
      element: <Home />,
    },
    {
      path: ':name?/design',
      element: <Design />,
    },
    {
      path: ':name?/introduce',
      element: <Introduce />,
    },
    {
      path: ':name?/component/:name?/:name?',
      element: (
        <>
          <Menu></Menu>
          <Component>
            <Content></Content>
          </Component>
        </>
      ),
      children: [],
    },
    {
      path: ':name?/changelog',
      element: <Changelog />,
    },
    {
      path: ':name?/debugger',
      element: <Debugger />,
    },
  ];

  function Routes() {
    return useRoutes(routes);
  }

  return (
    <section id='layout' className={classes.desktop}>
      <Nav></Nav>
      <Routes></Routes>
    </section>
  );
};

export default Desktop;
