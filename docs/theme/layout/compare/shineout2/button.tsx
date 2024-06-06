import useStyles from '../style';
import { Button } from 'shineout2';

const ButtonExample = () => {
  const classes = useStyles();
  return (
    <div className={classes.button}>
      <Button type='primary'>SHINEOUT 2.0</Button>
      <Button type='secondary'>SHINEOUT 2.0</Button>
      <Button type='secondary' outline>
        SHINEOUT 2.0
      </Button>
    </div>
  );
};

export default ButtonExample;
