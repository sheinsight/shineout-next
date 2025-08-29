import { useState, useEffect, useRef, useMemo } from 'react';
import { isFunc, getKey, getFilterTree } from '../../utils';
import { UseFilterProps } from './use-filter.type';
import { FilterContext } from './use-filter-context';
import { KeygenResult } from '../type';

const useFilter = <DataItem>(props: UseFilterProps<DataItem>)  => {
  const {
    data,
    groupKey,
    keygen,
    hideCreateOption,
    expanded: expandedProp,
    treeData,
    childrenKey,
    showHitDescendants,
    onFilter,
    onCreate,
    firstMatch,
    onFilterWidthCreate,
    onAdvancedFilter,
    filterDelay = 400,
  } = props;

  const [filterText, setFilterText] = useState<string | undefined>('');
  const [filterFunc, setFilterFunc] = useState<((d: DataItem) => boolean) | undefined>(undefined);
  const [inputText, setInputText] = useState('');
  const [createdData, setCreatedData] = useState<any>();

  const firstMatchNode = useRef<DataItem | null>();
  const { current: context } = useRef({
    filterTimer: null as NodeJS.Timeout | null,
  });

  const filterFn =
    onFilterWidthCreate ||
    ((item: DataItem, createdData: DataItem, key: string | number) => getKey(keygen, item) === key);

  const handleClearCreatedData = () => {
    // why setTimeout: 避免回车时，新创建的数据走到了renderUnmatched逻辑中去
    setTimeout(() => {
      setCreatedData(undefined);
    }, 0);
  };

  const handleCreate = (text: string) => {
    const createFn = typeof onCreate === 'boolean' ? (t: string) => t : onCreate;
    return createFn?.(text);
  };

  const handleFilter = (text: string, from: string = 'edit') => {
    if (context.filterTimer) clearTimeout(context.filterTimer);
    setInputText(text);
    setFilterText(text);

    firstMatchNode.current = null;
    if (!text) {
      setFilterFunc(undefined);
      handleClearCreatedData();
      // 没有 text 时触发一次 onFilter 以便外部重置数据
      if (onFilter) onFilter(text, from);
      return;
    }

    if (onCreate) {
      const innerData = handleCreate(text);
      setCreatedData(innerData);
    }

    if (!onFilter || !isFunc(onFilter)) return;

    context.filterTimer = setTimeout(() => {
      const next = onFilter(text, from);

      if (!isFunc(next)) return;
      setFilterFunc(() => next);
    }, filterDelay);
  };

  useEffect(() => {
    if (context.filterTimer) clearTimeout(context.filterTimer);
  }, []);

  const [nextData, nextExpanded] = useMemo(() => {
    if (treeData) {
      const getTreeData = () => {
        const getFirstMatchNode = (node: DataItem) => {
          if (firstMatchNode.current) return;
          firstMatchNode.current = node;
        };
        let filterExpandedKeys: KeygenResult[] | undefined = expandedProp || [];
        let newData: DataItem[] | undefined = treeData;
        if (filterFunc) {
          newData = getFilterTree(
            treeData,
            filterFunc,
            filterExpandedKeys,
            (node: DataItem) => getKey(keygen, node),
            childrenKey,
            !!showHitDescendants,
            firstMatch ? getFirstMatchNode : undefined,
            { advanced: !!onAdvancedFilter },
          ) as DataItem[];
        }
        return {
          newData,
          filterExpandedKeys,
        };
      };
      const { newData, filterExpandedKeys } = getTreeData();
      return [newData, filterExpandedKeys];
    } else if (data) {
      const getData = () => {
        let newData =
          (filterFunc
            ? data?.filter((item) => {
                if (!groupKey) return filterFunc(item);
                // 剔除分组项
                if (item[groupKey as keyof typeof item]) return item;
                return filterFunc(item);
              })
            : data) || [];
        if (createdData && !hideCreateOption) {
          const newKey = getKey(keygen, createdData as DataItem);
          const sameItem = newData.find((item) => filterFn(item, createdData as DataItem, newKey));
          if (!sameItem) return [createdData, ...newData] as DataItem[];
        }
        return newData;
      };
      return [getData(), undefined];
    } else {
      return [undefined, undefined];
    }
  }, [data, treeData, filterFunc, createdData, expandedProp]);

  return {
    inputText,
    filterText,
    firstMatchNode: firstMatchNode.current,
    expanded: nextExpanded,
    rawData: data || treeData,
    filterData: nextData,
    createdData,
    setInputText,
    setFilterText,
    filterFunc,
    onCreate: onCreate ? handleCreate : undefined,
    onFilter: onFilter || onCreate ? handleFilter : undefined,
    FilterProvider: FilterContext.Provider,
    // onResetFilter: handleResetData,
    onClearCreatedData: handleClearCreatedData,
  };
};

export default useFilter;
