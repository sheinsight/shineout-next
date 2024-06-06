import useStyles from '../style';
import Button from './button';

const Shineout2 = () => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <h1 className={classes.title} style={{ textAlign: 'right', margin: 0 }}>
        Shineout 2
      </h1>
      <Button></Button>
    </div>
  );
};

export default Shineout2;
