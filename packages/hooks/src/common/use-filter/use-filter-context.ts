import React from 'react';

interface FilterContextProps {
  filterText?: string;
}

export const FilterContext = React.createContext<FilterContextProps>({});

FilterContext.displayName = 'FilterContext';
