import { createContext } from 'react';

export interface CardGroupContextValue {
  container: HTMLElement | null;
}
export const CardGroupContext = createContext<CardGroupContextValue>({ container: null });
