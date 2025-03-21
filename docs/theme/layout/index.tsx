import { HashRouter, BrowserRouter } from 'react-router-dom';
import Nav from './desktop/nav';
import Menu from './desktop/menu';
import LayoutDasktop from './desktop';
import useStyles from './style'



// @ts-ignore
const Router = !window?.__ALITA__ ? HashRouter : BrowserRouter;

const Layout = () => {
  const classes = useStyles();
  return (
    <>
      <Router
        // @ts-ignore
        basename={window?.__ALITA__ ? '/shineout' : ''}>
        <Nav></Nav>
        <main className={classes.container}>
          <Menu></Menu>
          <LayoutDasktop />
        </main>
      </Router>
    </>
  );
};

export default Layout;
