"use client"
import { createContext } from 'react';
import { StepsContextProps } from './steps-context.type';

const stepsContext = createContext<StepsContextProps>({});

export default stepsContext;
