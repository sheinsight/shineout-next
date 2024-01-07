import * as React from 'react';
import { FormFunc } from './use-form.type';

export const FormFuncContext = React.createContext<FormFunc | null>(null);
export const useFormFunc = () => React.useContext(FormFuncContext);
