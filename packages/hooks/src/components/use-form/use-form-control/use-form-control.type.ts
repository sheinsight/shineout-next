import { ObjectType } from '../../../common/type';
import { FormItemRule } from '../../../utils/rule/rule.type';

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
    combineRules: <ValueItem>(
      name: string,
      propRules: FormItemRule<ValueItem>,
    ) => FormItemRule<ValueItem>;
    validateFields: (names?: string[], config?: { ignoreBind?: boolean }) => Promise<true>;
  };
  disabled?: boolean;
}

export interface BaseFormControlProps<T> {
  name: string | string[];
  defaultValue: T | undefined;
  onChange: ((value: T, ...other: any[]) => void) | undefined;
  reservable: boolean | undefined;
  rules: FormItemRule<T> | undefined;
  onError: ((error: Error | undefined) => void) | undefined;
  bind: string[] | undefined;
}
