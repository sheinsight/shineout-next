'use client';

import { createContext } from 'react';

interface AbsoluteContextProps {
  absolute: boolean;
  follow?: boolean;
  scrollContainer?: HTMLElement | null;
}


const AbsoluteContext = createContext<AbsoluteContextProps>({
  absolute: false
});

AbsoluteContext.displayName = 'AbsoluteContext';

export default AbsoluteContext;
