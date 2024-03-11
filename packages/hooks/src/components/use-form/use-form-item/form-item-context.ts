"use client"
import * as React from 'react';

export interface FormItemContextValueType {
  updateError: (name: string, error?: Error) => void;
}

export const FormItemContext = React.createContext<FormItemContextValueType>({
  updateError: () => {},
});
