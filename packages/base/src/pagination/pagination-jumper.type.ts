import { CommonType } from '../common/type';
import { InputClasses } from '../input/input.type';
import { ButtonClasses } from '../button/button.type';
import { PaginationClasses, PaginationSemanticKey, TextParams } from '../pagination/pagination.type';
import type { SemanticClassFn, SemanticStyleFn } from '../common/use-semantic';

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
  semClass: SemanticClassFn<PaginationSemanticKey>;
  semStyle: SemanticStyleFn<PaginationSemanticKey>;
}
