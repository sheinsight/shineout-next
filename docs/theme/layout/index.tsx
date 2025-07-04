<<<<<<< HEAD
import { HashRouter, BrowserRouter } from 'react-router-dom';
=======
import { HashRouter as Router, useLocation } from 'react-router-dom';
>>>>>>> dev-3.8.0
import Nav from './desktop/nav';
import Menu from './desktop/menu';
import LayoutDasktop from './desktop';
import useStyles from './style'

<<<<<<< HEAD


// @ts-ignore
const Router = !window?.__ALITA__ ? HashRouter : BrowserRouter;

const Layout = () => {
=======
const LayoutWithoutRouter = () => {
>>>>>>> dev-3.8.0
  const classes = useStyles();

  const isFullScreen = useLocation().pathname?.includes('/home')

  return (
    <>
<<<<<<< HEAD
      <Router
        // @ts-ignore
        basename={window?.__ALITA__ ? '/shineout' : ''}>
        <Nav></Nav>
        <main className={classes.container}>
          <Menu></Menu>
          <LayoutDasktop />
        </main>
      </Router>
=======
      {!isFullScreen && <Nav />}
      <main className={classes.container}>
        {!isFullScreen && <Menu />}
        <LayoutDasktop isFullScreen={isFullScreen} />
      </main>
>>>>>>> dev-3.8.0
    </>
  )
}

const Layout = () => (
  <Router>
    <LayoutWithoutRouter />
  </Router>
)

export default Layout;
