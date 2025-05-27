import React from 'react';

interface FilterContextProps {
  filterText?: string;
  highlight?: boolean;
}

export const FilterContext = React.createContext<FilterContextProps>({});

FilterContext.displayName = 'FilterContext';
