import { useState, useEffect } from 'react';
import { isFunc, getKey, getFilterTree } from '../../utils';
import { UseFilterProps } from './use-filter.type';
import { KeygenResult } from '../type';

const useFilter = <DataItem>(props: UseFilterProps<DataItem>) => {
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
    onFilterWidthCreate,
    onAdvancedFilter,
  } = props;

  const [filterData, setFilterData] = useState<DataItem[] | undefined>(data);
  const [filterText, setFilterText] = useState<string | undefined>('');
  const [filterFunc, setFilterFunc] = useState<((data: DataItem) => boolean) | undefined>(
    undefined,
  );
  const [inputText, setInputText] = useState('');
  const [createdData, setCreatedData] = useState<string>();

  const filterFn =
    onFilterWidthCreate ||
    ((item: DataItem, createdData: DataItem, key: string | number) => getKey(keygen, item) === key);

  const getData = () => {
    const newData = filterData || [];
    if (createdData && !hideCreateOption) {
      const newKey = getKey(keygen, createdData as DataItem);
      const sameItem = newData.find((item) => filterFn(item, createdData as DataItem, newKey));
      if (!sameItem) return [createdData, ...newData] as DataItem[];
    }
    return newData;
  };

  const getTreeData = () => {
    let filterExpandedKeys: KeygenResult[] | undefined = expandedProp || [];
    let newData: DataItem[] | undefined = treeData;
    const nextFilter = onFilter?.(filterText);
    if (filterText) {
      newData = getFilterTree(
        treeData,
        nextFilter,
        filterExpandedKeys,
        (node: DataItem) => getKey(keygen, node),
        childrenKey,
        showHitDescendants,
        undefined,
        { advanced: !!onAdvancedFilter },
      ) as DataItem[];
    }

    return {
      newData,
      filterExpandedKeys,
    };
  };

  const handleClearCreatedData = () => {
    setCreatedData(undefined);
  };

  const handleCreate = (text: string) => {
    const createFn = typeof onCreate === 'boolean' ? (t: string) => t : onCreate;
    return createFn?.(text);
  };

  const handleFilter = (text: string) => {
    setInputText(text);
    if (!text) {
      if (data) {
        setFilterData(data);
      }

      if (treeData) {
        setFilterData(treeData);
      }

      setFilterText('');
      setFilterFunc(undefined);

      handleClearCreatedData();
      // 没有 text 时触发一次 onFilter 以便外部重置数据
      if (onFilter) onFilter(text);
      return;
    }

    if (onCreate) {
      const innerData = handleCreate(text);
      setCreatedData(innerData);
    }

    if (!onFilter || !isFunc(onFilter)) return;

    setFilterText(text);

    const next = onFilter(text);
    if (!isFunc(next)) return;
    setFilterFunc(next);

    const nextData = data?.filter((item) => {
      if (!groupKey) return next(item);
      // 剔除分组项
      if (item[groupKey as keyof typeof item]) return item;
      return next(item);
    });
    setFilterData(nextData);
  };

  const handleResetData = () => {
    setFilterData(data);
  };

  useEffect(() => {
    if (data) setFilterData(data);
  }, [data]);

  let nextData: DataItem[] | undefined;
  let nextExpanded: KeygenResult[] | undefined;

  if (treeData) {
    const { newData, filterExpandedKeys } = getTreeData();
    nextData = newData;
    nextExpanded = filterExpandedKeys;
  }

  if (data) {
    nextData = getData();
  }

  return {
    inputText,
    filterText,
    expanded: nextExpanded,
    rawData: data || treeData,
    filterData: nextData,
    createdData,
    setInputText,
    setFilterText,
    onCreate: onCreate ? handleCreate : undefined,
    onFilter: onFilter || onCreate ? handleFilter : undefined,
    onResetFilter: handleResetData,
    onClearCreatedData: handleClearCreatedData,
  };
};

export default useFilter;
