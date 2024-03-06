import { HashRouter as Router } from 'react-router-dom';
import Nav from './desktop/nav';
import Menu from './desktop/menu';
import LayoutDasktop from './desktop';

const Layout = () => {
  return (
    <>
      <Router>
        <Nav></Nav>
        <Menu></Menu>
        <LayoutDasktop />
      </Router>
    </>
  );
};

export default Layout;
