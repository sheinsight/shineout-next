"use client"
import { createContext } from 'react';
import { ObjectType } from '@sheinx/hooks';

const groupContext = createContext<ObjectType>({});

groupContext.displayName = 'RadioGroupContext';

export default groupContext;
