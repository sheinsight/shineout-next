import useList from './use-list';
import { UseListSingleProps } from './use-list.type';
import usePersistFn from '../use-persist-fn';

const useListSingle = <ValueItem, DataItem>(props: UseListSingleProps<ValueItem, DataItem>) => {
  const onChange = usePersistFn((value: ValueItem[]) => {
    props.onChange(value[0]);
  });

  return useList<ValueItem, DataItem>({
    ...props,
    value: ((props.value ?? [props.value]) || []) as ValueItem[],
    onChange,
  });
};

export default useListSingle;
