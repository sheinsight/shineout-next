'use client';

import { createContext } from 'react';

const AbsoluteContext = createContext<boolean>(false);

AbsoluteContext.displayName = 'AbsoluteContext';

export default AbsoluteContext;
