import React, { createContext } from 'react';

const defaultContext = {
  bindChild: (_ref: React.MutableRefObject<HTMLElement | null>) => {},
  removeChild: (_ref: React.MutableRefObject<HTMLElement | null>) => {},
};

const context = createContext(defaultContext);

export default context;
