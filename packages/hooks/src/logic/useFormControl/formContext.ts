import * as React from 'react';
import { ObjectType } from '../../common/type';

export interface FormContextType {
  errors?: ObjectType<Error>;
  value?: ObjectType;
  formFunc?: {
    setValue: (n: string, v: any) => void;
    unbind: (n: string, reserveAble?: boolean) => void;
    bind: (n: string, df: any, validate: () => void) => void;
  };
}
export const FormContext = React.createContext<FormContextType>({});
