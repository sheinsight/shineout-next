import React, { useMemo } from 'react';
import { Pagination as UnStyledPagination } from '@sheinx/base';
import { usePaginationStyle, useInputStyle, useButtonStyle } from '@sheinx/shineout-style';
import { PaginationProps } from './pagination.type';

const Pagination = (props: PaginationProps) => {
  const paginationStyle = usePaginationStyle();
  const inputStyle = useInputStyle;
  const buttonStyle = useButtonStyle;
  const jssStyle = useMemo(
    () => ({ pagination: paginationStyle, input: inputStyle, button: buttonStyle }),
    [paginationStyle, inputStyle, buttonStyle],
  );
  return <UnStyledPagination {...props} jssStyle={jssStyle}></UnStyledPagination>;
};

Pagination.displayName = 'ShineoutPagination';

export default Pagination;
