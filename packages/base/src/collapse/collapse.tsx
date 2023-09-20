// import { } from '@sheinx/hooks';
// import classNames from 'classnames';
import React from 'react';
import { CollapseProps } from './collapse.type';
import groupContext from './group-context';

const Collapse = (props: CollapseProps) => {
  const { children } = props;
  // ...
  const providerValue = {};
  return (
    <groupContext.Provider value={providerValue}>
      <div>{children}</div>
    </groupContext.Provider>
  );
};

export default Collapse;
