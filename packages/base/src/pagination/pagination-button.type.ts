import { CommonType } from '../common/type';
import { InputClasses } from '../input/input.type';
import { ButtonShape } from '@sheinx/hooks';
import { ButtonClasses } from '../button/button.type';
import { PaginationMoreTypes } from './pagination-buttons.type';
import { PaginationClasses } from '../pagination/pagination.type';

export interface PaginationButtonProps extends Pick<CommonType, 'size' | 'className'> {
  jssStyle: {
    input?: InputClasses;
    button?: ButtonClasses;
    pagination?: PaginationClasses;
  };
  page: number;
  disabled?: boolean;
  type?: 'secondary' | 'primary';
  mode?: 'outline' | 'text';
  shape?: ButtonShape;
  children?: React.ReactNode;
  moreType?: PaginationMoreTypes;
  onMouseEnter?: (moreType: PaginationMoreTypes, is: boolean) => void;
  onMouseLeave?: (moreType: PaginationMoreTypes, is: boolean) => void;
  onClick: (current: number, pageSize?: number) => void;
}
