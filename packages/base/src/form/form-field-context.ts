import React from 'react';

interface FormFieldContextProps {
  fieldId?: string;
  separator: string;
}

export const FormFieldContext = React.createContext<FormFieldContextProps>({
  fieldId: undefined,
  separator: '__separator__',
});

FormFieldContext.displayName = 'FormFieldContext';
