// 把id放到context中
import React from 'react';

interface FormFieldContextProps {
  fieldId: string;
  separator: string;
}

export const FormFieldContext = React.createContext<FormFieldContextProps>({
  fieldId: '',
  separator: '__separator__',
});
