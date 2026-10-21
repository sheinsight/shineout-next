import { useMemo } from 'react';
import { UseListMultipleProps, UseListProps } from './use-list.type';
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
    prediction: props.prediction as UseListMultipleProps<DataItem, MultipleValue>['prediction'],
  });

  const add = usePersistFn((data: DataItem) => {
    datum.add(data, { overwrite: true });
  });

  // TODO: Object.values(props) 作为 deps 是反模式。精确依赖应为 [datum, multiple]。
  // 注意：Table 开启 rowMemo 时 Tbody 会做 memo，非受控勾选时行的勾选状态只能靠 result 引用变化刷新，
  // 收窄 deps 前需要先给 Tbody 提供其他刷新依据（见 use-list-select-multiple）。
  const result = useMemo(() => {
    if (!multiple) {
      return {
        ...datum,
        add,
      };
    }
    return datum;
  }, Object.values(props));

  return result;
};

export default useListSelect;
