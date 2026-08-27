"use client"

import React from 'react';
import type { SemanticClassFn, SemanticStyleFn } from '../common/use-semantic';
import type { CardSemanticKey } from './card.type';

export interface CardContextValue {
  collapsed?: boolean;
  onCollapse: () => void;
  collapsible?: 'bottom' | boolean;
  handleDragMouseDown?: (e: React.MouseEvent) => void;
  semClass?: SemanticClassFn<CardSemanticKey>;
  semStyle?: SemanticStyleFn<CardSemanticKey>;
}

export const CardContext = React.createContext<CardContextValue>({
  collapsed: false,
  collapsible: false,
  onCollapse: () => {},
  handleDragMouseDown: () => {},
});
