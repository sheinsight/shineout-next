import * as React from 'react';

import { FormContextValueType } from './use-form-control.type';

export const FormContext = React.createContext<FormContextValueType>({});
