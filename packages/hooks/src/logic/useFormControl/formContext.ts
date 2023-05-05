import * as React from 'react';
import { FormContextValueType } from './useFormControl.types';

export const FormContext = React.createContext<FormContextValueType>({});
