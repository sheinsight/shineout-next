import { useEffect, useState } from 'react';
import { extractEventHandlers } from '../../utils';
import { ObjectType } from '../../common/type';
import { BasePaginationProps } from './use-pagination.type';
import { usePersistFn } from '../../common/use-persist-fn';

const usePagination = (props: BasePaginationProps) => {
  const {
    total: totalProp,
    pageSize: pageSizeProp,
    defaultCurrent,
    current: currentProp,
    onChange,
  } = props;

  const [total] = useState(totalProp);
  const [current, setCurrent] = useState(currentProp !== undefined ? currentProp : defaultCurrent);
  const [pageSize, setPageSize] = useState(pageSizeProp);

  useEffect(() => {
    if (pageSizeProp !== pageSize) setPageSize(pageSizeProp);
  }, [pageSizeProp]);

  useEffect(() => {
    if (currentProp !== undefined && currentProp !== current) setCurrent(currentProp);
  }, [currentProp]);

  const handleChange = usePersistFn((c: number, size?: number) => {
    const newPageSize = size || pageSize;
    const sizeChange = size !== undefined && pageSize !== size;

    // Always update state and trigger onChange, even for the same page
    // This allows handlers to re-execute logic when clicking the same page
    setCurrent(c);
    setPageSize(newPageSize);

    if (onChange) {
      onChange(c, newPageSize, sizeChange);
    }
  });

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
    // current,
    current: currentProp !== undefined ? currentProp : current,
    pageSize,
    total,
    onChange: handleChange,
    getRootProps,
  };
};

export default usePagination;
