import * as React from 'react';

import { ObjectType } from '../../common/type';

export const FormConfigContext = React.createContext<ObjectType>({});
export const useFormConfig = () => React.useContext(FormConfigContext);
