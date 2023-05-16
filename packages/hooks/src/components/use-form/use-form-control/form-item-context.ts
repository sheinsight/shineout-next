import * as React from 'react';

import { FormItemContextValueType } from './use-form-control.type';

export const FormItemContext = React.createContext<FormItemContextValueType>({
  updateError: () => {},
});
