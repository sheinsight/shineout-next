import { createContext } from 'react';
import { ObjectType } from '@sheinx/hooks';

const groupContext = createContext<ObjectType>({});

export default groupContext;
