import { ObjectType } from '../../../common/type';
import { RuleFunc } from '../../../utils/type';

export interface FormContextValueType {
  errors?: ObjectType<Error>;
  value?: ObjectType;
  formFunc?: {
    setValue: (value: { [key: string]: any }, config?: { validate?: boolean }) => void;
    unbind: (n: string, reserveAble?: boolean) => void;
    bind: (
      n: string,
      df: any,
      validate: (
        name: string,
        value: any,
        formData: ObjectType,
        config: {
          ignoreBind?: boolean;
        },
      ) => void,
    ) => void;
    setError: (n: string, e: Error | undefined) => void;
    clearErrors: () => void;
    validateFields: (names?: string[], config?: { ignoreBind?: boolean }) => Promise<true>;
  };
  disabled?: boolean;
}

export interface BaseFormControlProps<T> {
  name: string | string[];
  defaultValue: T | undefined;
  onChange: ((value: T, ...other: any[]) => void) | undefined;
  reservable: boolean | undefined;
  rules: RuleFunc<T>[] | undefined;
  onError: ((error: Error | undefined) => void) | undefined;
  bind: string[] | undefined;
}
