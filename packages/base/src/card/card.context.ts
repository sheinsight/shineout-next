"use client"

import React from 'react';
export interface CardContextValue {
  collapsed?: boolean;
  onCollapse: () => void;
  collapsible?: 'bottom' | boolean;
  handleDragMouseDown?: (e: React.MouseEvent) => void;
}

export const CardContext = React.createContext<CardContextValue>({
  collapsed: false,
  collapsible: false,
  onCollapse: () => {},
  handleDragMouseDown: () => {},
});
