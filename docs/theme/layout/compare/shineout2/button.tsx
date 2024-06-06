import useStyles from '../style';
import { Button } from 'shineout2';

const ButtonExample = () => {
  const classes = useStyles();
  return (
    <div className={classes.button}>
      <Button type='primary'>SHEIN</Button>
      <Button type='primary'>SHEIN</Button>
    </div>
  );
};

export default ButtonExample;
