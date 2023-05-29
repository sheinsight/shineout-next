import { useEffect } from 'react';
import useStyles from './style';

import Nav from './Nav';
import Menu from './Menu';
import Content from './Content';

const Desktop = () => {
  const classes = useStyles();

  useEffect(() => {}, []);

  return (
    <section className={classes.desktop}>
      <Nav></Nav>
      <div className={classes.main}>
        <Menu></Menu>
        <Content></Content>
      </div>
    </section>
  );
};

export default Desktop;
