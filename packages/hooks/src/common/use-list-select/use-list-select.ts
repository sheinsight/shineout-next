import { UseListProps } from './use-list.type';
import usePersistFn from '../use-persist-fn';
import { isArray } from '../../utils';
import useListSelectMultiple from './use-list-select-multiple';

const useListSelect = <DataItem, Value>(props: UseListProps<DataItem, Value>) => {
  const { multiple } = props;
  type MultipleValue = Value extends any[] ? Value : Value[];

  const getValue = (v: any) => {
    if (v === undefined || v === null) return v;
    if (isArray(v)) return v;
    return [v];
  };

  const onChange = usePersistFn(
    (value: MultipleValue, data: DataItem | DataItem[], checked: boolean) => {
      if (multiple) {
        props.onChange?.(value as Value, data, checked);
      } else {
        props.onChange?.((value as Value[])[0], data, checked);
      }
    },
  );

  const datum = useListSelectMultiple<DataItem, MultipleValue>({
    ...props,
    value: getValue(props.value),
    onChange: onChange,
  });

  const add = usePersistFn((data: DataItem) => {
    datum.add(data, { overwrite: true });
  });

  if (!multiple) {
    return {
      ...datum,
      add,
    };
  }

  return datum;
};

export default useListSelect;
