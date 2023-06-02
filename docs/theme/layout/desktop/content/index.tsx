import React from 'react';
import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import Example from '../../../components/example';
import useStyles from '../style';

interface Locales {
  en?: string;
  cn?: string;
}
interface ExampleProps {
  prop: string;
  propName: Locales;
  propDescribe: Locales;
}

interface ChunkProps {
  title: {
    title: string;
    group: string;
    order: number;
  };
  header: {
    title: Locales;
    describe: Locales;
  };
  examples: ExampleProps[];
}

const Content = () => {
  const classes = useStyles();
  const location = useLocation();

  const example = useMemo(() => {
    const paths = location.pathname.split('/');
    const componentName = paths.at(-1);
    let component: ChunkProps;
    try {
      component = require(`../../../../chunk/${componentName?.toLocaleLowerCase()}.ts`)?.default;
      return component;
    } catch (error) {
      return null;
    }
  }, [location.pathname]);

  return (
    <div className={classes.content}>
      {example &&
        example.examples.map((item, index) => {
          return (
            <div key={index}>
              <Example example={item}></Example>
            </div>
          );
        })}
    </div>
  );
};

export default Content;
