import useListSelectMultiple from './use-list-select-multiple';
import { UseListSingleProps } from './use-list.type';
import usePersistFn from '../use-persist-fn';
import { isArray } from '../../utils';
import { useMemo } from 'react';

const useListSelectSingle = <DataItem, Value>(props: UseListSingleProps<DataItem, Value>) => {
  const onChange = usePersistFn((value: Value[], data: DataItem | DataItem[], checked: boolean) => {
    props.onChange?.(value[0], data as DataItem, checked);
  });
  const getValue = (v: any) => {
    if (v === undefined || v === null) return v;
    if (isArray(v)) return v;
    return [v];
  };
  const list = useListSelectMultiple<DataItem, Value[]>({
    ...props,
    value: getValue(props.value),
    onChange,
  });
  const add = usePersistFn((data: DataItem) => {
    list.add(data, { overwrite: true });
  });

  const result = useMemo(() => {
    return {
      ...list,
      add,
    };
  }, Object.values(props));
  return result;
};

export default useListSelectSingle;
