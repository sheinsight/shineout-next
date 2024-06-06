import { HashRouter as Router, useRoutes } from 'react-router-dom';
import Nav from './desktop/nav';
import Menu from './desktop/menu';
import LayoutDasktop from './desktop';
import Compare from './compare';

const app = (
  <>
    <Nav></Nav>
    <Menu></Menu>
    <LayoutDasktop />
  </>
);

const compare = <Compare></Compare>;

const Routes = () => {
  return useRoutes([
    { path: '/compare', element: compare },
    { path: '*', element: app },
  ]);
};

const Layout = () => (
  <Router>
    <Routes></Routes>
  </Router>
);

export default Layout;
