"use client"
import React, { createContext } from 'react';

const defaultContext = {
  addParent: (_ref: React.MutableRefObject<HTMLElement | null>) => {},
  removeParent: (_ref: React.MutableRefObject<HTMLElement | null>) => {},
  bindChild: (_ref: React.MutableRefObject<HTMLElement | null>) => {},
  removeChild: (_ref: React.MutableRefObject<HTMLElement | null>) => {},
};

const context = createContext(defaultContext);

export default context;
