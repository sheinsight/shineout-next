import React from 'react';

interface CardAccordionContextValue {
  activeId: any;
  onActiveChange: (id: any) => void;
  getDefaultId: () => any;
  inAccordion: boolean;
}

export const defualtCardAccordionContextValue = {
  activeId: null,
  onActiveChange: () => {},
  getDefaultId: () => null,
  inAccordion: false,
};
export const CardAccordionContext = React.createContext<CardAccordionContextValue>(
  defualtCardAccordionContextValue,
);
