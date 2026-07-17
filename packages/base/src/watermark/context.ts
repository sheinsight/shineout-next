'use client';

import { createContext, useContext, useEffect } from 'react';

export interface WatermarkContextValue {
  add: (element: HTMLElement) => void;
  remove: (element: HTMLElement) => void;
}

const noop = () => {};

export const DisabledWatermarkContext: WatermarkContextValue = {
  add: noop,
  remove: noop,
};

export const WatermarkContext = createContext<WatermarkContextValue>(DisabledWatermarkContext);

export function useWatermarkTarget(getElement: () => HTMLElement | null | undefined): void {
  const context = useContext(WatermarkContext);

  useEffect(() => {
    const element = getElement();
    if (!element) return undefined;

    context.add(element);
    return () => context.remove(element);
  }, [context, getElement]);
}

export default WatermarkContext;
