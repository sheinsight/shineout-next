import React from 'react';
import { Button } from 'shineout2';
import { Button as NewButton } from 'shineout';
import useStyles from './style';

const Compare = () => {
  const classes = useStyles();
  return (
    <div className={classes.wrapper}>
      <div className={classes.left}>
        <Button type='primary'>shineout2</Button>
      </div>
      <div className={classes.right}>
        <NewButton type='primary'>shineout3</NewButton>
      </div>
    </div>
  );
};

export default Compare;
