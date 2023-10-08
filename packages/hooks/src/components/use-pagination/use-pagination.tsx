import { useState } from 'react';
import { extractEventHandlers } from '../../utils';
import { ObjectType } from '../../common/type';
import { BasePaginationProps } from './use-pagination.type';

const usePagination = (props: BasePaginationProps) => {
  const { total: totalProp, pageSize: pageSizeProp, current: currentProp, onChange } = props;

  const [total] = useState(totalProp);
  const [current, setCurrent] = useState(currentProp);
  const [pageSize, setPageSize] = useState(pageSizeProp);

  const handleChange = (current: number, size?: number) => {
    setCurrent(current);
    setPageSize(size || pageSizeProp);

    if (onChange) {
      const sizeChange = pageSize !== size;
      onChange(current, size, sizeChange);
    }
  };

  const getRootProps = <TOther extends ObjectType = ObjectType>(
    externalProps: TOther = {} as TOther,
  ) => {
    const externalEventHandlers = extractEventHandlers(externalProps);
    const mergedEventHandlers = {
      ...externalEventHandlers,
      ...externalProps,
      current,
      pageSize,
    };

    return {
      ...mergedEventHandlers,
    };
  };

  return {
    current: currentProp !== undefined ? currentProp : current,
    pageSize,
    total,
    onChange: handleChange,
    getRootProps,
  };
};

export default usePagination;
