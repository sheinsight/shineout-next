import Number from './base-number';

import { InputNumberProps, BaseNumberProps } from './number.type';
import useFieldCommon from '../hooks/use-field-common';

export default (props: InputNumberProps) => {
  return useFieldCommon<BaseNumberProps, BaseNumberProps['value']>(props, Number);
};
