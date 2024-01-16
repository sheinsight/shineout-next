import React from 'react';
import { Pagination as UnStyledPagination } from '@sheinx/base';
import {
  usePaginationStyle,
  useInputStyle,
  useButtonStyle,
  useSelectStyle,
} from '@sheinx/shineout-style';
import { PaginationProps } from './pagination.type';

const jssStyle = {
  input: useInputStyle,
  button: useButtonStyle,
  select: useSelectStyle,
  pagination: usePaginationStyle,
};
const Pagination = (props: PaginationProps) => {
  return <UnStyledPagination {...props} jssStyle={jssStyle}></UnStyledPagination>;
};

Pagination.displayName = 'ShineoutPagination';

export default Pagination;
