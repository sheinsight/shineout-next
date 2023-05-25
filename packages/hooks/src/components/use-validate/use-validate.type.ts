import { ObjectType } from '../../common/type';
import { RuleFunc } from '../../utils/type';

export interface UseValidateProps {
  rules?: Array<RuleFunc>;
  options?: ObjectType;
  shouldSetError?: boolean;
}
