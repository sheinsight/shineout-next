import Password from './base-password';

import { InputPasswordProps, BasePasswordProps } from './password.type';
import useFieldCommon from '../hooks/use-field-common';

export default (props: InputPasswordProps) => {
  return useFieldCommon<BasePasswordProps, BasePasswordProps['value']>(props, Password);
};
