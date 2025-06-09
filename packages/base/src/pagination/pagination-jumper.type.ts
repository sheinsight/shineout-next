import { CommonType } from '../common/type';
import { InputClasses } from '../input/input.type';
import { ButtonClasses } from '../button/button.type';
import { PaginationClasses, TextParams } from '../pagination/pagination.type';

export interface PaginationJumperProps extends Pick<CommonType, 'size'> {
  jssStyle?: {
    input?: () => InputClasses;
    button?: () => ButtonClasses;
    pagination?: () => PaginationClasses;
  };
  total: number;
  current?: number;
  simple?: boolean;
  pageSize: number;
  text: TextParams;
  disabled?: boolean;
  onChange: (current: number, pageSize?: number) => void;
}
