import * as React from 'react';
import { FormItemContextValueType } from './useFormControl.types';

export const FormItemContext = React.createContext<FormItemContextValueType>({
  updateError: () => {},
});
