"use client"
import * as React from 'react';

export interface FormItemContextValueType {
  label?: any;
  updateError: (name: string, error?: Error) => void;
}

export const FormItemContext = React.createContext<FormItemContextValueType>({
  updateError: () => {},
});

FormItemContext.displayName = 'FormItemContext';
