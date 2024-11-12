'use client';

import { createContext } from 'react';

interface AbsoluteContextProps {
  absolute: boolean;
  scrollElRef?: React.RefObject<HTMLElement>;
}


const AbsoluteContext = createContext<AbsoluteContextProps>({
  absolute: false
});

AbsoluteContext.displayName = 'AbsoluteContext';

export default AbsoluteContext;
