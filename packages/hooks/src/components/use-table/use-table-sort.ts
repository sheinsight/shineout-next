import { useState, useMemo, useEffect, useRef } from 'react';
import { usePersistFn } from '@sheinx/hooks';
import { TableColumnItem, TableFormatColumn, BaseTableProps } from './use-table.type';
import { isObject, isFunc } from '../../utils/is';
import { KeygenResult } from '../../common/type';

export interface UseTableSorterProps<Item = any>
  extends Pick<BaseTableProps<Item>, 'onSortCancel' | 'sorter' | 'data'> {
  columns: TableFormatColumn<Item>[];
}
export interface SortInfo {
  order: 'desc' | 'asc' | null;
  weight?: number;
  sort?: ((a: any, b: any) => number) | undefined | void;
  manual: boolean;
  multiple?: boolean;
}

export type SortMap = Map<string | number, SortInfo>;
const useTableSort = <Item = any>(props: UseTableSorterProps<Item>) => {
  const { sorter, data } = props;

  const [sortInfo, setSortInfo] = useState<SortMap>(new Map<string | number, SortInfo>());

  const { current: context } = useRef({
    mounted: false,
    sortInfo: new Map<string | number, SortInfo>(),
  });

  if (!context.sortInfo) {
    context.sortInfo = sortInfo;
  }

  const getSortList = usePersistFn((info: SortMap) => {
    return Array.from(info.keys())
      .filter((name) => info.get(name)?.order)
      .sort((a, b) => (info.get(a)?.weight || 0)! - (info.get(b)?.weight || 0))
      .map((name) => ({
        key: name,
        ...info.get(name),
        order: info.get(name)?.order as 'desc' | 'asc',
      }));
  });

  const sortedData = useMemo(() => {
    let newData = [...(data || [])];
    const sortList = getSortList(sortInfo);
    sortList.forEach((sort) => {
      if (sort.sort) newData.sort(sort.sort);
    });
    return newData;
  }, [sortInfo, data]);

  const onSorterChange = usePersistFn(
    (
      columnKey: KeygenResult,
      /**
       *  null means cancel sort
       */
      direction: 'desc' | 'asc' | null,
      // menual true means sort by user not by default
      manual: boolean = true,
      columnSorter: TableColumnItem<Item>['sorter'],
    ) => {
      let sortName: string | undefined = undefined;
      if (typeof columnSorter === 'string') {
        sortName = columnSorter;
      } else if (isObject(columnSorter) && !isFunc(columnSorter)) {
        if (typeof columnSorter.rule === 'string') {
          sortName = columnSorter.rule;
        }
      }

      if (direction) {
        const { sortInfo } = context;
        const multiple = Array.from(sortInfo.values())[0]?.multiple;
        const sortObj = {
          weight: 0,
          manual,
          order: direction,
          multiple: false,
        } as SortInfo;
        const newInfo = multiple ? new Map(sortInfo) : (new Map() as SortMap);
        newInfo.set(columnKey, sortObj);
        if (isFunc(columnSorter)) {
          sortObj.sort = columnSorter(direction);
          sortObj.multiple = false;
        } else if (isObject(columnSorter)) {
          sortObj.weight = columnSorter.weight || 0;
          sortObj.multiple = true;
          const rule = columnSorter.rule;
          if (typeof rule === 'string') {
          } else if (isFunc(rule)) {
            const infoList = getSortList(newInfo).map((item) => ({
              key: item.key,
              order: item.order,
              weight: item.weight,
              manual: !!item.manual,
            }));
            sortObj.sort = rule(infoList);
          }
        } else if (typeof columnSorter === 'string') {
          sortObj.multiple = false;
          sortObj.weight = 0;
        }
        if (sortName && sorter) {
          const infoList = getSortList(newInfo).map((item) => ({
            key: item.key,
            order: item.order,
            weight: item.weight,
            manual: !!item.manual,
          }));
          sortObj.sort = sorter(sortName, direction, infoList);
        }
        setSortInfo(newInfo);
        context.sortInfo = newInfo;
      } else {
        const beforeSortOrder = sortInfo.get(columnKey)?.order as 'desc' | 'asc';
        const info = new Map(sortInfo);
        info.delete(columnKey);
        setSortInfo(info);
        context.sortInfo = info;
        const infoList = getSortList(info).map((item) => ({
          key: item.key,
          order: item.order,
          weight: item.weight,
          manual: !!item.manual,
        }));
        if (sortName) {
          props.onSortCancel?.(beforeSortOrder, columnKey, infoList, sortName);
        }
      }
    },
  );

  useEffect(() => {
    if (context.mounted) return;
    let hasSingleDefaultOrder = false;
    for (let i = 0; i < props.columns.length; i++) {
      const col = props.columns[i];
      if (col.defaultOrder && col.sorter) {
        if (typeof col.sorter !== 'object') {
          if (hasSingleDefaultOrder) {
            break;
          } else {
            hasSingleDefaultOrder = true;
          }
        }
        onSorterChange(col.key, col.defaultOrder!, false, col.sorter);
      }
    }
    context.mounted = true;
  }, []);

  return {
    sortInfo,
    onSorterChange,
    sortedData,
  };
};

export default useTableSort;
