import * as React from 'react';

import { FormCommonConfig } from './use-form.type';

export const FormConfigContext = React.createContext<FormCommonConfig>({});
export const useFormConfig = () => React.useContext(FormConfigContext);
