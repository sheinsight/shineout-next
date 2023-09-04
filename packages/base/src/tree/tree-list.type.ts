import { CommonType } from '../common/type';

export interface TreeListProps extends Pick<CommonType, 'className'> {
  expanded: boolean;
}
