import { ObjectType } from '../../common/type';

export interface FormItemContextValueType {
  updateError: (name: string, error?: Error) => void;
}
export interface FormContextValueType {
  errors?: ObjectType<Error>;
  value?: ObjectType;
  formFunc?: {
    setValue: (n: string, v: any) => void;
    unbind: (n: string, reserveAble?: boolean) => void;
    bind: (n: string, df: any, validate: () => void) => void;
  };
}

export interface BaseFormControlProps<T> {
  name: string;
  defaultValue: T | undefined;
  onChange: ((value: T, ...other: any[]) => void) | undefined;
  reservable: boolean | undefined;
}
