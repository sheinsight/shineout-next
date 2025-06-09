import { HashRouter as Router, useLocation } from 'react-router-dom';
import Nav from './desktop/nav';
import Menu from './desktop/menu';
import LayoutDasktop from './desktop';
import useStyles from './style'



const Layout = () => {
  const classes = useStyles();
  return (
    <>
      <Router>
        <Nav></Nav>
        <main className={classes.container}>
          <Menu></Menu>
          <LayoutDasktop />
        </main>
      </Router>
    </>
  )
}

export default Layout;
