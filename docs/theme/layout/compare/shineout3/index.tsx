import useStyles from '../style';
import Button from './button';

const Shineout3 = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <h1 className={classes.title} style={{ textAlign: 'right', margin: 0 }}>
        Shineout 3
      </h1>
      <Button></Button>
    </div>
  );
};

export default Shineout3;
