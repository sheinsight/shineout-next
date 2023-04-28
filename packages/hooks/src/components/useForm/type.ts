import { AddNoProps, ObjectType } from '../../common/type';

export type useFormParams = {
  value?: any;
  defaultValue?: any;
  onChange?: (value: any) => void;
  onSubmit?: (value: any) => void;
  onReset?: () => void;
};

export type FormThis = {
  defaultValues: ObjectType;
  rules: ObjectType;
  mounted: boolean;
  removeArr: Set<string>;
  removeTimer?: number;
};

export type UseFormOwnProps = {
  onSubmit: any;
  onReset: any;
};

export type UseFormProps<TOther = Record<string, unknown>> = AddNoProps<UseFormOwnProps, TOther>;
