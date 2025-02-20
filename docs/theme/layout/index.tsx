import { HashRouter as Router, useLocation } from 'react-router-dom';
import Nav from './desktop/nav';
import Menu from './desktop/menu';
import LayoutDasktop from './desktop';
import useStyles from './style'



const LayoutDesktop = () => {
  const location = useLocation();
  const isFullScreen = location.pathname.includes('/home');

  return (
    <>
      {!isFullScreen && <Nav />}
      {!isFullScreen && <Menu />}
      <LayoutDasktop isFullScreen={isFullScreen}  />
    </>
  )
}

const Layout = () => (
  <>
    <Router>
      <LayoutDesktop />
    </Router>
  </>
);

export default Layout;
