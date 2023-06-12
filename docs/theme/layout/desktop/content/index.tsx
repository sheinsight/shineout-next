import React, { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import useStyles from '../style';

const Content = () => {
  const classes = useStyles();
  const location = useLocation();

  const component = useMemo(() => {
    const paths = location.pathname.split('/');
    const componentName = paths[2]?.toLocaleLowerCase();

    if (!componentName) return;

    try {
      return require(`../../../../chunk/${componentName}.tsx`).default();
    } catch (error) {
      return <div>Error</div>;
    }
  }, [location.pathname]);

  return <div className={classes.content}>{component}</div>;
};

export default Content;
