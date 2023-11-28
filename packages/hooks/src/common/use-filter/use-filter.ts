import { useState } from 'react';
import { isFunc } from '../../utils';
import { UseFilterProps } from './use-filter.type';

const useFilter = <DataItem>(props: UseFilterProps<DataItem>) => {
  const { data, onFilter } = props;

  const [filterData, setFilterData] = useState<DataItem[]>(data);
  const [filterText, setFilterText] = useState<string | undefined>('');

  const handleFilter = (text: string) => {
    if (!text) {
      setFilterData(data);
      return;
    }
    if (!onFilter || !isFunc(onFilter)) return;

    setFilterText(text);

    const next = onFilter(text);

    if (!isFunc(next)) return;
    const nextData = data.filter(next);

    setFilterData(nextData);
  };

  const handleResetData = () => {
    setFilterData(data);
  };

  return {
    filterText,
    filterData,
    onFilter: handleFilter,
    onResetFilter: handleResetData,
  };
};

export default useFilter;
