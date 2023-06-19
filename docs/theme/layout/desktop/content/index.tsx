import React, { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import useStyles from '../style';

const Content = () => {
  const classes = useStyles();
  const location = useLocation();

  const component = useMemo(() => {
    const paths = location.pathname.split('/');

    const componentFlagIndex = paths.findIndex((item) => item === 'component');
    if (componentFlagIndex === -1) return;
    const moduleName = paths[componentFlagIndex + 1]?.toLocaleLowerCase();
    const componentName = paths[componentFlagIndex + 2]?.toLocaleLowerCase();
    if (!componentName) return;
    try {
      return require(`../../../../chunk/${moduleName}/${componentName}.tsx`).default();
    } catch (error) {
      return <div>Error</div>;
    }
  }, [location.pathname]);

  return <div className={classes.content}>{component}</div>;
};

export default Content;
