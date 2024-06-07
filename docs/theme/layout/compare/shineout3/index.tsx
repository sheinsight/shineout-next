import useStyles from '../style';
import Button from './button';
// import Card from './card'

const Shineout3 = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <h1 className={classes.title} style={{ textAlign: 'right', margin: 0 }}>
        Shineout 3
      </h1>
      <Button></Button>
      {/* <Card></Card> */}
    </div>
  );
};

export default Shineout3;
