import useListSelect from './use-list-select';
import { UseListSingleProps } from './use-list.type';
import usePersistFn from '../use-persist-fn';
import { isArray } from '../../utils';

const useListSelectSingle = <ValueItem, DataItem>(
  props: UseListSingleProps<ValueItem, DataItem>,
) => {
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
  return useListSelect<ValueItem, DataItem>({
    ...props,
    value: getValue(props.value),
    onChange,
  });
};

export default useListSelectSingle;
