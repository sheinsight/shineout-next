import { CommonType } from '../common/type';
import { InputClasses } from '../input/input.type';
import { ButtonClasses } from '../button/button.type';
import { PaginationClasses, TextParams } from '../pagination/pagination.type';

export type PaginationMoreTypes = 'prev' | 'next';

export interface PaginationButtonsProps extends Pick<CommonType, 'size'> {
  jssStyle?: {
    input?: () => InputClasses;
    button?: () => ButtonClasses;
    pagination?: () => PaginationClasses;
  };
  disabled?: boolean;
  current: number;
  total: number;
  pageSize: number;
  span: number;
  text?: TextParams;
  mode: 'outline' | 'text';
  onChange: (current: number, pageSize?: number) => void;
}

export type PaginationActionButtonProps = Pick<
  PaginationButtonsProps,
  'disabled' | 'mode' | 'size' | 'jssStyle' | 'total' | 'pageSize' | 'text' | 'current' | 'onChange'
>;
