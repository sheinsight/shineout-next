import { useState, useMemo } from 'react';
import usePersistFn from '../../common/use-persist-fn';

interface TablePaginationProps {
  data: any[];
  current: number;
  pageSize: number;
  defaultCurrent: number;
  loading: boolean;
  onChange: (current: number, pageSize: number) => void;
}

const useTablePagination = (props: TablePaginationProps) => {
  const [current, setCurrent] = useState<number>(props.defaultCurrent || 1);
  const [pageSize, setPageSize] = useState<number>(props.pageSize || 10);

  const handleChange = usePersistFn((current: number, pageSize: number) => {
    setCurrent(current);
    setPageSize(pageSize);
    if (props.onChange) props.onChange(current, pageSize);
  });

  const getPager = (data: any[]) => {
    const total = Array.isArray(data) ? data.length : 0;
    return {
      current: props.current || current,
      pageSize: props.pageSize || pageSize,
      total,
      disabled: props.loading,
      onChange: handleChange,
    };
  };

  const getData = (data: any[], pageSize: number, current: number) => {
    if (!Array.isArray(data)) return data;
    if (data.length <= pageSize) return data;
    const start = (current - 1) * pageSize;
    return data.slice(start, start + pageSize);
  };

  const page = getPager(props.data);
  const data = useMemo(
    () => getData(props.data, page.pageSize, page.current),
    [props.data, page.pageSize, page.current],
  );
  return {
    ...page,
    data,
  };
};

export default useTablePagination;
