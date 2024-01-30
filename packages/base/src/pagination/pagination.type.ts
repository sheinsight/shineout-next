import { ButtonClasses } from '../button/button.type';
import { SelectClasses } from '@sheinx/shineout-style';
import { InputClasses } from '../input/input.type';
import { CommonType } from '../common/type';

export type AlignType = 'left' | 'center' | 'right';

export type LayoutType = (
  | 'links'
  | 'list'
  | 'jumper'
  | 'simple'
  | ((props: PaginationProps) => React.ReactNode)
)[];

export interface PaginationJssStyle {
  input?: () => InputClasses;
  select?: () => SelectClasses;
  button?: () => ButtonClasses;
  pagination?: () => PaginationClasses;
}

export interface PaginationClasses {
  pagination: string;
  section: string;
  buttons: string;
  left: string;
  right: string;
  center: string;
  jumper: string;
  split: string;
  icon: string;
  simple: string;
  small: string;
  large: string;
  sizeList: string;
}

export interface TextParams {
  prev?: string;
  next?: string;
  page?: string;
  jumper?: string;
}

export interface PaginationProps
  extends Pick<CommonType, 'style' | 'className' | 'size'>,
    Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  align?: 'left' | 'center' | 'right';
  pageSize?: number;
  total?: number;
  current?: number;
  span?: number;
  defaultCurrent?: number;
  disabled?: boolean;
  layout?: LayoutType;
  mode?: 'outline' | 'text';
  onChange?: (current: number, pageSize: number, sizeChange?: boolean) => void;
  pageSizeList?: number[];
  text?: TextParams;
  simple?: boolean;
  jssStyle?: PaginationJssStyle;
}
