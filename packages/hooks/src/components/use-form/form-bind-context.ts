import * as React from 'react';

import { FormContextValueType } from './use-form.type';

export const FormBindContext = React.createContext<FormContextValueType>({});

export const useFormBind = () => React.useContext(FormBindContext);
