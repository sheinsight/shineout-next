import { CommonType } from '../common/type';
import { InputClasses } from '../input/input.type';
import { ButtonClasses } from '../button/button.type';
import { PaginationClasses, TextParams } from '../pagination/pagination.type';

export interface PaginationSimpleProps extends Pick<CommonType, 'size'> {
  jssStyle?: {
    input?: () => InputClasses;
    button?: () => ButtonClasses;
    pagination?: () => PaginationClasses;
  };
  disabled?: boolean;
  current: number;
  total: number;
  pageSize: number;
  mode: 'outline' | 'text';
  text: TextParams;
  onChange: (current: number, pageSize?: number) => void;
}
