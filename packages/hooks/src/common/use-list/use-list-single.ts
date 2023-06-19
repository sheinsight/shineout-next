import useList from './use-list';
import { UseListSingleProps } from './use-list.type';
import usePersistFn from '../use-persist-fn';
import { isArray } from '../../utils';

const useListSingle = <ValueItem, DataItem>(props: UseListSingleProps<ValueItem, DataItem>) => {
  const onChange = usePersistFn(
    (value: ValueItem[], data: DataItem | DataItem[], checked: boolean) => {
      props.onChange(value[0], data, checked);
    },
  );
  const getValue = (v: any) => {
    if (v === undefined || v === null) return v;
    if (isArray(v)) return v;
    return [v];
  };
  return useList<ValueItem, DataItem>({
    ...props,
    value: getValue(props.value),
    onChange,
  });
};

export default useListSingle;
