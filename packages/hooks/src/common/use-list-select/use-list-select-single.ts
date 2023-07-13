import useListSelect from './use-list-select';
import { UseListSingleProps } from './use-list.type';
import usePersistFn from '../use-persist-fn';
import { isArray } from '../../utils';

const useListSelectSingle = <DataItem, Value>(props: UseListSingleProps<DataItem, Value>) => {
  const onChange = usePersistFn((value: Value[], data: DataItem | DataItem[], checked: boolean) => {
    props.onChange?.(value[0], data as DataItem, checked);
  });
  const getValue = (v: any) => {
    if (v === undefined || v === null) return v;
    if (isArray(v)) return v;
    return [v];
  };
  const list = useListSelect<DataItem, Value[]>({
    ...props,
    value: getValue(props.value),
    onChange,
  });
  const add = usePersistFn((data: DataItem) => {
    list.add(data, { overwrite: true });
  });
  return {
    ...list,
    add,
  };
};

export default useListSelectSingle;
