import { useState } from 'react';
import { isFunc, getKey } from '../../utils';
import { UseFilterProps } from './use-filter.type';

const useFilter = <DataItem, Value extends string>(props: UseFilterProps<DataItem, Value>) => {
  const { data, groupKey, keygen, hideCreateOption, onFilter, onCreate, onFilterWidthCreate } =
    props;

  const [filterData, setFilterData] = useState<DataItem[]>(data);
  const [filterText, setFilterText] = useState<string | undefined>('');
  const [inputText, setInputText] = useState('');
  const [createdData, setCreatedData] = useState<string>();

  const filterFn =
    onFilterWidthCreate ||
    ((item: DataItem, createdData: DataItem, key: string | number) => getKey(keygen, item) === key);

  const getData = () => {
    const newData = filterData;
    if (createdData && !hideCreateOption) {
      const newKey = getKey(keygen, createdData as DataItem);
      const sameItem = newData.find((item) => filterFn(item, createdData as DataItem, newKey));
      if (!sameItem) return [createdData, ...newData] as DataItem[];
    }
    return newData;
  };

  const handleClearCreatedData = () => {
    setCreatedData(undefined);
    setInputText('');
  };

  const handleCreate = (text: Value) => {
    const createFn = typeof onCreate === 'boolean' ? (t: string) => t : onCreate;
    return createFn?.(text);
  };

  const handleFilter = (text: string) => {
    setInputText(text);

    if (!text) {
      setFilterData(data);
      handleClearCreatedData();
      // 没有 text 时触发一次 onFilter 以便外部重置数据
      if (onFilter) onFilter(text);
      return;
    }

    if (onCreate) {
      const innerData = handleCreate(text as Value);
      setCreatedData(innerData);
    }

    if (!onFilter || !isFunc(onFilter)) return;

    setFilterText(text);

    const next = onFilter(text);

    if (!isFunc(next)) return;

    const nextData = data.filter((item) => {
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

  return {
    inputText,
    filterText,
    filterData: getData(),
    createdData,
    setInputText,
    onCreate: onCreate ? handleCreate : undefined,
    onFilter: handleFilter,
    onResetFilter: handleResetData,
    onClearCreatedData: handleClearCreatedData,
  };
};

export default useFilter;
