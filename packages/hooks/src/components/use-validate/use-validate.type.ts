import { ObjectType } from '../../common/type';
import { FormItemRule } from '../../utils/rule/rule.type';

export interface UseValidateProps {
  rules?: FormItemRule<any>;
  options?: ObjectType;
  shouldSetError?: boolean;
}
