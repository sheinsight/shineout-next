import { useState } from 'react';
import { isFunc } from '../../utils';
import { UseFilterProps } from './use-filter.type';

const useFilter = <DataItem, Value extends string>(props: UseFilterProps<DataItem, Value>) => {
  const { data, groupKey, hideCreateOption, onFilter, onCreate } = props;

  const [filterData, setFilterData] = useState<DataItem[]>(data);
  const [filterText, setFilterText] = useState<string | undefined>('');
  const [inputText, setInputText] = useState('');
  const [createdData, setCreatedData] = useState<string>();

  const getData = () => {
    const newData = filterData;
    if (createdData && !hideCreateOption) {
      return [createdData, ...newData] as DataItem[];
    }

    return newData;
  };

  const handleClearCreatedData = () => {
    setCreatedData(undefined);
  };

  const handleCreate = (text: Value) => {
    const createFn = typeof onCreate === 'boolean' ? (t: string) => t : onCreate;
    return createFn?.(text);
  };

  const handleFilter = (text: string) => {
    setInputText(text);
    if (!text) {
      setFilterData(data);
      setCreatedData(undefined);
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
    onCreate: onCreate ? handleCreate : undefined,
    onFilter: handleFilter,
    onResetFilter: handleResetData,
    onClearCreatedData: handleClearCreatedData,
  };
};

export default useFilter;
