import { HashRouter as Router, useLocation } from 'react-router-dom';
import Nav from './desktop/nav';
import Menu from './desktop/menu';
import LayoutDasktop from './desktop';
import useStyles from './style'

const LayoutWithoutRouter = () => {
  const classes = useStyles();

  const isFullScreen = useLocation().pathname?.includes('/home')

  return (
    <>
      {!isFullScreen && <Nav />}
      <main className={classes.container}>
        {!isFullScreen && <Menu />}
        <LayoutDasktop isFullScreen={isFullScreen} />
      </main>
    </>
  )
}

const Layout = () => (
  <Router>
    <LayoutWithoutRouter />
  </Router>
)

export default Layout;
