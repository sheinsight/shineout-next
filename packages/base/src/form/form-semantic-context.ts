"use client"

import React from 'react';
import type { SemanticClassFn, SemanticStyleFn } from '../common/use-semantic';
import type { FormSemanticKey } from './form.type';

export interface FormSemanticContextValue {
  semClass?: SemanticClassFn<FormSemanticKey>;
  semStyle?: SemanticStyleFn<FormSemanticKey>;
}

export const FormSemanticContext = React.createContext<FormSemanticContextValue>({});
