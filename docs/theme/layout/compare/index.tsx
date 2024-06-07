import React from 'react';
import useStyles from './style';
import Shineout2 from './shineout2';
import Shineout3 from './shineout3';

const Compare = () => {
  const classes = useStyles();
  return (
    <div className={classes.wrapper}>
      <div className={classes.left}>
        <Shineout2></Shineout2>
      </div>
      <div className={classes.right}>
        <Shineout3></Shineout3>
      </div>
    </div>
  );
};

export default Compare;
