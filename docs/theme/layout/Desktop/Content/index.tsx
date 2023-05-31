import React from 'react';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import InputChunk from 'chunk/input';

import useStyles from '../style';

const Content = () => {
  const classes = useStyles();
  const location = useLocation();

  const [, setComponent] = useState<string | undefined>('content');

  useEffect(() => {
    const paths = location.pathname.split('/');
    setComponent(paths.at(-1));
  }, [location]);

  return (
    <div className={classes.content}>
      {InputChunk.examples.map((item, index) => {
        return <div key={index}>{item.component.default()}</div>;
      })}
    </div>
  );
};

export default Content;
