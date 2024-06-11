import { HashRouter, BrowserRouter } from 'react-router-dom';
import Nav from './desktop/nav';
import Menu from './desktop/menu';
import LayoutDasktop from './desktop';

// @ts-ignore
const Router = !window?.__ALITA__ ? HashRouter : BrowserRouter;

const Layout = () => {
  return (
    <>
      <Router
        // @ts-ignore
        basename={window?.__ALITA__ ? '/shineout' : ''}>
        <Nav></Nav>
        <Menu></Menu>
        <LayoutDasktop />
      </Router>
    </>
  );
};

export default Layout;
