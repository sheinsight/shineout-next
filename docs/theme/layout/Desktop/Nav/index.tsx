import useStyles from '../style';

const Nav = () => {
  const classes = useStyles();

  return (
    <div className={classes.nav}>
      <ul className={''}>
        <li>Home</li>
        <li>Design</li>
        <li>Introduce</li>
        <li>Component</li>
        <li>Changelog</li>
      </ul>
    </div>
  );
};

export default Nav;
