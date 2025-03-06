import { useState, useMemo, useEffect } from 'react';
import usePersistFn from '../../common/use-persist-fn';
import { TableColumnItem, BaseTableProps } from './use-table.type';
import { isFunc } from '../../utils/is';
import { KeygenResult } from '../../common/type';

export interface UseTableSorterProps<Item = any>
  extends Pick<BaseTableProps<Item>, 'onSortCancel' | 'sorter' | 'data'> {
  columns?: TableColumnItem<Item>[];
}
export interface FilterInfo<T> {
  value?: any
  onFilter?: (value: any, row: T) => boolean;
}

export type FilterMap<T> = Map<KeygenResult, FilterInfo<T>>;

const useTableFilter = <Item = any>(props: UseTableSorterProps<Item>) => {
  const [filterInfo, setFilterInfo] = useState<FilterMap<Item>>(new Map());

  const activeFilters = useMemo(() => {
    return Array.from(filterInfo.keys()).filter((key) => {
      return filterInfo.get(key)?.value !== undefined;
    });
  }, [filterInfo]);

  const filteredData = useMemo(() => {
    if(activeFilters.length === 0) return props.data;
    return props.data?.filter((item) => {
      return activeFilters.every((key) => {
        const filter = filterInfo.get(key);

        if(filter?.value === undefined) return true;

        if(Array.isArray(filter.value) && filter.value.length === 0) return true;

        if(filter?.onFilter && isFunc(filter.onFilter)) {
          return filter.onFilter(filter.value, item);
        }

        return true;
      });
    });
  }, [activeFilters, props.data]);

  const onFilterChange = usePersistFn(
    ( columnKey: KeygenResult, value: any) => {
      if(columnKey === '__reset__') {
        setFilterInfo((prev) => {
          const next = new Map(prev);
          next.forEach((v, k) => {
            next.set(k, {
              ...v,
              value: undefined,
            });
          }
          );
          return next;
        });
      }else{
        setFilterInfo((prev) => {
          const next = new Map(prev);
          next.set(columnKey, {
            value,
            onFilter: prev.get(columnKey)?.onFilter,
          });
          return next;
        });
      }
    });

  // 根据columns生成filterInfo
  useEffect(() => {
    const filterColumns = props?.columns?.filter((column) => column.filter);
    const _filterInfo = filterColumns?.reduce((acc, column, index) => {
      const columnKey = typeof column.render === 'string' ? column.render : String(index);

      acc.set(columnKey, {
        value: undefined,
        onFilter: column.filter?.onFilter,
      } as FilterInfo<Item>);

      return acc
    }, new Map() as FilterMap<Item>);

    if(_filterInfo) setFilterInfo(_filterInfo);

}, [props.columns])

  return {
    filterInfo,
    setFilterInfo,

    filteredData,

    onFilterChange,
  };
};

export default useTableFilter;
