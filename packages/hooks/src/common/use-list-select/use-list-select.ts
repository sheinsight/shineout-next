import { UseListProps } from './use-list.type';
import usePersistFn from '../use-persist-fn';
import useListSelectMultiple from './use-list-select-multiple';

const useListSelect = <DataItem, Value>(props: UseListProps<DataItem, Value>) => {
  const { multiple } = props;
  type MultipleValue = Value extends any[] ? Value : Value[];

  let value: MultipleValue = props.value as MultipleValue;

  if (!multiple) {
    if (props.value === undefined || props.value === null) {
      value = props.value as MultipleValue;
    } else {
      value = [props.value] as MultipleValue;
    }
  }

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
    value: value,
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
