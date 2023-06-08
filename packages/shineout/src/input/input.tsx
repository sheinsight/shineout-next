import Input from './base-input';
import { InputProps, BaseInputProps } from './input.type';
import useFieldCommon from '../hooks/use-field-common';
export default (props: InputProps) => {
  return useFieldCommon<BaseInputProps, BaseInputProps['value']>(props, Input);
};
